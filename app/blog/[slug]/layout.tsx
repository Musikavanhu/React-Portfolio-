import type { Metadata } from 'next'
import postsData from '@/data/posts.json'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = postsData.find((p: any) => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // Set the base URL to your Netlify deployment URL so social cards can resolve absolute image links
  const siteUrl = 'https://tinomusikavanhu.netlify.app' 
  const imageUrl = post.image ? `${siteUrl}${post.image}` : `${siteUrl}/selfie.png`

  return {
    title: `${post.title} | Tino Musikavanhu`,
    description: post.excerpt || post.subtitle,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.subtitle,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: 'Tino Musikavanhu',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.subtitle,
      images: [imageUrl],
    },
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
