'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GlossaryTooltip({ term, definition }: { term: string, definition: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <span className="underline decoration-dashed decoration-[#1a1a1a]/40 underline-offset-[3px] cursor-help text-[#1a1a1a] font-semibold transition-colors hover:bg-[#1a1a1a]/5 rounded-sm px-0.5">
        {term}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#1a1a1a] text-[#f5f5f0] text-[13px] rounded-lg shadow-xl pointer-events-none text-left font-sans"
          >
            <div className="font-bold text-[10px] uppercase tracking-widest text-white/50 mb-1.5 border-b border-white/10 pb-1.5">Glossary</div>
            <div className="leading-snug">{definition}</div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-[#1a1a1a]" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
