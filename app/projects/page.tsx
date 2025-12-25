"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export default function ProjectsPage() {
  const { t } = useLanguage()

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard",
      image: "/ecommerce-platform.jpg",
      tags: ["Next.js", "TypeScript", "Stripe", "Supabase"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features",
      image: "/task-management.jpg",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Beautiful weather dashboard with forecasts, maps, and location-based weather alerts",
      image: "/weather-dashboard.jpg",
      tags: ["Next.js", "OpenWeather API", "Tailwind"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 4,
      title: "Portfolio Generator",
      description: "A tool to help developers create stunning portfolios without writing code",
      image: "/portfolio-generator.jpg",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 5,
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered suggestions and smart replies",
      image: "/ai-chat-app.jpg",
      tags: ["Next.js", "OpenAI", "WebSocket", "Redis"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Track your workouts, nutrition, and progress with detailed analytics and insights",
      image: "/fitness-tracker.jpg",
      tags: ["React Native", "Node.js", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">{t("nav.projects")}</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            A collection of projects I've built, showcasing my skills and passion for creating amazing web experiences
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="relative h-48 w-full">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
              <CardHeader className="flex-1">
                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {project.liveUrl && (
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
