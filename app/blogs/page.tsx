"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type BlogPost = {
  id: number
  title: string
  description: string
  date: string
  image: string
  author: string
}

export default function BlogsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - will be replaced with Supabase data
  const allPosts: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with Next.js 16",
      description: "Learn the new features and improvements in Next.js 16, including enhanced caching and performance",
      date: "2024-03-15",
      image: "/nextjs-coding.png",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Building Modern Web Apps",
      description: "Best practices for creating scalable and maintainable web applications with React and TypeScript",
      date: "2024-03-10",
      image: "/web-development-concept.png",
      author: "John Doe",
    },
    {
      id: 3,
      title: "TypeScript Tips & Tricks",
      description: "Advanced TypeScript patterns and techniques to write better, more type-safe code",
      date: "2024-03-05",
      image: "/typescript-code.png",
      author: "John Doe",
    },
    {
      id: 4,
      title: "React Server Components Deep Dive",
      description: "Understanding React Server Components and how they change the way we build applications",
      date: "2024-02-28",
      image: "/react-components-diagram.jpg",
      author: "John Doe",
    },
    {
      id: 5,
      title: "Database Design Best Practices",
      description: "Essential principles for designing efficient and scalable database schemas",
      date: "2024-02-20",
      image: "/database-schema.jpg",
      author: "John Doe",
    },
    {
      id: 6,
      title: "CSS Modern Layouts with Grid",
      description: "Mastering CSS Grid to create responsive and flexible web layouts",
      date: "2024-02-15",
      image: "/css-grid-layout.jpg",
      author: "John Doe",
    },
  ]

  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="min-h-screen">
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">{t("nav.blogs")}</h1>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore articles about web development, programming, and technology
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blog posts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No blog posts found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader className="flex-1">
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>
                    {post.author} • {t("blog.publishedOn")} {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{post.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/blogs/${post.id}`} className="w-full">
                    <Button variant="ghost" size="sm" className="w-full">
                      {t("blog.readMore")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
