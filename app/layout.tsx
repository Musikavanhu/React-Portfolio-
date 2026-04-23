import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tino Musikavanhu - Quantum Architect & Systems Engineer',
  description: 'Pioneering systems engineer, quantum architect, and ethical technologist. Creator of Void One quantum computer. Expert in AI, quantum computing, and post-scarcity solutions.',
  keywords: 'quantum computing, AI, systems engineering, biotechnology, climate solutions, Void One, QZFT',
  authors: [{ name: 'Tino Musikavanhu' }],
  openGraph: {
    title: 'Tino Musikavanhu - Quantum Architect & Systems Engineer',
    description: 'Pioneering systems engineer and creator of Void One quantum computer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen bg-black">
          {children}
        </div>
      </body>
    </html>
  )
}
