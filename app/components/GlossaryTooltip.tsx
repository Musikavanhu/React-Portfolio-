'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GlossaryTooltip({ term, definition }: { term: string, definition: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewports dynamically to prevent SSR issues
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close the sheet when clicking anywhere outside of it
  useEffect(() => {
    if (isHovered && isMobile) {
      const handleOutsideClick = () => {
        setIsHovered(false)
      }
      document.addEventListener('click', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick)
      return () => {
        document.removeEventListener('click', handleOutsideClick)
        document.removeEventListener('touchstart', handleOutsideClick)
      }
    }
  }, [isHovered, isMobile])

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMobile) {
      e.preventDefault()
      e.stopPropagation()
      setIsHovered(!isHovered)
    }
  }

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleToggle}
    >
      <span className="underline decoration-dashed decoration-[#1a1a1a]/40 underline-offset-[3px] cursor-help text-[#1a1a1a] font-semibold transition-colors hover:bg-[#1a1a1a]/5 rounded-sm px-0.5 select-none">
        {term}
      </span>
      <AnimatePresence>
        {isHovered && (
          isMobile ? (
            // Mobile iOS-style floating bottom sheet
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="fixed bottom-6 left-4 right-4 z-[999] p-4 bg-[#1a1a1a] text-[#f5f5f0] rounded-xl shadow-2xl border border-white/10 text-left font-sans pointer-events-auto"
              onClick={(e) => e.stopPropagation()} // Prevent immediate closing on tapping inside sheet
            >
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/10">
                <span className="font-bold text-[10px] uppercase tracking-widest text-white/50">Glossary Definition</span>
                <button 
                  onClick={() => setIsHovered(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="font-bold text-[15px] text-white mb-1">{term}</div>
              <div className="text-[13px] leading-relaxed text-white/80">{definition}</div>
            </motion.div>
          ) : (
            // Desktop floating tooltip
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#1a1a1a] text-[#f5f5f0] text-[13px] rounded-lg shadow-xl pointer-events-none text-left font-sans"
            >
              <div className="font-bold text-[10px] uppercase tracking-widest text-white/50 mb-1.5 border-b border-white/10 pb-1.5">Glossary</div>
              <div className="font-semibold text-white mb-0.5">{term}</div>
              <div className="leading-snug">{definition}</div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-[#1a1a1a]" />
            </motion.div>
          )
        )}
      </AnimatePresence>
    </span>
  )
}
