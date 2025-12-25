"use client"

import { useParams } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type BlogPost = {
  id: number
  title: string
  content: string
  date: string
  image: string
  author: string
}

export default function BlogDetailPage() {
  const params = useParams()
  const { t } = useLanguage()
  const postId = Number(params.id)

  // Mock data - will be replaced with Supabase query
  const post: BlogPost = {
    id: postId,
    title: "Getting Started with Next.js 16",
    content: `
# Introduction

Next.js 16 brings exciting new features and improvements that make building React applications even better. In this comprehensive guide, we'll explore everything you need to know to get started.

## What's New in Next.js 16

Next.js 16 introduces several groundbreaking features:

1. **Improved Caching**: New caching APIs that give you more control
2. **Better Performance**: Enhanced optimization and faster builds
3. **Developer Experience**: Improved tooling and debugging capabilities

## Getting Started

To start using Next.js 16, you can create a new project using:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will set up a new Next.js project with all the latest features enabled.

## Key Features to Explore

### Server Components

Server Components are now more powerful and flexible. They allow you to render components on the server, reducing the JavaScript sent to the client.

### App Router

The App Router has been refined with better type safety and improved performance characteristics.

### Turbopack

Turbopack is now stable and provides incredibly fast development builds.

## Conclusion

Next.js 16 represents a significant step forward in web development. Whether you're building a small personal project or a large-scale application, these new features will help you create better experiences.

Start exploring Next.js 16 today and see how it can improve your development workflow!
    `.trim(),
    date: "2024-03-15",
    image: "/nextjs-coding.png",
    author: "John Doe",
  }

  return (
    <main className="min-h-screen">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blogs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </Link>

        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{post.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {t("blog.publishedOn")} {post.date}
              </span>
            </div>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link href="/blogs">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Posts
            </Button>
          </Link>
        </div>
      </article>
    </main>
  )
}
