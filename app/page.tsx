'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import ScrollCanvas from './components/ScrollCanvas'
import ToTSolver from './components/ToTSolver'

import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Atom,
  Brain,
  Zap,
  Globe,
  Microscope,
  Cpu,
  Shield,
  Lightbulb,
  Download,
  Menu,
  X,
  Network,
  BrainCircuit,
  TrendingUp,
  Activity,
  Layout,
  Database,
  Code,
  Flame,
  Server,
  Terminal,
  ChevronRight,
  Layers
} from 'lucide-react'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const WELCOME_PHRASES = [
  "Welcome to My World.",
  "Bienvenido a mi mundo.",
  "Bienvenue dans mon monde.",
  "Willkommen in meiner Welt.",
  "Benvenuto nel mio mondo.",
  "Bem-vindo ao meu mundo.",
  "私の世界へようこそ",
  "欢迎来到我的世界"
]

const TypewriterIntro = () => {
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = WELCOME_PHRASES[phraseIndex]

    let timer: NodeJS.Timeout

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % WELCOME_PHRASES.length)
      } else {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1))
        }, 40) // deletion speed
      }
    } else {
      if (text === currentPhrase) {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 2500) // pause before delete
      } else {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1))
        }, 80) // typing speed
      }
    }

    return () => clearTimeout(timer)
  }, [text, isDeleting, phraseIndex])

  return (
    <div className="flex justify-center items-center h-[1.5em] mb-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight flex items-center" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
        <span>{text}</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[3px] h-[0.9em] bg-white ml-2 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
      </h1>
    </div>
  )
}

// ─── About Card — 2-page paginated component ─────────────────────────────────
function AboutCard({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const [page, setPage] = useState(0)
  const totalPages = 2

  return (
    <motion.div
      className="max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto relative rounded-[2rem] overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(40px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.6)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, margin: "300px" }}
    >
      {/* Card inner: left = portrait (50%), right = content */}
      <div className="flex flex-col md:flex-row" style={{ minHeight: '540px' }}>

        {/* ── Left: Portrait — edge-to-edge, no padding, no border ── */}
        <div className="relative w-full h-80 sm:h-96 md:w-1/2 md:h-auto flex-shrink-0 overflow-hidden">
          <img
            src="/tino-portrait.png"
            alt="Tino Musikavanhu"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'contrast(1.05) saturate(1.08)', objectPosition: 'center 10%' }}
          />
          {/* Mobile bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-28 md:hidden" style={{
            background: 'linear-gradient(to top, rgba(20,20,28,0.97) 0%, rgba(20,20,28,0.3) 70%, transparent 100%)',
          }} />
          {/* Desktop right fade */}
          <div className="hidden md:block absolute inset-y-0 right-0 w-20" style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(20,20,28,0.65) 100%)',
          }} />
        </div>

        {/* ── Right: Content + footer ── */}
        <div className="flex-1 flex flex-col p-7 md:p-10 lg:p-14">

          {/* Fixed-height content zone — panels are absolutely positioned so no layout shift */}
          <div className="flex-1 relative" style={{ minHeight: '320px' }}>

            {/* PAGE 0 — Profile */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              animate={{ opacity: page === 0 ? 1 : 0, pointerEvents: page === 0 ? 'auto' : 'none' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {/* Name + badge */}
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                  Tino Musikavanhu
                </h2>
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              </div>

              <p className="text-[13px] md:text-[15px] text-white/50 font-medium mb-4 tracking-wide">
                Full-Stack Engineer · AI Integration · Systems Design
              </p>

              <div className="h-px bg-white/10 mb-4" />

              <div className="text-[13px] md:text-[14px] lg:text-[15px] text-white/80 leading-[1.8] mb-5 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '130px' }}>
                <p className="mb-2">
                  My full name is Tinotenda Musikavanhu, but professionally, I prefer to be addressed as Tino. My passion for software development emerged when I aspired to establish my own business. In this endeavor, I learned how to develop iOS applications and collaborated with a team of skilled professionals, including a senior engineer. This experience served as my initial exposure to the tech industry and sparked my curiosity to explore further. Over time, I immersed myself in multiple programming languages, and I was fortunate enough to share my knowledge with a vast audience of over 30,000 followers on social media platforms. What began as simple projects utilizing online resources transformed into personally gratifying work, and I even ventured into the realm of tutoring.
                </p>
                <p>
                  Overall, my journey into software development has been one of self-discovery, learning, and growth. I am confident that my experience, coupled with my passion for technology, has provided me with a solid foundation to excel in this field.
                </p>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Next.js', 'AI Agents', 'Systems Design'].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-[11px] md:text-[12px] font-medium tracking-wide text-white/80"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* PAGE 1 — Education */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              animate={{ opacity: page === 1 ? 1 : 0, pointerEvents: page === 1 ? 'auto' : 'none' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight">
                Education
              </h3>
              <p className="text-white/40 text-sm mb-5 tracking-wide">Academic background</p>

              <div className="h-px bg-white/10 mb-5" />

              {/* SMU */}
              <div className="mb-5 flex gap-4 items-start">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black text-white tracking-tight"
                  style={{ background: 'rgba(153,27,27,0.35)', border: '1px solid rgba(220,38,38,0.3)' }}
                >
                  SMU
                </div>
                <div>
                  <p className="text-white font-semibold text-[15px] md:text-[16px] leading-tight">Southern Methodist University</p>
                  <p className="text-white/50 text-[12px] mt-0.5">Dallas, TX</p>
                  <p className="text-white/70 text-[13px] md:text-[14px] mt-1.5 leading-relaxed">

                  </p>
                </div>
              </div>

              {/* Harvard */}
              <div className="flex gap-4 items-start">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black text-white tracking-tight"
                  style={{ background: 'rgba(120,53,15,0.35)', border: '1px solid rgba(217,119,6,0.3)' }}
                >
                  HU
                </div>
                <div>
                  <p className="text-white font-semibold text-[15px] md:text-[16px] leading-tight">Harvard University </p>
                  <p className="text-white/50 text-[12px] mt-0.5">Cambridge, Massachusetts</p>
                  {/* <div className="text-white/70 text-[12px] md:text-[13px] mt-1.5 leading-relaxed overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '90px' }}>
                    An intensive and comprehensive course covering a wide range of computer science topics. Acquired expertise in multiple programming languages, including JavaScript , Sql , and C++, and gained hands-on experience in software development, algorithms, data structures, and artificial intelligence. Developed strong analytical and problem-solving skills, enabling the ability to analyze complex problems and develop effective solutions. Participated in collaborative projects and worked with diverse teams, fostering excellent communication and teamwork abilities. Completed the program with a solid understanding of computer science principles and practices, ready to apply this knowledge to real-world challenges.
                  </div> */}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Stable footer: CTA row + divider + dots ── */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-4">

            {/* Button row — fades in sync with page content so no white flash */}
            <motion.div
              key={page}
              className="flex items-center justify-center gap-3 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {page === 0 ? (
                <>
                  <button
                    onClick={() => scrollToSection('experience')}
                    className="px-6 py-2.5 rounded-full text-[13px] md:text-[14px] font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                    style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)' }}
                  >
                    View Work
                  </button>
                  <a
                    href="/resume.pdf"
                    download="Tino_Musikavanhu_Resume.pdf"
                    className="px-6 py-2.5 rounded-full text-[13px] md:text-[14px] font-semibold text-white text-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] hover:bg-white/[0.15]"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    Résumé
                  </a>
                  <button
                    onClick={() => setPage(1)}
                    className="px-6 py-2.5 rounded-full text-[13px] md:text-[14px] font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] hover:bg-white/[0.15]"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    Education →
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setPage(0)}
                  className="px-6 py-2.5 rounded-full text-[13px] md:text-[14px] font-semibold text-white/70 transition-all duration-200 hover:text-white hover:scale-[1.03] active:scale-[0.97] hover:bg-white/[0.08]"
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.18)' }}
                >
                  ← Profile
                </button>
              )}
            </motion.div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === page ? '20px' : '6px',
                    height: '6px',
                    background: i === page ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
                  }}
                />
              ))}
              <span className="text-white/25 text-[11px] ml-2 tracking-widest font-medium">
                {page + 1} / {totalPages}
              </span>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}



export default function Home() {

  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedCard, setSelectedCard] = useState<any | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const [skillModal, setSkillModal] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Fluid background component with interactive cursor spotlight
  const FluidBackground = () => (
    <div className="fluid-bg-container pointer-events-none">
      <div className="fluid-orb orb-1"></div>
      <div className="fluid-orb orb-2"></div>
      <div className="fluid-orb orb-3"></div>
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] bg-blue-500/10 pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 1 }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[100px] z-10"></div>
    </div>
  )

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'research', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      // Track if we've scrolled down slightly, to fade out the intro overlay
      const heroThreshold = window.innerHeight * 0.15
      setIsPastHero(window.scrollY > heroThreshold)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Expandable Card Modal - Moved to top level for fixed viewport positioning */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedCard(null)}
            />

            <motion.div
              layoutId={`${selectedCard.type}-${selectedCard.index}`}
              className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 relative cursor-default z-[101]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 transition-colors glass-button p-2 rounded-full flex items-center justify-center w-10 h-10"
              >
                ✕
              </button>

              <div className={`text-${selectedCard.color}-400 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`}>
                {selectedCard.icon}
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white text-shadow-glow">
                {selectedCard.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                {selectedCard.status && (
                  <span className={`px-4 py-1.5 bg-${selectedCard.color}-600/20 text-${selectedCard.color}-400 rounded-full text-sm font-medium inline-block`}>
                    {selectedCard.status}
                  </span>
                )}

                {selectedCard.highlight && (
                  <span className="px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium inline-block">
                    Breakthrough Research
                  </span>
                )}
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-slate-200 leading-relaxed mb-8">
                  {selectedCard.description}
                </p>

                {selectedCard.tech && (
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-4">Core Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCard.tech.map((tech: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-slate-200 rounded-full text-sm backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Detailed View</h4>
                  <p className="text-slate-300 leading-relaxed mix-blend-screen text-shadow-glass">
                    This expanded view provides a deeper look into the architecture and outcomes of the project.
                    The implementation utilizes advanced state management, real-time data synchronization,
                    and a highly optimized rendering pipeline to achieve seamless performance.
                    Future iterations aim to further enhance scalability and predictive capabilities using next-generation modeling.
                  </p>
                </div>

                {selectedCard.link && selectedCard.link !== "#" && (
                  <motion.a
                    href={selectedCard.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button glass-button-primary inline-flex items-center px-8 py-4 rounded-full font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Source Material <ExternalLink className="w-5 h-5 ml-2" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen font-sans overflow-x-hidden selection:bg-blue-500/30 selection:text-white bg-black">

        {/* ===== CINEMATIC SCROLL CANVAS HERO ===== */}
        <ScrollCanvas />

        {/* Hero overlay content — pinned over the first viewport of the scroll canvas */}
        <div className="fixed inset-0 z-10 pointer-events-none" style={{ height: '100vh' }}>
          {/* Navigation - Floating Glass Pill */}
          <motion.nav
            initial={{ y: -100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
            className={`fixed top-3 md:top-6 left-1/2 z-50 w-[94%] md:w-[90%] max-w-6xl glass-nav transition-all duration-300 pointer-events-auto shadow-2xl ${isMobileMenuOpen ? 'rounded-2xl md:rounded-3xl' : 'rounded-full'
              }`}
          >
            <div className="px-4 py-2 md:px-6 md:py-3 flex items-center justify-between w-full">
              {/* Left Logo */}
              <div className="flex-1 flex justify-start">
                <div
                  className="text-xl md:text-3xl cursor-pointer font-bold text-white tracking-widest"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  style={{
                    fontFamily: "'Playfair Display', serif"
                  }}
                >
                  TM.
                </div>
              </div>

              {/* Center Links */}
              <div className="hidden md:flex flex-none justify-center gap-2 lg:gap-6">
                {[
                  { id: 'about', label: 'About' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'research', label: 'Research' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-full ${activeSection === item.id
                      ? 'bg-white/10 text-white shadow-glass-inset'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Right Links & Icons */}
              <div className="hidden md:flex flex-1 items-center justify-end gap-5">
                <Link href="/blog" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5">Journal</Link>
                <div className="flex items-center gap-4">
                  <a href="https://github.com/Musikavanhu" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors hover:scale-110">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/tino-m-630086124" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors hover:scale-110">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Mobile Menu Toggle Button */}
              <div className="md:hidden flex items-center justify-end flex-1">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-slate-300 hover:text-white focus:outline-none p-1.5 rounded-full hover:bg-white/5 transition-colors pointer-events-auto"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="md:hidden overflow-hidden bg-black/40 backdrop-blur-lg border-t border-white/10 rounded-b-[2rem]"
                >
                  <div className="flex flex-col px-6 py-4 space-y-2">
                    {[
                      { id: 'about', label: 'About' },
                      { id: 'experience', label: 'Experience' },
                      { id: 'research', label: 'Research' },
                      { id: 'skills', label: 'Skills' },
                      { id: 'projects', label: 'Projects' },
                      { id: 'contact', label: 'Contact' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          scrollToSection(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left text-sm font-medium transition-all duration-300 px-4 py-3 rounded-xl pointer-events-auto ${activeSection === item.id
                          ? 'bg-white/10 text-white'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}

                    <Link href="/blog" className="text-left text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 px-4 py-3 rounded-xl pointer-events-auto" onClick={() => setIsMobileMenuOpen(false)}>Journal</Link>

                    <div className="flex items-center space-x-6 pt-4 px-4 pb-2">
                      <a href="https://github.com/Musikavanhu" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors pointer-events-auto">
                        <Github className="w-6 h-6" />
                      </a>
                      <a href="https://www.linkedin.com/in/tino-m-630086124" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors pointer-events-auto">
                        <Linkedin className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* Hero CTA Buttons - Centered in viewport, fade when scrolling past */}
          <div className={`absolute inset-0 flex flex-col justify-center items-center w-full px-4 sm:px-6 lg:px-8 pointer-events-none transition-opacity duration-500 ${isPastHero ? 'opacity-0' : 'opacity-100'}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto w-full mt-24"
            >
              {/* Welcome Intro Text */}
              <motion.div
                className="mb-8 md:mb-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              >
                <TypewriterIntro />
                <p className="text-white/90 text-base md:text-lg lg:text-xl font-light tracking-wide max-w-2xl mx-auto" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  I am <span className="font-semibold text-white">Tino Musikavanhu</span> — an Engineer & Technologist. <br className="hidden md:block" />
                  Scroll down to explore my journey.
                </p>
              </motion.div>


            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="pointer-events-auto"
              >
                <ChevronDown className="w-6 h-6 text-white/50" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-white origin-left rounded-r-full"
          style={{
            scaleX,
            zIndex: 100,
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8), 0 0 20px 4px rgba(200, 220, 255, 0.4)'
          }}
        />

        {/* About / Professional Summary Section */}
        <section id="about" className="sticky bottom-0 min-h-[100dvh] w-full flex flex-col items-center justify-center relative z-10 overflow-hidden">
          {/* Art Backdrop — painting fills full viewport */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, margin: '-10%' }}
          >
            <img
              src="/about-backdrop.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
              aria-hidden="true"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.65) 100%)' }} />
            <motion.div
              className="absolute inset-0 backdrop-blur-[3px]"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: false, margin: "300px" }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "300px" }}
            >
              About
            </motion.h2>
            <motion.p
              className="text-white/60 text-center mb-10 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "300px" }}
            >
              Engineer, technologist, and lifelong builder.
            </motion.p>

            {/* ── Paginated Card ── */}
            <AboutCard scrollToSection={scrollToSection} />
          </div>
        </section>


        {/* Experience Section — Glassmorphism over Backdrop */}
        <section id="experience" className="sticky bottom-0 min-h-[100dvh] w-full flex flex-col items-center justify-center relative z-20 overflow-hidden border-t border-white/5">
          {/* Parallax Backdrop Image */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, margin: "-10%" }}
          >
            <img
              src="/backdrop.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
              aria-hidden="true"
            />
            {/* Dark gradient overlay so glass cards stay readable */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.75) 100%)' }} />
            {/* Frosted reveal sweep — fades in from top as section enters */}
            <motion.div
              className="absolute inset-0 backdrop-blur-[3px]"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: false, margin: "300px" }}
            />
          </motion.div>

          <div className="relative z-10 w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-6 text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, margin: "300px" }}
              >
                Experience
              </motion.h2>
              <motion.p
                className="text-white/60 text-center mb-16 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, margin: "300px" }}
              >
                Building high-performance systems for real-world impact.
              </motion.p>

              {/* Frosted glass card */}
              <motion.div
                className="relative rounded-[2rem] overflow-hidden p-8 md:p-12 lg:p-14"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(40px) saturate(1.6)',
                  WebkitBackdropFilter: 'blur(40px) saturate(1.6)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, margin: "300px" }}
              >
                {/* Safehaven */}
                <div className="mb-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Software Engineer
                      </h3>
                      <h4 className="text-lg text-white/80 font-medium mb-1">Safehaven</h4>
                    </motion.div>
                    <motion.div
                      className="mt-4 md:mt-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      <span className="px-5 py-2 rounded-full text-sm font-medium text-white/90 border border-white/20"
                        style={{ background: 'rgba(255,255,255,0.1)' }}
                      >
                        Software Development
                      </span>
                    </motion.div>
                  </div>

                  <motion.p
                    className="text-[15px] text-white/80 leading-relaxed mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, margin: "300px" }}
                  >
                    Develop, maintain, and enhance Safehaven's software products using JavaScript and other relevant technologies. Collaborated with cross-functional teams including designers, product managers, and other developers to implement new features and functionality. Wrote clean, efficient, and maintainable code that adheres to industry standards and best practices. Conducted code reviews and provide constructive feedback to other team members to ensure high-quality codebase.Ensure that software products are tested thoroughly and perform optimally across various platforms and browsers.Stayed up-to-date with the latest trends and advancements in JavaScript and related technologies, and incorporate them into the product development process.Participated in the development of technical documentation, user manuals, and other related materials.Troubleshoot and resolve technical issues reported by users, and provide timely support as needed.
                  </motion.p>
                </div>

                <div className="h-px bg-white/10 mb-8" />

                {/* Protatech */}
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Software Engineer
                      </h3>
                      <h4 className="text-lg text-white/80 font-medium mb-1">Protatech</h4>
                    </motion.div>
                    <motion.div
                      className="mt-4 md:mt-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      <span className="px-5 py-2 rounded-full text-sm font-medium text-white/90 border border-white/20"
                        style={{ background: 'rgba(255,255,255,0.1)' }}
                      >
                        Database & App Dev
                      </span>
                    </motion.div>
                  </div>

                  <motion.p
                    className="text-[15px] text-white/80 leading-relaxed mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, margin: "300px" }}
                  >
                    Experienced Database Analyst and Developer with a proven track record of designing, developing, and maintaining complex databases for various applications. Adept at working collaboratively with cross-functional teams to understand business requirements and ensuring that database solutions meet those requirements. Possesses a strong ability to analyze and forecast potential database concerns, developing effective solutions and streamlining processes. Exceptional communication skills and proficiency in multiple programming languages including Angular, SQL, and Swift. Demonstrated success in enhancing client response time and delivering products ahead of schedule.
                  </motion.p>

                  <motion.ul
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, margin: "300px" }}
                  >
                    {[
                      'Analyzed and Foretasted Database concerns for the NFL’s Employee management database on site at the Super Bowl. Executed more than 5,000 employee verifications, which Streamlined to 15% of all attendance to be assigned perfectly.',
                      'Supported a new enterprise application in the Angular framework for risk management. Redesigned 75% of the existing database structure;Later shaped the product delivery to be assigned to the client two days earlier.',
                      'Streamlined current bugs of employee management application directly with clients. Client response time and remedy now enhanced to be 20% faster with new hours of operation.',
                    ].map((bullet, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-[15px] text-white/80 leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 + i * 0.1 }}
                        viewport={{ once: false, margin: "300px" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 flex-shrink-0" />
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        {/* Projects / Research Section — Featured Project */}
        <section id="research" className="sticky bottom-0 min-h-[100dvh] w-full flex flex-col items-center justify-center relative z-30 overflow-hidden bg-[#0a0a0f] border-t border-white/5">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "300px" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">
                Current Projects
              </h2>
              <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
                Exploring the intersection of AI, automation, and interactive systems.
              </p>

              {/* Featured Project Card */}
              <motion.div
                className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0a1628 0%, #0f1d35 40%, #0b1525 100%)',
                }}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, margin: "300px" }}
              >
                {/* Ambient glow */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at 70% 30%, rgba(16,185,129,0.1) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(59,130,246,0.08) 0%, transparent 50%)',
                }} />

                <div className="grid md:grid-cols-2 items-stretch">
                  {/* Left — Project Image */}
                  <motion.div
                    className="relative overflow-hidden min-h-[300px] md:min-h-[500px]"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: false, margin: "300px" }}
                  >
                    <img
                      src="/sims4-ai-project.gif"
                      alt="AI Gameplay Automation System — Dashboard"
                      className="w-full h-full object-cover"
                    />
                    {/* Edge gradient blend */}
                    <div className="absolute inset-0 hidden md:block" style={{
                      background: 'linear-gradient(to left, #0f1d35 0%, transparent 30%)',
                    }} />
                    <div className="absolute inset-0 md:hidden" style={{
                      background: 'linear-gradient(to top, #0a1628 0%, transparent 40%)',
                    }} />

                    {/* Status badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 backdrop-blur-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        In Active Development
                      </span>
                    </div>
                  </motion.div>

                  {/* Right — Project Details */}
                  <div className="relative z-10 px-8 py-10 md:px-14 md:py-16 lg:px-16 lg:py-20 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <Brain className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-xs font-medium tracking-widest uppercase text-slate-400">Featured Project</span>
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                      >
                        AI Gameplay Automation System
                      </h3>
                      <p className="text-slate-400 text-sm mb-6">The Sims 4 • Python • Real-time Agent Framework</p>
                    </motion.div>

                    <motion.p
                      className="text-[15px] text-slate-300 leading-[1.8] mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      Built a custom autonomous agent framework that integrates a Python-based Sims 4 mod with an external controller
                      to observe game state, plan actions, and execute behaviors in real time.
                    </motion.p>

                    {/* Key bullets */}
                    <motion.ul
                      className="space-y-3 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      {[
                        'Real-time AI agent pipeline over a custom socket bridge',
                        'Autonomous needs management, career actions & economy behaviors',
                        'Action parsing and affordance-matching for valid in-game interactions',
                        'Recovery, retry & cooldown systems for reliable agent behavior',
                        'Debugging tools, planner telemetry & in-game diagnostics',
                      ].map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                          <Zap className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </motion.ul>

                    {/* Tech stack pills */}
                    <motion.div
                      className="flex flex-wrap gap-2 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      {['Python', 'AI Agents', 'Socket Comms', 'State Machines', 'Game Modding', 'Heuristic Planning'].map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium text-emerald-300/80 border border-emerald-500/20"
                          style={{ background: 'rgba(16,185,129,0.06)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      <motion.button
                        onClick={() => scrollToSection('projects')}
                        className="group inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border border-white/15 text-white hover:bg-white/5"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        View all projects
                        <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Second Featured Project Card */}
              <motion.div
                className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mt-12"
                style={{
                  background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1222 40%, #080812 100%)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, margin: "300px" }}
              >
                {/* Ambient glow */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(56,189,248,0.1) 0%, transparent 50%)',
                }} />

                <div className="grid md:grid-cols-2 items-stretch">
                  {/* Left — Project Details (Switching sides for variety) */}
                  <div className="relative z-10 px-8 py-10 md:px-14 md:py-16 lg:px-16 lg:py-20 flex flex-col justify-center order-2 md:order-1">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                          <Network className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="text-xs font-medium tracking-widest uppercase text-slate-400">Research Focus</span>
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                      >
                        AI Systems Research <br /> <span className="text-lg md:text-xl font-normal text-slate-300">Latent Planning + Autoregressive Gen</span>
                      </h3>
                      <p className="text-slate-400 text-sm mb-6">PyTorch • HuggingFace • MPS • Diffusion Models</p>
                    </motion.div>

                    <motion.p
                      className="text-[15px] text-slate-300 leading-[1.8] mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      Developed a two-stage neural architecture combining a diffusion-based latent planner with an autoregressive LLM decoder via a learned projection bridge, enabling clear separation of "what to say" from "how to say it".
                    </motion.p>

                    {/* Key bullets */}
                    <motion.ul
                      className="space-y-3 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      {[
                        'Evaluated gated, MLP, and residual projection architectures',
                        'Implemented self-shuffle contrastive loss to enforce structure encoding',
                        'Achieved strong coupling with 53.5% attention allocated to latent prefix',
                        'Developed stable mixed-precision training protocol on Apple MPS',
                        'Eliminated NaN gradient failures without backpropagation through decoder',
                      ].map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                          <BrainCircuit className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </motion.ul>

                    {/* Tech stack pills */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: false, margin: "300px" }}
                    >
                      {['Neural Archs', 'Latent Space', 'Contrastive Loss', 'Attention Maps', 'MPS Training'].map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium text-purple-300/80 border border-purple-500/20"
                          style={{ background: 'rgba(168,85,247,0.06)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Right — LLM Walking GIF */}
                  <motion.div
                    className="relative overflow-hidden min-h-[300px] md:min-h-full order-1 md:order-2"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: false, margin: "300px" }}
                  >
                    <img
                      src="/llmwalking.gif"
                      alt="LLM walking through latent space"
                      className="w-full h-full object-cover"
                    />
                    {/* Edge gradient blend — right to left */}
                    <div className="absolute inset-0 hidden md:block" style={{
                      background: 'linear-gradient(to right, #0d1222 0%, transparent 30%)',
                    }} />
                    <div className="absolute inset-0 md:hidden" style={{
                      background: 'linear-gradient(to top, #0a0a0f 0%, transparent 40%)',
                    }} />

                    {/* Floating metrics badges */}
                    <motion.div
                      className="absolute top-[20%] right-[10%] px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm shadow-xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="text-[10px] text-purple-300/70 font-mono tracking-wider mb-0.5">LATENT PLAN</div>
                      <div className="text-xs font-semibold text-purple-100 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        Δ Loss +1.35 nats
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute bottom-[20%] right-[10%] px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 backdrop-blur-sm shadow-xl"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="text-[10px] text-sky-300/70 font-mono tracking-wider mb-0.5">ATTENTION ATTRIB</div>
                      <div className="text-xs font-semibold text-sky-100 flex items-center gap-1">
                        <Activity className="w-3 h-3 text-sky-400" />
                        53.5% Allocation
                      </div>
                    </motion.div>

                  </motion.div>
                </div>
              </motion.div>

              <div className="mt-12">
                {/* Tree of Thoughts Live AI Solver */}
                <ToTSolver />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section — Glassmorphism over Ocean Gradient */}
        <section id="skills" className="sticky bottom-0 min-h-[100dvh] w-full flex flex-col items-center justify-center relative z-40 overflow-hidden bg-[#0a0a0f] border-t border-white/5">
          {/* Vibrant gradient background */}
          <div className="absolute inset-0">
            <img
              src="/gradient-ocean.png"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="relative z-10 w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-6 text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, margin: "300px" }}
              >
                Core Skills & Expertise
              </motion.h2>
              <motion.p
                className="text-white/60 text-center mb-16 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, margin: "300px" }}
              >
                Technologies and tools I work with every day.
              </motion.p>

              {/* Apple-style Bento Grid with Learn More */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">

                {/* ── Tile: AI & Systems (Featured) — full width on mobile, 2×2 on desktop ── */}
                <motion.div
                  className="group col-span-2 md:row-span-2 relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden p-6 md:p-10 flex flex-col justify-end items-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.02] min-h-[200px] md:min-h-0"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(30px) saturate(1.5)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: false, margin: "300px" }}
                  onClick={() => setSkillModal('ai')}
                >
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
                  <div className="flex-1 flex items-center justify-center">
                    {/* Custom neural brain SVG */}
                    <svg className="w-20 h-20 md:w-32 md:h-32 drop-shadow-[0_0_24px_rgba(16,185,129,0.4)]" viewBox="0 0 96 96" fill="none">
                      <circle cx="48" cy="48" r="20" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                      <circle cx="48" cy="48" r="8" fill="rgba(16,185,129,0.8)" />
                      <circle cx="48" cy="48" r="35" stroke="rgba(16,185,129,0.3)" strokeWidth="1" fill="none" />
                      <circle cx="30" cy="28" r="4" fill="rgba(16,185,129,0.5)" /><line x1="34" y1="30" x2="44" y2="42" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
                      <circle cx="66" cy="28" r="4" fill="rgba(16,185,129,0.5)" /><line x1="62" y1="30" x2="52" y2="42" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
                      <circle cx="24" cy="52" r="3.5" fill="rgba(16,185,129,0.4)" /><line x1="27" y1="51" x2="40" y2="48" stroke="rgba(16,185,129,0.25)" strokeWidth="1" />
                      <circle cx="72" cy="52" r="3.5" fill="rgba(16,185,129,0.4)" /><line x1="69" y1="51" x2="56" y2="48" stroke="rgba(16,185,129,0.25)" strokeWidth="1" />
                      <circle cx="36" cy="72" r="3" fill="rgba(16,185,129,0.35)" /><line x1="38" y1="69" x2="45" y2="56" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                      <circle cx="60" cy="72" r="3" fill="rgba(16,185,129,0.35)" /><line x1="58" y1="69" x2="51" y2="56" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 tracking-tight mt-4 z-10">AI & Systems</h3>
                  <p className="text-emerald-400 font-medium text-xs md:text-sm tracking-wide z-10 mb-2">Multi-Agent · LLM · Latent Planning</p>
                  <span className="text-white/40 text-[11px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">Learn more <ChevronRight className="w-3 h-3" /></span>
                </motion.div>

                {/* ── Tile: React & Next.js ── */}
                <motion.div
                  className="group col-span-1 row-span-1 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden p-5 md:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(30px) saturate(1.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: false, margin: "300px" }}
                  onClick={() => setSkillModal('react')}
                >
                  <svg className="w-10 h-10 md:w-12 md:h-12 mb-2 md:mb-3" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="4" fill="#61DAFB" />
                    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
                    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 24 24)" />
                    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 24 24)" />
                  </svg>
                  <span className="text-white font-semibold text-xs md:text-sm">React &<br />Next.js</span>
                  <span className="text-white/40 text-[10px] mt-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Learn more <ChevronRight className="w-3 h-3" /></span>
                </motion.div>

                {/* ── Tile: TypeScript ── */}
                <motion.div
                  className="group col-span-1 row-span-1 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden p-5 md:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(30px) saturate(1.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: false, margin: "300px" }}
                  onClick={() => setSkillModal('typescript')}
                >
                  <svg className="w-10 h-10 md:w-12 md:h-12 mb-2 md:mb-3" viewBox="0 0 48 48" fill="none">
                    <rect x="4" y="4" width="40" height="40" rx="6" fill="#3178C6" />
                    <text x="24" y="32" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="system-ui">TS</text>
                  </svg>
                  <span className="text-white font-semibold text-xs md:text-sm">TypeScript</span>
                  <span className="text-white/40 text-[10px] mt-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Learn more <ChevronRight className="w-3 h-3" /></span>
                </motion.div>

                {/* ── Tile: PyTorch ── */}
                <motion.div
                  className="group col-span-1 row-span-1 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden p-5 md:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(30px) saturate(1.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: false, margin: "300px" }}
                  onClick={() => setSkillModal('pytorch')}
                >
                  <svg className="w-10 h-10 md:w-12 md:h-12 mb-2 md:mb-3" viewBox="0 0 48 48" fill="none">
                    <path d="M24 4C24 4 32 14 32 24C32 28.418 28.418 32 24 32C19.582 32 16 28.418 16 24C16 20 20 16 20 16" stroke="#EE4C2C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <circle cx="24" cy="28" r="4" fill="#EE4C2C" />
                    <path d="M24 8C24 8 36 18 36 28C36 34.627 30.627 40 24 40C17.373 40 12 34.627 12 28C12 18 24 8 24 8Z" stroke="#EE4C2C" strokeWidth="1.5" fill="none" opacity="0.4" />
                  </svg>
                  <span className="text-white font-semibold text-xs md:text-sm">PyTorch</span>
                  <span className="text-white/40 text-[10px] mt-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Learn more <ChevronRight className="w-3 h-3" /></span>
                </motion.div>

                {/* ── Tile: Node.js ── */}
                <motion.div
                  className="group col-span-1 row-span-1 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden p-5 md:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(30px) saturate(1.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: false, margin: "300px" }}
                  onClick={() => setSkillModal('node')}
                >
                  <svg className="w-10 h-10 md:w-12 md:h-12 mb-2 md:mb-3" viewBox="0 0 48 48" fill="none">
                    <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" stroke="#68A063" strokeWidth="1.5" fill="none" />
                    <polygon points="24,10 36,17 36,31 24,38 12,31 12,17" fill="rgba(104,160,99,0.2)" />
                    <text x="24" y="29" textAnchor="middle" fill="#68A063" fontSize="14" fontWeight="bold" fontFamily="system-ui">N</text>
                  </svg>
                  <span className="text-white font-semibold text-xs md:text-sm">Node.js</span>
                  <span className="text-white/40 text-[10px] mt-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Learn more <ChevronRight className="w-3 h-3" /></span>
                </motion.div>

                {/* ── Tile: State Machines (wide 2×1) ── */}
                <motion.div
                  className="group col-span-2 row-span-1 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden px-6 py-5 md:px-8 md:py-6 flex items-center justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(30px) saturate(1.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: false, margin: "300px" }}
                  onClick={() => setSkillModal('statemachines')}
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-500 mb-1 drop-shadow">State Machines</h3>
                    <p className="text-white/60 text-xs md:text-sm">Game Modding & Automation</p>
                    <span className="text-white/40 text-[10px] flex items-center gap-0.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Learn more <ChevronRight className="w-3 h-3" /></span>
                  </div>
                  <Terminal className="w-10 h-10 md:w-12 md:h-12 text-amber-500/40" />
                </motion.div>

                {/* ── Tile: Data Telemetry (wide 2×1) ── */}
                <motion.div
                  className="group col-span-2 row-span-1 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden px-6 py-5 md:px-8 md:py-6 flex items-center justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(30px) saturate(1.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: false, margin: "300px" }}
                  onClick={() => setSkillModal('telemetry')}
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-fuchsia-400 mb-1 drop-shadow">Data Telemetry</h3>
                    <p className="text-white/60 text-xs md:text-sm">Real-time Pipeline Tracking</p>
                    <span className="text-white/40 text-[10px] flex items-center gap-0.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Learn more <ChevronRight className="w-3 h-3" /></span>
                  </div>
                  <Activity className="w-10 h-10 md:w-12 md:h-12 text-fuchsia-400/40" />
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Skill Detail Modal ── */}
        <AnimatePresence>
          {skillModal && (() => {
            const data: Record<string, { title: string; color: string; icon: React.ReactNode; description: string; bullets: string[]; tools: string[] }> = {
              react: {
                title: 'React & Next.js',
                color: '#61DAFB',
                icon: <Atom className="w-12 h-12" style={{ color: '#61DAFB' }} />,
                description: 'Building production-grade, server-rendered web applications with React 18+ and Next.js 14. Leveraging the App Router, RSC, streaming, and edge-first deployment for blazing fast user experiences.',
                bullets: [
                  'Component architecture with reusable, composable hooks',
                  'Server Components & Suspense for streaming SSR',
                  'Framer Motion for physics-based micro-animations',
                  'Performance optimization with lazy loading & code splitting',
                  'Responsive, mobile-first UI with Tailwind CSS',
                ],
                tools: ['React 18', 'Next.js 14', 'Framer Motion', 'Tailwind CSS', 'Vercel', 'SWR'],
              },
              ai: {
                title: 'AI & Systems',
                color: '#10B981',
                icon: <BrainCircuit className="w-12 h-12" style={{ color: '#10B981' }} />,
                description: 'Designing multi-agent orchestration pipelines, integrating local and cloud LLMs, and training custom transformer architectures. Specializing in latent space planning, autoregressive generation, and autonomous workflow optimization.',
                bullets: [
                  'Multi-agent systems with tool-use and reflection loops',
                  'Local LLM deployment via LM Studio, Ollama, and DeepSeek',
                  'Custom transformer training on Apple MPS with PyTorch',
                  'Contrastive loss & attention attribution for model interpretability',
                  'Real-time AI pipelines with WebSocket streaming',
                  'Reinforcement learning for game-agent autonomy',
                ],
                tools: ['PyTorch', 'HuggingFace', 'LangChain', 'OpenAI API', 'LM Studio', 'Apple MPS'],
              },
              typescript: {
                title: 'TypeScript',
                color: '#3178C6',
                icon: <Code className="w-12 h-12" style={{ color: '#3178C6' }} />,
                description: 'Writing type-safe, scalable codebases with strict TypeScript across frontend and backend. Leveraging advanced generics, discriminated unions, and template literal types to eliminate runtime errors at compile time.',
                bullets: [
                  'Strict mode with zero `any` escape hatches',
                  'Advanced generics & conditional types for API contracts',
                  'Type-safe state management with Zustand & Jotai',
                  'End-to-end type inference from database to UI',
                  'Custom ESLint rules for project-specific type safety',
                ],
                tools: ['TypeScript 5', 'Zod', 'tRPC', 'Prisma', 'ESLint', 'Vitest'],
              },
              pytorch: {
                title: 'PyTorch & Deep Learning',
                color: '#EE4C2C',
                icon: <Flame className="w-12 h-12" style={{ color: '#EE4C2C' }} />,
                description: 'Training and fine-tuning neural networks for vision, NLP, and generative tasks. Exploring diffusion model architectures, latent space coherence, and custom loss functions for research-grade model development.',
                bullets: [
                  'Custom model architectures with nn.Module',
                  'Training on Apple Silicon MPS and CUDA backends',
                  'Fine-tuning with LoRA, QLoRA, and PEFT',
                  'Computer vision pipelines with OpenCV integration',
                  'Experiment tracking with Weights & Biases',
                ],
                tools: ['PyTorch', 'HuggingFace', 'OpenCV', 'W&B', 'ONNX', 'CoreML'],
              },
              node: {
                title: 'Node.js & Backend',
                color: '#68A063',
                icon: <Server className="w-12 h-12" style={{ color: '#68A063' }} />,
                description: 'Architecting scalable backend services with Node.js, Express, and real-time communication layers. Building REST and WebSocket APIs that power dashboards, trading systems, and AI agent pipelines.',
                bullets: [
                  'REST & GraphQL API design with Express and Fastify',
                  'Real-time communication with Socket.io and WebSockets',
                  'Database integration with Prisma, MongoDB, and PostgreSQL',
                  'Queue-based architectures with Redis and BullMQ',
                  'Containerized deployment with Docker and CI/CD pipelines',
                ],
                tools: ['Node.js', 'Express', 'Socket.io', 'Prisma', 'Docker', 'Redis'],
              },
              statemachines: {
                title: 'State Machines & Automation',
                color: '#F59E0B',
                icon: <Layers className="w-12 h-12" style={{ color: '#F59E0B' }} />,
                description: 'Building deterministic state machines and behavior trees for game AI, workflow automation, and complex UI orchestration. Used extensively in the Sims 4 AI project for autonomous agent decision-making.',
                bullets: [
                  'XState for complex UI and workflow orchestration',
                  'Behavior trees for game agent decision-making',
                  'Finite state machines for connection and auth flows',
                  'Python automation scripts for game modding pipelines',
                  'Event-driven architectures for real-time state sync',
                ],
                tools: ['XState', 'Python', 'Lua', 'Electron', 'Puppeteer', 'Custom DSLs'],
              },
              telemetry: {
                title: 'Data Telemetry & Observability',
                color: '#D946EF',
                icon: <Activity className="w-12 h-12" style={{ color: '#D946EF' }} />,
                description: 'Designing real-time telemetry systems for monitoring AI agents, trading systems, and live event infrastructure. Building dashboards that surface actionable metrics from high-frequency data streams.',
                bullets: [
                  'Real-time metric dashboards with React and D3.js',
                  'Application performance monitoring and alerting',
                  'Live game-state telemetry for AI agent observation',
                  'High-frequency trading signal visualization',
                  'Event-driven logging with structured JSON pipelines',
                ],
                tools: ['D3.js', 'Grafana', 'Prometheus', 'Socket.io', 'ElasticSearch', 'Custom Dashboards'],
              },
            }
            const skill = data[skillModal]
            if (!skill) return null
            return (
              <motion.div
                key="skill-modal-overlay"
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                style={{ background: 'rgba(0,0,0,0.95)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSkillModal(null)}
              >
                <motion.div
                  className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] p-8 md:p-12"
                  style={{
                    background: 'rgba(18,18,24,0.98)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: `0 0 80px ${skill.color}15, 0 0 200px ${skill.color}08`,
                  }}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSkillModal(null)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}30` }}>
                      {skill.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">{skill.title}</h2>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-6" style={{ background: `linear-gradient(to right, ${skill.color}40, transparent)` }} />

                  {/* Description */}
                  <p className="text-white/80 text-[15px] md:text-[16px] leading-relaxed mb-8">
                    {skill.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-3 mb-8">
                    {skill.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] md:text-[15px] text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: skill.color }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tool pills */}
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full text-[12px] font-medium"
                        style={{ background: `${skill.color}12`, border: `1px solid ${skill.color}25`, color: skill.color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )
          })()}
        </AnimatePresence>

        {/* Projects anchor for navigation */}
        <div id="projects" className="bg-[#0a0a0f] relative z-10" />

        {/* Contact Section */}
        <section id="contact" className="relative z-50 section-padding bg-[#050505] border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "300px" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
                Let's Build the Future Together
              </h2>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    Ready to collaborate on building great web experiences, AI-driven features, or innovative applications?
                    Let&apos;s connect and make something impactful together.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="mailto:tinotenda@safehavelabs.org"
                      className="flex items-center text-slate-300 hover:text-blue-400 transition-colors"
                    >
                      <Mail className="w-5 h-5 mr-3" />
                      tinotenda@safehavelabs.org
                    </a>

                    <a
                      href="tel:231-260-6380"
                      className="flex items-center text-slate-300 hover:text-blue-400 transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-3" />
                      231-260-6380
                    </a>

                    <div className="flex items-center text-slate-300">
                      <MapPin className="w-5 h-5 mr-3" />
                      Abilene, TX
                    </div>
                  </div>

                  <div className="flex space-x-6 mt-8">
                    <a
                      href="https://www.linkedin.com/in/tino-m-630086124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>

                    <a
                      href="https://github.com/Musikavanhu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      <Github className="w-6 h-6" />
                    </a>

                    <a
                      href="https://zenodo.org/records/15486760"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                <div className="glass-card p-8">
                  <h3 className="text-xl font-bold mb-6 text-white">Quick Message</h3>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-400/50 focus:bg-white/10 focus:outline-none text-white backdrop-blur-sm transition-all text-shadow-glass placeholder:text-slate-300"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-400/50 focus:bg-white/10 focus:outline-none text-white backdrop-blur-sm transition-all text-shadow-glass placeholder:text-slate-300"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={4}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-400/50 focus:bg-white/10 focus:outline-none text-white backdrop-blur-sm transition-all resize-none text-shadow-glass placeholder:text-slate-300"
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      className="glass-button glass-button-primary w-full px-6 py-4 rounded-lg mt-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-slate-700 bg-[#0a0a0f] relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-slate-400">
              <p>&copy; 2024 Tino Musikavanhu. Building the future, one component at a time.</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
