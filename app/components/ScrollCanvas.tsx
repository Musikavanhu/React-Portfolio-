'use client'

import { useEffect, useRef, useState } from 'react'

// ── Text animation timeline (driven by scrollFraction 0→1) ──
function getTextTimeline(scrollFraction: number) {
  const name = 'Tino Musikavanhu'
  
  const nameStart = 0.08
  const nameEnd = 0.45
  const nameRange = nameEnd - nameStart

  const nameLetters = name.split('').map((char, i) => {
    const charStart = nameStart + (i / name.length) * nameRange
    const charEnd = charStart + nameRange / name.length * 2 
    const t = Math.min(Math.max((scrollFraction - charStart) / (charEnd - charStart), 0), 1)
    const eased = 1 - Math.pow(1 - t, 3)
    return {
      char,
      opacity: eased,
      y: (1 - eased) * 60,
      blur: (1 - eased) * 8,
    }
  })

  const roleStart = 0.50
  const roleEnd = 0.70
  const roleT = Math.min(Math.max((scrollFraction - roleStart) / (roleEnd - roleStart), 0), 1)
  const roleEased = 1 - Math.pow(1 - roleT, 3)

  const fadeStart = 0.85
  const fadeEnd = 1.0
  const fadeT = Math.min(Math.max((scrollFraction - fadeStart) / (fadeEnd - fadeStart), 0), 1)
  const globalOpacity = 1 - fadeT

  // Card fades in slightly before the text
  const cardStart = 0.04
  const cardEnd = 0.20
  const cardT = Math.min(Math.max((scrollFraction - cardStart) / (cardEnd - cardStart), 0), 1)
  const cardOpacity = 1 - Math.pow(1 - cardT, 3)

  return { nameLetters, roleOpacity: roleEased, roleY: (1 - roleEased) * 30, globalOpacity, cardOpacity }
}

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const [textState, setTextState] = useState(() => getTextTimeline(0))
  const [videoOpacity, setVideoOpacity] = useState(1)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const scrollTop = window.scrollY
      const containerTop = container.offsetTop
      const containerHeight = container.clientHeight
      const maxScroll = Math.max(containerTop + containerHeight - window.innerHeight, 1)
      const scrollFraction = Math.min(Math.max((scrollTop - containerTop) / maxScroll, 0), 1)

      // Update text animation state
      setTextState(getTextTimeline(scrollFraction))

      // Scrub the video timeline based on scroll percentage!
      const video = videoRef.current
      if (video && !isNaN(video.duration) && video.duration > 0) {
        // Prevent video from reaching absolute end to avoid WebKit "ended" state freeze
        const safeDuration = video.duration - 0.05
        const targetTime = scrollFraction * safeDuration
        
        // Use requestAnimationFrame for smoother scrubbing
        if (!ticking) {
          window.requestAnimationFrame(() => {
            video.currentTime = targetTime
            ticking = false
          })
          ticking = true
        }
      }

      // Fade out video once past the scroll zone
      if (scrollTop > maxScroll) {
        const overscroll = scrollTop - maxScroll
        const fadeRange = window.innerHeight * 0.5
        setVideoOpacity(Math.max(1 - overscroll / fadeRange, 0))
      } else {
        setVideoOpacity(1)
      }
    }

    // Subtle mouse parallax effect on the video
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      setParallax({ x: -dx * 15, y: -dy * 15 })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    // Initial call to set state
    handleScroll()

    // Setup video properly
    const video = videoRef.current
    if (video) {
      video.pause() // force it paused
      
      const onVideoReady = () => {
        handleScroll()
      }

      if (video.readyState >= 1) {
        onVideoReady()
      } else {
        video.addEventListener('loadedmetadata', onVideoReady)
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      if (video) {
        video.removeEventListener('loadedmetadata', handleScroll)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '300vh' }} // Defines how long the scroll/scrub takes
    >
      {/* Background Video tied to scroll fraction */}
      <video
        ref={videoRef}
        src="/Camera_dolly-in_stable_202604232309.mp4"
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          opacity: videoOpacity,
          transform: `scale(1.05) translate(${parallax.x}px, ${parallax.y}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      
      {/* ── Scroll-scrubbed Name & Role Text Overlay ── */}
      <div
        className="fixed inset-0 z-[5] flex flex-col items-center justify-center pointer-events-none select-none px-4 md:px-8"
        style={{ opacity: textState.globalOpacity }}
      >
        {/* Glass Card Container */}
        <div 
          className="relative w-full max-w-5xl px-6 py-16 md:px-16 md:py-24 rounded-[2.5rem] bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center justify-center"
          style={{ 
            opacity: textState.cardOpacity,
            transform: `translateY(${(1 - textState.cardOpacity) * 40}px)`,
            transition: 'none'
          }}
        >
          {/* Subtle inner top light for glass effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

          {/* Name: "Tino Musikavanhu" */}
          <div className="flex flex-wrap justify-center relative z-10" aria-label="Tino Musikavanhu">
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
            className="mt-6 md:mt-8 relative z-10"
            style={{
              opacity: textState.roleOpacity,
              transform: `translateY(${textState.roleY}px)`,
              filter: `blur(${(1 - textState.roleOpacity) * 4}px)`,
            }}
          >
            <p
              className="text-white/90 tracking-[0.25em] uppercase text-center"
              style={{
                fontSize: 'clamp(0.75rem, 2vw, 1.25rem)',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                textShadow: '0 2px 20px rgba(0,0,0,0.6)',
              }}
            >
              Engineer &amp; Technologist
            </p>

            <div
              className="mx-auto mt-5 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
              style={{
                width: `${textState.roleOpacity * 200}px`,
                opacity: textState.roleOpacity,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
