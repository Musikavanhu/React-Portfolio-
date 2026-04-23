import { NextRequest } from 'next/server'

const LLM_URL = 'http://localhost:8013/api/v1/chat'
const MODEL = 'zai-org/glm-4.6v-flash'

type Score = 'root' | 'pending' | 'sure' | 'likely' | 'impossible' | 'solved'

interface Move {
  numbers: number[]
  expr: string
}

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : parseFloat(n.toFixed(2)).toString()
}

function generateMoves(nums: number[]): Move[] {
  const moves: Move[] = []
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i === j) continue
      const a = nums[i], b = nums[j]
      const rest = nums.filter((_, k) => k !== i && k !== j)
      moves.push({ numbers: [parseFloat((a + b).toFixed(4)), ...rest], expr: `${fmt(a)}+${fmt(b)}` })
      moves.push({ numbers: [parseFloat((a - b).toFixed(4)), ...rest], expr: `${fmt(a)}-${fmt(b)}` })
      moves.push({ numbers: [parseFloat((a * b).toFixed(4)), ...rest], expr: `${fmt(a)}×${fmt(b)}` })
      if (Math.abs(b) > 1e-9) {
        moves.push({ numbers: [parseFloat((a / b).toFixed(4)), ...rest], expr: `${fmt(a)}÷${fmt(b)}` })
      }
    }
  }
  // Deduplicate by sorted number set + expression
  const seen = new Set<string>()
  return moves.filter(m => {
    const key = [...m.numbers].sort((a, b) => a - b).join(',') + '|' + m.expr
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function deterministicScore(nums: number[]): Score {
  if (nums.length === 1) {
    return Math.abs(nums[0] - 24) < 0.01 ? 'solved' : 'impossible'
  }
  if (nums.length === 2) {
    const [a, b] = nums
    const candidates = [a + b, a - b, b - a, a * b]
    if (Math.abs(b) > 1e-9) candidates.push(a / b)
    if (Math.abs(a) > 1e-9) candidates.push(b / a)
    return candidates.some(c => Math.abs(c - 24) < 0.01) ? 'sure' : 'impossible'
  }
  return 'likely'
}

async function scoreWithLLM(nums: number[]): Promise<Score> {
  // Terminal and 2-number cases: deterministic
  if (nums.length <= 2) return deterministicScore(nums)

  try {
    const res = await fetch(LLM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        system_prompt:
          'You evaluate arithmetic puzzles. Respond with ONLY one word: "sure", "likely", or "impossible". No explanation, no punctuation.',
        input: `Numbers: [${nums.join(', ')}]. Can these numbers reach exactly 24 using +, -, ×, ÷? One word only.`,
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) return deterministicScore(nums)

    const data = await res.json()
    const text = String(
      data.output ?? data.content ?? data.response ??
      data.choices?.[0]?.message?.content ?? ''
    ).toLowerCase().trim()

    if (text.startsWith('sure')) return 'sure'
    if (text.startsWith('likely') || text.startsWith('maybe') || text.startsWith('possible')) return 'likely'
    if (text.startsWith('impossible') || text.includes('cannot') || text.includes("can't")) return 'impossible'
    // Fuzzy match for verbose responses
    if (text.includes('sure')) return 'sure'
    if (text.includes('likely') || text.includes('maybe')) return 'likely'
    if (text.includes('impossible')) return 'impossible'

    return 'likely'
  } catch {
    return deterministicScore(nums)
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const numbers: number[] = body.numbers ?? []

  if (numbers.length !== 4 || numbers.some(n => typeof n !== 'number')) {
    return new Response(JSON.stringify({ error: 'Provide exactly 4 numbers' }), { status: 400 })
  }

  const encoder = new TextEncoder()
  let nodeCount = 0
  const getId = () => `n${nodeCount++}`

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        } catch { /* stream closed */ }
      }

      // Emit root
      const rootId = getId()
      send({ type: 'node', id: rootId, parentId: null, numbers, expr: 'start', score: 'root', depth: 0 })

      type FrontierItem = { id: string; numbers: number[]; depth: number }
      let frontier: FrontierItem[] = [{ id: rootId, numbers, depth: 0 }]
      let solved = false
      let explored = 0
      let pruned = 0

      // BFS: 3 levels deep (4 numbers → 3 → 2 → 1)
      for (let level = 0; level < 3 && !solved; level++) {
        const nextFrontier: FrontierItem[] = []
        // At root level expand 1 node; at deeper levels expand up to 3
        const toExpand = frontier.slice(0, level === 0 ? 1 : 3)

        for (const parent of toExpand) {
          if (solved) break

          const allMoves = generateMoves(parent.numbers)
          // Sample: 8 candidates at level 0, 5 at deeper levels
          const maxSample = level === 0 ? 8 : 5
          const candidates = shuffle(allMoves).slice(0, maxSample)

          let keptForParent = 0

          for (const candidate of candidates) {
            if (solved) break

            const nodeId = getId()
            const depth = level + 1

            // Emit node as pending immediately (lets client draw it before scoring)
            send({
              type: 'node',
              id: nodeId,
              parentId: parent.id,
              numbers: candidate.numbers,
              expr: candidate.expr,
              score: 'pending',
              depth,
            })

            explored++
            send({ type: 'stats', explored, pruned })

            // Brief pause so the client can render the pending state
            await new Promise(r => setTimeout(r, 40))

            const score = await scoreWithLLM(candidate.numbers)
            send({ type: 'update', id: nodeId, score })

            if (score === 'solved') {
              send({ type: 'solved', id: nodeId })
              solved = true
              break
            }

            if (score === 'impossible') {
              pruned++
              send({ type: 'stats', explored, pruned })
            } else if (keptForParent < 3) {
              nextFrontier.push({ id: nodeId, numbers: candidate.numbers, depth })
              keptForParent++
            }
          }
        }

        frontier = nextFrontier
      }

      send({ type: 'done', solved, explored, pruned })
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
