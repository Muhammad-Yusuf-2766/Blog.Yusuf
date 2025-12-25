"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

type BlogPost = {
  id: number
  title: string
  content: string
  date: string
  published: boolean
}

export default function DashboardPage() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Getting Started with Next.js 16",
      content: "Learn the new features...",
      date: "2024-03-15",
      published: true,
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({})

  const handleCreatePost = () => {
    setCurrentPost({})
    setIsDialogOpen(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post)
    setIsDialogOpen(true)
  }

  const handleDeletePost = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((p) => p.id !== id))
      // TODO: Delete from Supabase
      console.log("[v0] Deleting post:", id)
    }
  }

  const handleSavePost = () => {
    if (currentPost.id) {
      // Update existing post
      setPosts(posts.map((p) => (p.id === currentPost.id ? { ...p, ...currentPost } : p)))
      // TODO: Update in Supabase
      console.log("[v0] Updating post:", currentPost)
    } else {
      // Create new post
      const newPost = {
        ...currentPost,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        published: false,
      } as BlogPost
      setPosts([newPost, ...posts])
      // TODO: Insert into Supabase
      console.log("[v0] Creating post:", newPost)
    }
    setIsDialogOpen(false)
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Blog Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your blog posts</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreatePost}>
                <Plus className="mr-2 h-4 w-4" />
                {t("blog.create")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{currentPost.id ? "Edit Blog Post" : t("blog.new")}</DialogTitle>
                <DialogDescription>Fill in the details for your blog post</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t("blog.title")}</Label>
                  <Input
                    id="title"
                    placeholder="Enter blog title"
                    value={currentPost.title || ""}
                    onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">{t("blog.content")}</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your blog content here..."
                    className="min-h-[300px]"
                    value={currentPost.content || ""}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t("blog.cancel")}
                </Button>
                <Button onClick={handleSavePost}>{t("blog.publish")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {posts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground mb-4">{t("blog.noPosts")}</p>
              <Button onClick={handleCreatePost}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription>
                        {post.published ? "Published" : "Draft"} • {post.date}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{post.content}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link href={`/blogs/${post.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
