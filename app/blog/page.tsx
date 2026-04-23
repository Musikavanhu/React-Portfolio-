'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Github, Linkedin, Mail, Menu, X, ChevronRight, ArrowUpRight } from 'lucide-react'
import postsData from '@/data/posts.json'

type ContentBlock = { type: string; text: string }
type Post = {
  slug: string
  title: string
  subtitle: string
  date: string
  category: string
  readTime: string
  featured: boolean
  image: string
  excerpt: string
  content: ContentBlock[]
}

const posts: Post[] = postsData as Post[]

/* ─── helpers ─── */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/* ─── Blog listing page ─── */
export default function BlogPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))]
  const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter)
  const featured = posts.find(p => p.featured)

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1a1a1a] selection:bg-[#1a1a1a]/10">

      {/* ── Google Fonts (serif editorial) ── */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400;1,8..60,500&display=swap" rel="stylesheet" />

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-[#e5e5e0] bg-[#F5F1E8]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="text-3xl font-black tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              TM
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#888] mt-1 hidden sm:block">
              Journal
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors tracking-wide">
              Portfolio
            </Link>
            <a href="mailto:tinotenda@safehavelabs.org" className="text-[#666] hover:text-[#1a1a1a] transition-colors">
              <Mail className="w-[18px] h-[18px]" />
            </a>
            <a href="https://github.com/Musikavanhu" target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#1a1a1a] transition-colors">
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.linkedin.com/in/tino-m-630086124" target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#1a1a1a] transition-colors">
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#1a1a1a]">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[#e5e5e0] overflow-hidden"
            >
              <div className="px-6 py-4 space-y-3">
                <Link href="/" className="block text-sm text-[#666] hover:text-[#1a1a1a]" onClick={() => setMenuOpen(false)}>
                  ← Portfolio
                </Link>
                <div className="flex gap-4 pt-2">
                  <a href="mailto:tinotenda@safehavelabs.org" className="text-[#666]"><Mail className="w-5 h-5" /></a>
                  <a href="https://github.com/Musikavanhu" target="_blank" rel="noopener noreferrer" className="text-[#666]"><Github className="w-5 h-5" /></a>
                  <a href="https://www.linkedin.com/in/tino-m-630086124" target="_blank" rel="noopener noreferrer" className="text-[#666]"><Linkedin className="w-5 h-5" /></a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero / Masthead ── */}
      <section className="max-w-5xl mx-auto px-6 pt-10 md:pt-16 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          {/* Portrait taking ~top half of page */}
          <div className="w-full max-w-4xl h-[45vh] md:h-[60vh] relative mb-8 md:mb-10 flex justify-center">
            <img
              src="/selfie.png"
              alt="Tino Musikavanhu"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text */}
          <div>
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Journal
            </h1>
            <p
              className="text-lg md:text-xl text-[#666] max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Source Serif 4', serif" }}
            >
              Notes on engineering, AI research, and building things that matter.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Category filters ── */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 ${
                filter === cat
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-transparent text-[#888] hover:text-[#1a1a1a] border border-[#ddd] hover:border-[#aaa]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured post (if showing all) ── */}
      {filter === 'All' && featured && (
        <section className="max-w-5xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href={`/blog/${featured.slug}`}>
              <article className="group relative rounded-2xl overflow-hidden border border-[#e5e5e0] hover:border-[#ccc] transition-all duration-300 hover:shadow-lg">
                {featured.image && (
                  <div className="relative h-64 md:h-[400px] overflow-hidden bg-[#f0f0ed]">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1E8] via-transparent to-transparent" />
                  </div>
                )}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-[#1a1a1a] text-white">
                      Featured
                    </span>
                    <span className="text-[13px] text-[#888]">{featured.category}</span>
                    <span className="text-[#ddd]">·</span>
                    <span className="text-[13px] text-[#888]">{featured.readTime}</span>
                  </div>
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-3 group-hover:text-[#444] transition-colors leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="text-[17px] text-[#666] italic mb-4"
                    style={{ fontFamily: "'Source Serif 4', serif" }}
                  >
                    {featured.subtitle}
                  </p>
                  <p
                    className="text-[15px] md:text-[16px] text-[#555] leading-relaxed max-w-2xl"
                    style={{ fontFamily: "'Source Serif 4', serif" }}
                  >
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#1a1a1a] group-hover:gap-3 transition-all">
                    Read article <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        </section>
      )}

      {/* ── Post grid ── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered
            .filter(p => !(filter === 'All' && p.featured))
            .map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="group h-full flex flex-col border border-[#e5e5e0] rounded-2xl overflow-hidden hover:border-[#ccc] hover:shadow-md transition-all duration-300">
                    <div className="p-7 md:p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[12px] font-semibold uppercase tracking-widest text-[#999]">
                          {post.category}
                        </span>
                        <span className="text-[#ddd]">·</span>
                        <span className="text-[12px] text-[#aaa]">{formatDate(post.date)}</span>
                      </div>
                      <h3
                        className="text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-[#444] transition-colors leading-snug"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-[14px] text-[#888] italic mb-4"
                        style={{ fontFamily: "'Source Serif 4', serif" }}
                      >
                        {post.subtitle}
                      </p>
                      <p
                        className="text-[14px] md:text-[15px] text-[#666] leading-relaxed flex-1"
                        style={{ fontFamily: "'Source Serif 4', serif" }}
                      >
                        {post.excerpt.slice(0, 160)}…
                      </p>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-[13px] text-[#aaa]">{post.readTime}</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-[#1a1a1a] group-hover:gap-2 transition-all">
                          Read <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e5e5e0] py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#aaa]">
            © {new Date().getFullYear()} Tino Musikavanhu
          </p>
          <Link href="/" className="text-[13px] text-[#888] hover:text-[#1a1a1a] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to portfolio
          </Link>
        </div>
      </footer>
    </div>
  )
}
