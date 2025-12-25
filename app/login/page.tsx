"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement Supabase email/password login
    console.log("[v0] Email login:", email)
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Supabase Google OAuth
    console.log("[v0] Google login clicked")
  }

  const handleGithubLogin = () => {
    // TODO: Implement Supabase GitHub OAuth
    console.log("[v0] GitHub login clicked")
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">{t("auth.login")}</CardTitle>
          <CardDescription className="text-center">Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full bg-transparent" onClick={handleGoogleLogin}>
              <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} className="mr-2" />
              {t("auth.signInWith")} Google
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={handleGithubLogin}>
              <Github className="mr-2 h-5 w-5" />
              {t("auth.signInWith")} GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">{t("auth.or")}</span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t("auth.login")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              {t("auth.signup")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
