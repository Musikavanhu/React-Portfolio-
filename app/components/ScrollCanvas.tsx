'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const TOTAL_FRAMES = 180
const ZOOM_FACTOR = 1.35
const PARALLAX_INTENSITY = 30

// ── Text animation timeline (driven by scrollFraction 0→1) ──
// Each letter/word animates in over a narrow scrub window
function getTextTimeline(scrollFraction: number) {
  // Phase 1: Name letters fly in (scroll 0.08 → 0.45)
  // Phase 2: Role line fades in   (scroll 0.50 → 0.70)
  // Phase 3: Everything holds     (scroll 0.70 → 0.85)
  // Phase 4: Everything fades out (scroll 0.85 → 1.0)

  const name = 'Tino Musikavanhu'
  const role = 'Engineer & Technologist'

  const nameStart = 0.08
  const nameEnd = 0.45
  const nameRange = nameEnd - nameStart

  // Per-character progress for the name
  const nameLetters = name.split('').map((char, i) => {
    const charStart = nameStart + (i / name.length) * nameRange
    const charEnd = charStart + nameRange / name.length * 2 // overlap for smoothness
    const t = Math.min(Math.max((scrollFraction - charStart) / (charEnd - charStart), 0), 1)
    // Ease out cubic
    const eased = 1 - Math.pow(1 - t, 3)
    return {
      char,
      opacity: eased,
      y: (1 - eased) * 60,       // drops from 60px above
      blur: (1 - eased) * 8,     // starts blurred
    }
  })

  // Role line progress
  const roleStart = 0.50
  const roleEnd = 0.70
  const roleT = Math.min(Math.max((scrollFraction - roleStart) / (roleEnd - roleStart), 0), 1)
  const roleEased = 1 - Math.pow(1 - roleT, 3)

  // Fade-out phase for everything
  const fadeStart = 0.85
  const fadeEnd = 1.0
  const fadeT = Math.min(Math.max((scrollFraction - fadeStart) / (fadeEnd - fadeStart), 0), 1)
  const globalOpacity = 1 - fadeT

  return { nameLetters, roleOpacity: roleEased, roleY: (1 - roleEased) * 30, globalOpacity }
}

// Preload all frame images into memory
function preloadFrames(
  onProgress: (pct: number) => void
): Promise<HTMLImageElement[]> {
  return new Promise((resolve) => {
    const images: HTMLImageElement[] = []
    let loaded = 0

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `/frames/frame-${String(i).padStart(3, '0')}.jpg`
      img.onload = img.onerror = () => {
        loaded++
        onProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
        if (loaded === TOTAL_FRAMES) {
          resolve(images)
        }
      }
      images.push(img)
    }
  })
}

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>(0)
  const parallaxRef = useRef({ x: 0, y: 0 })
  const targetParallaxRef = useRef({ x: 0, y: 0 })
  const scrollFractionRef = useRef(0)

  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [textState, setTextState] = useState(() => getTextTimeline(0))

  // Draw a specific frame to the canvas with object-fit: cover + zoom
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = framesRef.current[index]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // Manual object-fit: cover with zoom
    const canvasAspect = cw / ch
    const imageAspect = iw / ih

    let drawWidth: number
    let drawHeight: number

    if (canvasAspect > imageAspect) {
      drawWidth = cw * ZOOM_FACTOR
      drawHeight = (cw / imageAspect) * ZOOM_FACTOR
    } else {
      drawHeight = ch * ZOOM_FACTOR
      drawWidth = (ch * imageAspect) * ZOOM_FACTOR
    }

    const dx = (cw - drawWidth) / 2 + parallaxRef.current.x
    const dy = (ch - drawHeight) / 2 + parallaxRef.current.y

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
  }, [])

  // Resize canvas to match window
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawFrame(currentFrameRef.current)
  }, [drawFrame])

  // Smooth parallax interpolation loop
  const animateParallax = useCallback(() => {
    const lerp = 0.08
    parallaxRef.current.x += (targetParallaxRef.current.x - parallaxRef.current.x) * lerp
    parallaxRef.current.y += (targetParallaxRef.current.y - parallaxRef.current.y) * lerp
    drawFrame(currentFrameRef.current)
    rafRef.current = requestAnimationFrame(animateParallax)
  }, [drawFrame])

  useEffect(() => {
    let isMounted = true

    preloadFrames((pct) => {
      if (isMounted) setLoadProgress(pct)
    }).then((images) => {
      if (!isMounted) return
      framesRef.current = images
      setIsLoaded(true)
    })

    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    handleResize()

    // Scroll → frame mapping + text timeline
    const handleScroll = () => {
      const container = containerRef.current
      const canvas = canvasRef.current
      if (!container || !canvas) return

      const scrollTop = window.scrollY
      const containerTop = container.offsetTop
      const containerHeight = container.clientHeight
      const maxScroll = containerTop + containerHeight - window.innerHeight
      const scrollFraction = Math.min(Math.max((scrollTop - containerTop) / (maxScroll - containerTop), 0), 1)
      const frameIndex = Math.min(
        Math.floor(scrollFraction * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      )

      currentFrameRef.current = frameIndex
      scrollFractionRef.current = scrollFraction

      // Update text animation state
      setTextState(getTextTimeline(scrollFraction))

      // Fade out canvas once past the scroll zone
      if (scrollTop > maxScroll) {
        const overscroll = scrollTop - maxScroll
        const fadeRange = window.innerHeight * 0.5
        const opacity = Math.max(1 - overscroll / fadeRange, 0)
        canvas.style.opacity = String(opacity)
      } else {
        canvas.style.opacity = '1'
      }
    }

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      targetParallaxRef.current.x = -dx * PARALLAX_INTENSITY
      targetParallaxRef.current.y = -dy * PARALLAX_INTENSITY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    rafRef.current = requestAnimationFrame(animateParallax)

    handleScroll()
    drawFrame(0)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isLoaded, handleResize, drawFrame, animateParallax])

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '500vh' }}
    >
      {/* Loading screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
          <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-6">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-white/60 text-sm font-mono tracking-widest">
            {loadProgress}%
          </p>
        </div>
      )}

      {/* Canvas — fixed viewport, slight scale for parallax edge hiding */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{
          transform: 'scale(1.05)',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      />

      {/* ── Scroll-scrubbed Name & Role Text Overlay ── */}
      {isLoaded && (
        <div
          className="fixed inset-0 z-[5] flex flex-col items-center justify-center pointer-events-none select-none"
          style={{ opacity: textState.globalOpacity }}
        >
          {/* Name: "Tino Musikavanhu" — each letter animates individually */}
          <div className="flex flex-wrap justify-center" aria-label="Tino Musikavanhu">
            {textState.nameLetters.map((letter, i) => (
              <span
                key={i}
                className="inline-block text-white font-bold"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  opacity: letter.opacity,
                  transform: `translateY(${letter.y}px)`,
                  filter: `blur(${letter.blur}px)`,
                  textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0 80px rgba(59,130,246,0.15)',
                  // Add space after "Tino"
                  marginRight: letter.char === ' ' ? '0.3em' : '0',
                  width: letter.char === ' ' ? '0.3em' : 'auto',
                  transition: 'none',
                }}
              >
                {letter.char === ' ' ? '\u00A0' : letter.char}
              </span>
            ))}
          </div>

          {/* Role subtitle */}
          <div
            className="mt-4 md:mt-6"
            style={{
              opacity: textState.roleOpacity,
              transform: `translateY(${textState.roleY}px)`,
              filter: `blur(${(1 - textState.roleOpacity) * 4}px)`,
            }}
          >
            <p
              className="text-white/80 tracking-[0.25em] uppercase text-center"
              style={{
                fontSize: 'clamp(0.75rem, 2vw, 1.25rem)',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                textShadow: '0 2px 20px rgba(0,0,0,0.4)',
              }}
            >
              Engineer &amp; Technologist
            </p>

            {/* Decorative line under the role */}
            <div
              className="mx-auto mt-4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{
                width: `${textState.roleOpacity * 200}px`,
                opacity: textState.roleOpacity,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
