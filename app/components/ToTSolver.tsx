'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────────

type Score = 'root' | 'pending' | 'sure' | 'likely' | 'impossible' | 'solved'

interface NodeData {
  id: string
  parentId: string | null
  numbers: number[]
  expr: string
  score: Score
  depth: number
}

// ── Visual config ─────────────────────────────────────────────────────────────

const SVG_W = 900
const LEVEL_H = 130
const R = 28 // node radius

const SCORE_CFG: Record<Score, { fill: string; stroke: string; text: string }> = {
  root:       { fill: '#1e3a8a', stroke: '#3b82f6', text: '#bfdbfe' },
  pending:    { fill: '#1f2937', stroke: '#4b5563', text: '#6b7280' },
  sure:       { fill: '#064e3b', stroke: '#10b981', text: '#6ee7b7' },
  likely:     { fill: '#451a03', stroke: '#f59e0b', text: '#fde68a' },
  impossible: { fill: '#0c0c0c', stroke: '#1f2937', text: '#374151' },
  solved:     { fill: '#2e1065', stroke: '#8b5cf6', text: '#ddd6fe' },
}

const PRESETS: { label: string; nums: number[] }[] = [
  { label: '1·5·5·5', nums: [1, 5, 5, 5] },
  { label: '3·3·8·8', nums: [3, 3, 8, 8] },
  { label: '2·3·4·6', nums: [2, 3, 4, 6] },
]

// ── Layout ────────────────────────────────────────────────────────────────────

function computePositions(nodes: Map<string, NodeData>) {
  const byDepth = new Map<number, string[]>()
  Array.from(nodes.entries()).forEach(([id, n]) => {
    if (!byDepth.has(n.depth)) byDepth.set(n.depth, [])
    byDepth.get(n.depth)!.push(id)
  })

  const pos = new Map<string, { x: number; y: number }>()
  const PAD = 70

  Array.from(byDepth.entries()).forEach(([depth, ids]) => {
    const count = ids.length
    ids.forEach((id: string, i: number) => {
      pos.set(id, {
        x: count === 1
          ? SVG_W / 2
          : PAD + ((SVG_W - 2 * PAD) / (count - 1)) * i,
        y: depth * LEVEL_H + 70,
      })
    })
  })
  return pos
}

function bezierEdge(x1: number, y1: number, x2: number, y2: number): string {
  const dy = Math.abs(y2 - y1) * 0.5
  return `M ${x1} ${y1 + R} C ${x1} ${y1 + R + dy}, ${x2} ${y2 - R - dy}, ${x2} ${y2 - R}`
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ToTSolver() {
  const [inputs, setInputs] = useState([1, 5, 5, 5])
  const [nodes, setNodes] = useState<Map<string, NodeData>>(new Map())
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'solved'>('idle')
  const [stats, setStats] = useState({ explored: 0, pruned: 0 })
  const abortRef = useRef(false)

  const positions = useMemo(() => computePositions(nodes), [nodes])

  const svgHeight = useMemo(() => {
    let maxD = 0
    Array.from(nodes.values()).forEach(n => { if (n.depth > maxD) maxD = n.depth })
    return maxD * LEVEL_H + 140
  }, [nodes])

  const solve = useCallback(async () => {
    abortRef.current = false
    setNodes(new Map())
    setStatus('running')
    setStats({ explored: 0, pruned: 0 })

    try {
      const res = await fetch('/api/tot-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numbers: inputs }),
      })

      if (!res.ok || !res.body) {
        setStatus('done')
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buf = ''

      while (!abortRef.current) {
        const { done, value } = await reader.read()
        if (done) break

        buf += decoder.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const evt = JSON.parse(line.slice(6))

            if (evt.type === 'node') {
              setNodes(prev =>
                new Map(prev).set(evt.id, {
                  id: evt.id,
                  parentId: evt.parentId,
                  numbers: evt.numbers,
                  expr: evt.expr,
                  score: evt.score,
                  depth: evt.depth,
                })
              )
            } else if (evt.type === 'update') {
              setNodes(prev => {
                const next = new Map(prev)
                const n = next.get(evt.id)
                if (n) next.set(evt.id, { ...n, score: evt.score })
                return next
              })
            } else if (evt.type === 'stats') {
              setStats({ explored: evt.explored, pruned: evt.pruned })
            } else if (evt.type === 'solved') {
              setStatus('solved')
            } else if (evt.type === 'done') {
              setStatus(prev => (prev !== 'solved' ? 'done' : prev))
            }
          } catch { /* bad parse, skip */ }
        }
      }
    } catch {
      setStatus('done')
    }
  }, [inputs])

  const stop = useCallback(() => {
    abortRef.current = true
    setStatus('done')
  }, [])

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <motion.div
      className="mt-14 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(30px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(30px) saturate(1.5)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(147,51,234,0.1) 0%, transparent 50%)',
      }} />

      {/* ── Header ── */}
      <div className="relative z-10 px-6 sm:px-10 pt-8 pb-5 border-b border-white/10">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
            Live AI Demo
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
          Tree-of-Thoughts · Game of 24
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          BFS over partial arithmetic expressions. At each node the LLM scores candidates as{' '}
          <span className="text-emerald-400 font-medium">sure</span> /{' '}
          <span className="text-yellow-400 font-medium">likely</span> /{' '}
          <span className="text-red-400 font-medium">impossible</span> — dead branches are pruned
          in real time.{' '}
          <span className="text-slate-500 text-xs">
            (Yao et al., 2023 · implemented from scratch)
          </span>
        </p>
      </div>

      {/* ── Controls ── */}
      <div className="relative z-10 px-6 sm:px-10 py-5 flex flex-wrap items-center gap-3 bg-black/10">
        {/* Number inputs */}
        <div className="flex items-center gap-2">
          {inputs.map((v, i) => (
            <input
              key={i}
              type="number"
              min={1}
              max={13}
              value={v}
              onChange={e => {
                const next = [...inputs]
                next[i] = parseInt(e.target.value) || 1
                setInputs(next)
              }}
              disabled={status === 'running'}
              className="w-12 h-11 text-center text-white font-bold text-base rounded-xl focus:outline-none transition-all disabled:opacity-40"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>

        {/* Presets */}
        <div className="flex gap-2">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => setInputs(p.nums)}
              disabled={status === 'running'}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-all disabled:opacity-40"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Solve / Stop */}
        <motion.button
          onClick={status === 'running' ? stop : solve}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold ${
            status === 'running' ? 'text-red-300' : 'text-blue-300'
          }`}
          style={{
            background:
              status === 'running'
                ? 'rgba(239,68,68,0.12)'
                : 'rgba(59,130,246,0.15)',
            border: `1px solid ${
              status === 'running'
                ? 'rgba(239,68,68,0.3)'
                : 'rgba(59,130,246,0.3)'
            }`,
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          {status === 'running' ? '⏹ Stop' : '▶ Solve'}
        </motion.button>

        {/* Stats */}
        <AnimatePresence>
          {nodes.size > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 text-xs ml-auto flex-wrap"
            >
              <span className="text-slate-400">
                <span className="text-blue-400 font-bold">{stats.explored}</span> explored
              </span>
              <span className="text-slate-400">
                <span className="text-red-400 font-bold">{stats.pruned}</span> pruned
              </span>
              {status === 'solved' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-violet-300 font-semibold"
                >
                  ✓ Solution found!
                </motion.span>
              )}
              {status === 'done' && nodes.size > 1 && (
                <span className="text-slate-500">Search complete</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Legend ── */}
      <div className="relative z-10 px-6 sm:px-10 pb-4 pt-3 flex flex-wrap gap-x-5 gap-y-2">
        {(
          [
            { score: 'root' as Score, label: 'Root' },
            { score: 'sure' as Score, label: 'Sure — keep' },
            { score: 'likely' as Score, label: 'Likely — keep' },
            { score: 'impossible' as Score, label: 'Pruned' },
            { score: 'solved' as Score, label: 'Solution!' },
          ] as { score: Score; label: string }[]
        ).map(({ score, label }) => {
          const cfg = SCORE_CFG[score]
          return (
            <div key={score} className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 13 13">
                <circle cx="6.5" cy="6.5" r="5.5" fill={cfg.fill} stroke={cfg.stroke} strokeWidth="1.5" />
              </svg>
              <span className="text-xs text-slate-400">{label}</span>
            </div>
          )
        })}
      </div>

      {/* ── Tree SVG ── */}
      <div className="relative z-10 px-3 md:px-8 pb-8">
        {nodes.size === 0 ? (
          <div className="flex items-center justify-center h-36 text-slate-600 text-sm">
            Enter 4 numbers and click Solve — watch the search tree grow in real time
          </div>
        ) : (
          <div
            className="overflow-x-auto rounded-2xl w-full border border-white/5"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            <svg
              viewBox={`0 0 ${SVG_W} ${Math.max(svgHeight, 180)}`}
              style={{
                width: '100%',
                height: Math.max(svgHeight, 180),
                minWidth: 480,
                display: 'block',
              }}
            >
              {/* ── Edges ── */}
              {Array.from(nodes.values())
                .filter(n => n.parentId)
                .map(n => {
                  const p = positions.get(n.parentId!)
                  const c = positions.get(n.id)
                  if (!p || !c) return null
                  const cfg = SCORE_CFG[n.score]
                  return (
                    <motion.path
                      key={`edge-${n.id}`}
                      d={bezierEdge(p.x, p.y, c.x, c.y)}
                      fill="none"
                      stroke={cfg.stroke}
                      strokeWidth={n.score === 'solved' ? 2.5 : 1.5}
                      strokeDasharray={n.score === 'pending' ? '5 3' : undefined}
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{
                        opacity: n.score === 'impossible' ? 0.12 : 0.55,
                        pathLength: 1,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  )
                })}

              {/* ── Edge expression labels ── */}
              {Array.from(nodes.values())
                .filter(n => n.parentId && n.score !== 'root')
                .map(n => {
                  const p = positions.get(n.parentId!)
                  const c = positions.get(n.id)
                  if (!p || !c) return null
                  const cfg = SCORE_CFG[n.score]
                  return (
                    <motion.text
                      key={`lbl-${n.id}`}
                      x={(p.x + c.x) / 2}
                      y={(p.y + c.y) / 2}
                      textAnchor="middle"
                      fontSize="8.5"
                      fill={cfg.text}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: n.score === 'impossible' ? 0.2 : 0.75 }}
                      transition={{ delay: 0.2 }}
                    >
                      {n.expr}
                    </motion.text>
                  )
                })}

              {/* ── Nodes ── */}
              {Array.from(nodes.values()).map(n => {
                const pos = positions.get(n.id)
                if (!pos) return null
                const cfg = SCORE_CFG[n.score]
                const numStr = n.numbers
                  .map(x => (Number.isInteger(x) ? x : +x.toFixed(1)))
                  .join(' ')

                return (
                  <motion.g
                    key={n.id}
                    animate={{ x: pos.x, y: pos.y }}
                    initial={{ x: pos.x, y: pos.y }}
                    transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  >
                    {/* Pulsing glow for solved */}
                    {n.score === 'solved' && (
                      <motion.circle
                        r={R + 12}
                        cx={0}
                        cy={0}
                        fill={cfg.stroke}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0.12, 0.28, 0.12],
                          r: [R + 10, R + 22, R + 10],
                        }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                      />
                    )}

                    {/* Scanning pulse for pending */}
                    {n.score === 'pending' && (
                      <motion.circle
                        r={R + 5}
                        cx={0}
                        cy={0}
                        fill="none"
                        stroke="#4b5563"
                        strokeWidth={1}
                        animate={{ opacity: [0.5, 0, 0.5], r: [R + 4, R + 14, R + 4] }}
                        transition={{ repeat: Infinity, duration: 1.1 }}
                      />
                    )}

                    {/* Main node circle */}
                    <motion.circle
                      r={R}
                      cx={0}
                      cy={0}
                      fill={cfg.fill}
                      stroke={cfg.stroke}
                      strokeWidth={n.score === 'solved' ? 2.5 : 1.5}
                      initial={{ r: 0, opacity: 0 }}
                      animate={{
                        r: n.score === 'impossible' ? R * 0.8 : R,
                        opacity: n.score === 'impossible' ? 0.35 : 1,
                      }}
                      transition={{ duration: 0.35, type: 'spring', stiffness: 220 }}
                    />

                    {/* Numbers label inside node */}
                    <motion.text
                      x={0}
                      y={0}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={numStr.length > 7 ? '7' : numStr.length > 4 ? '8.5' : '10'}
                      fontWeight="600"
                      fill={cfg.text}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: n.score === 'impossible' ? 0.25 : 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {numStr}
                    </motion.text>
                  </motion.g>
                )
              })}
            </svg>
          </div>
        )}
      </div>

      {/* ── Footer note ── */}
      <div className="relative z-10 px-6 sm:px-10 py-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2 bg-black/20">
        <p className="text-xs text-slate-600">
          Calls{' '}
          <code className="text-slate-500 font-mono">zai-org/glm-4.6v-flash</code> on localhost:8013
          · falls back to deterministic scoring if LLM is unreachable
        </p>
        <span className="text-xs text-slate-600">
          ~20–40 LLM calls per solve · BFS + score-guided pruning
        </span>
      </div>
    </motion.div>
  )
}
