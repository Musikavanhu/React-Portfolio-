'use client'
import { motion } from 'framer-motion'

export default function EditorialChart({ data, title, type = 'bar', unit = '', description = '' }: any) {
  if (type === 'infographic') {
    return (
      <div className="my-12 p-6 md:p-10 border border-[#1a1a1a]/10 rounded-xl bg-white/40">
        <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
        {description && <p className="text-sm text-[#666] mb-8 font-medium">{description}</p>}
        
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Left Side */}
          <div className="flex-1 border border-[#1a1a1a]/10 rounded-lg p-6 bg-[#f8f8f6]">
            <h4 className="text-xs uppercase tracking-widest text-[#888] font-bold mb-6 pb-2 border-b border-[#1a1a1a]/10">{data.leftTitle || 'The Petrodollar (1974–Present)'}</h4>
            <div className="space-y-5">
              {data.left.map((item: any, i: number) => (
                <div key={i}>
                  <div className="text-[10px] uppercase tracking-wider text-[#999] mb-1">{item.label}</div>
                  <div className="text-sm font-semibold text-[#1a1a1a]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Transition Arrow (Desktop) */}
          <div className="hidden md:flex flex-col items-center justify-center w-8">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-[#1a1a1a]/20 to-transparent relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </div>
          </div>
          
          {/* Right Side */}
          <div className="flex-1 border border-[#1a1a1a] rounded-lg p-6 bg-[#1a1a1a] text-white relative overflow-hidden group">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h4 className="text-xs uppercase tracking-widest text-white/50 font-bold mb-6 pb-2 border-b border-white/20">{data.rightTitle || 'The AI-Dollar (Emerging)'}</h4>
            <div className="space-y-5 relative z-10">
              {data.right.map((item: any, i: number) => (
                <div key={i}>
                  <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{item.label}</div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="text-sm font-semibold text-white/90"
                  >
                    {item.value}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'horizontal') {
    const maxVal = Math.max(...data.map((d: any) => Math.max(...d.values.map((v:any) => v.value))))
    
    return (
      <div className="my-12 p-6 md:p-8 border border-[#1a1a1a]/10 rounded-xl bg-white/40">
        <h3 className="text-xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
        <div className="flex flex-col gap-8">
          {data.map((group: any, i: number) => (
            <div key={i} className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-[#1a1a1a] tracking-wide border-b border-[#1a1a1a]/10 pb-2">{group.category}</span>
              {group.values.map((item: any, j: number) => (
                <div key={j} className="flex items-center gap-4 group/bar">
                  <span className="w-28 text-[11px] md:text-xs text-[#666] uppercase tracking-wider leading-tight">{item.label}</span>
                  <div className="flex-1 h-6 bg-[#1a1a1a]/5 rounded-sm overflow-hidden relative">
                    <motion.div 
                      className={`h-full ${j === 0 ? 'bg-[#1a1a1a]' : 'bg-[#1a1a1a]/30'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.value / maxVal) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 + j * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className="w-20 text-right text-xs font-medium text-[#1a1a1a]">{item.displayValue}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // standard vertical bar
  const maxVal = Math.max(...data.map((d: any) => d.value))
  
  return (
    <div className="my-12 p-6 md:p-8 border border-[#1a1a1a]/10 rounded-xl bg-white/40 relative group">
      <h3 className="text-xl font-bold mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
      <div className="flex items-end h-64 gap-2 md:gap-4 relative z-10">
        {data.map((item: any, i: number) => {
          const heightPct = (item.value / maxVal) * 100
          return (
            <div key={i} className="flex-1 flex flex-col items-center group/bar relative h-full justify-end">
              <div className="absolute bottom-full mb-2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-xs font-semibold text-[#1a1a1a] whitespace-nowrap z-20 bg-white/90 px-2 py-1 rounded shadow-sm border border-black/5">
                {item.value.toLocaleString()}{unit}
              </div>
              <motion.div 
                className="w-full bg-[#1a1a1a] rounded-t-sm"
                initial={{ height: 0 }}
                whileInView={{ height: `${heightPct}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              />
              <div className="mt-3 text-[10px] md:text-xs text-[#666] font-medium tracking-wide text-center uppercase">
                {item.label.split(' ').map((l:any, idx:number) => <div key={idx}>{l}</div>)}
              </div>
            </div>
          )
        })}
      </div>
      <div className="absolute inset-0 pointer-events-none p-6 md:p-8 flex flex-col justify-end pb-[3.5rem] md:pb-[3.5rem] z-0 mt-12">
        {[0, 1, 2, 3].map(i => (
           <div key={i} className="border-t border-[#1a1a1a]/5 w-full h-[25%]" />
        ))}
      </div>
    </div>
  )
}
