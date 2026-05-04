'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, Linkedin, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import EditorialChart from '../../components/EditorialChart'
import GlossaryTooltip from '../../components/GlossaryTooltip'
import postsData from '@/data/posts.json'

type ContentBlock = { type: string; text: string; chartData?: any }
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

const GLOSSARY: Record<string, string> = {
  "AWGN channel": "Additive White Gaussian Noise channel: A standard mathematical model used to mimic the effect of random environmental background noise on transmitted data.",
  "Tanner graph": "A bipartite graph used to visually represent the constraints (parity checks) and variables (bits) of an error-correcting code.",
  "Mixture-of-Experts": "A machine learning architecture where multiple specialized sub-networks (experts) are conditionally activated based on the input, drastically reducing computational cost.",
  "model distillation": "The process of training a smaller, more efficient AI model to replicate the behavior and outputs of a much larger, more complex proprietary model.",
  "stablecoins": "Digital currencies designed to maintain a stable value by being pegged to a reserve asset, most commonly the U.S. dollar.",
  "Belief Propagation": "An iterative message-passing algorithm used to calculate marginal distributions or probabilities on graphical models like Tanner graphs.",
  "LDPC": "Low-Density Parity-Check code: A highly efficient linear error-correcting code capable of approaching the theoretical limit of channel capacity."
}

function parseTextWithGlossary(text: string) {
  let parts: (string | JSX.Element)[] = [text];
  
  Object.keys(GLOSSARY).forEach(term => {
    const newParts: (string | JSX.Element)[] = [];
    // Only match exact terms, case-insensitive, with word boundaries
    const regex = new RegExp(`\\b(${term})\\b`, 'gi');
    
    parts.forEach(part => {
      if (typeof part === 'string') {
        const split = part.split(regex);
        split.forEach((s) => {
          if (s.toLowerCase() === term.toLowerCase()) {
            newParts.push(<GlossaryTooltip key={Math.random()} term={s} definition={GLOSSARY[term]} />);
          } else if (s) {
            newParts.push(s);
          }
        });
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
  });
  
  return parts;
}

const posts: Post[] = postsData as Post[]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPost() {
  const params = useParams()
  const slug = params?.slug as string
  const postIndex = posts.findIndex(p => p.slug === slug)
  const post = posts[postIndex]

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Post not found
          </h1>
          <Link href="/blog" className="text-[#888] hover:text-[#1a1a1a] transition-colors">
            ← Back to journal
          </Link>
        </div>
      </div>
    )
  }

  const prev = postIndex > 0 ? posts[postIndex - 1] : null
  const next = postIndex < posts.length - 1 ? posts[postIndex + 1] : null

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1a1a1a] selection:bg-[#1a1a1a]/10">

      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400;1,8..60,500&display=swap" rel="stylesheet" />

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-[#e5e5e0] bg-[#F5F1E8]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-[#666] hover:text-[#1a1a1a] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Journal</span>
          </Link>
          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            TM
          </Link>
          <div className="flex items-center gap-4">
            <a href="mailto:tinotenda@safehavelabs.org" className="text-[#888] hover:text-[#1a1a1a] transition-colors">
              <Mail className="w-[17px] h-[17px]" />
            </a>
            <a href="https://github.com/Musikavanhu" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-[#1a1a1a] transition-colors">
              <Github className="w-[17px] h-[17px]" />
            </a>
          </div>
        </div>
      </header>

      {/* ── Article ── */}
      <article className="max-w-3xl mx-auto px-6 pt-12 md:pt-20 pb-16">

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6 text-[13px]">
            <span className="font-semibold uppercase tracking-widest text-[#999]">{post.category}</span>
            <span className="text-[#ddd]">·</span>
            <span className="text-[#aaa]">{formatDate(post.date)}</span>
            <span className="text-[#ddd]">·</span>
            <span className="text-[#aaa]">{post.readTime}</span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {post.title}
          </h1>

          <p
            className="text-xl md:text-2xl text-[#888] italic"
            style={{ fontFamily: "'Source Serif 4', serif" }}
          >
            {post.subtitle}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px bg-[#e0e0dc] mb-10 origin-left"
        />

        {/* Cover image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12 rounded-xl overflow-hidden border border-[#e5e5e0]"
          >
            <img src={post.image} alt={post.title} className="w-full" />
          </motion.div>
        )}

        {/* Content blocks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
          style={{ fontFamily: "'Source Serif 4', serif" }}
        >
          {post.content.map((block, i) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={i}
                  className="text-2xl md:text-3xl font-bold tracking-tight pt-6 pb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {block.text}
                </h2>
              )
            }
            if (block.type === 'chart') {
              return (
                <div key={i} className="my-8">
                  <EditorialChart {...block.chartData} />
                </div>
              )
            }
            return (
              <p key={i} className="text-[17px] md:text-[18px] text-[#333] leading-[1.85]">
                {parseTextWithGlossary(block.text)}
              </p>
            )
          })}
        </motion.div>

        {/* Author sign-off */}
        <div className="mt-16 pt-8 border-t border-[#e5e5e0]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#e5e5e0] flex-shrink-0">
              <img src="/selfie.png" alt="Tino Musikavanhu" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-semibold text-[15px]">Tino Musikavanhu</p>
              <p className="text-[13px] text-[#888]">Frontend Engineer · AI Integration · Systems Design</p>
            </div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <nav className="mt-12 pt-8 border-t border-[#e5e5e0] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex items-start gap-3 p-5 rounded-xl border border-[#e5e5e0] hover:border-[#ccc] hover:shadow-sm transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-[#aaa] mt-0.5 group-hover:text-[#1a1a1a] transition-colors" />
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#aaa]">Previous</span>
                <p className="text-[15px] font-semibold mt-1 leading-snug group-hover:text-[#444] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex items-start gap-3 p-5 rounded-xl border border-[#e5e5e0] hover:border-[#ccc] hover:shadow-sm transition-all text-right sm:justify-end"
            >
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#aaa]">Next</span>
                <p className="text-[15px] font-semibold mt-1 leading-snug group-hover:text-[#444] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {next.title}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#aaa] mt-0.5 group-hover:text-[#1a1a1a] transition-colors" />
            </Link>
          ) : <div />}
        </nav>
      </article>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e5e5e0] py-10">
        <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#aaa]">
            © {new Date().getFullYear()} Tino Musikavanhu
          </p>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-[13px] text-[#888] hover:text-[#1a1a1a] transition-colors">
              All posts
            </Link>
            <Link href="/" className="text-[13px] text-[#888] hover:text-[#1a1a1a] transition-colors">
              Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
