'use client'

import { motion } from 'framer-motion'

// Pure CSS animated gradient — replaces the broken @shadergradient/react package.
// Matches the same fiery amber/orange palette from the original shader config.
export default function ProfileGradient() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        background:
          'linear-gradient(-45deg, #000000, #ff6a1a, #521500, #FD4912, #000000)',
        backgroundSize: '400% 400%',
        opacity: 0.55,
        mixBlendMode: 'screen',
      }}
    />
  )
}
