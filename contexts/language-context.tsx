"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ko"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "nav.about": "About Me",
    "nav.blogs": "Blogs",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.greeting": "Hello, I'm",
    "hero.description": "Welcome to my personal blog where I share my thoughts, projects, and experiences.",
    "auth.login": "Log In",
    "auth.signup": "Sign Up",
    "auth.signInWith": "Sign in with",
    "auth.or": "or",
    "blog.create": "Create Blog",
    "blog.readMore": "Read More",
    "blog.publishedOn": "Published on",
    "blog.new": "New Blog Post",
    "blog.title": "Blog Title",
    "blog.content": "Blog Content",
    "blog.publish": "Publish",
    "blog.cancel": "Cancel",
    "blog.noPosts": "No blog posts yet",
  },
  ko: {
    "nav.about": "소개",
    "nav.blogs": "블로그",
    "nav.projects": "프로젝트",
    "nav.contact": "연락처",
    "hero.greeting": "안녕하세요,",
    "hero.description": "제 생각, 프로젝트, 경험을 공유하는 개인 블로그에 오신 것을 환영합니다.",
    "auth.login": "로그인",
    "auth.signup": "회원가입",
    "auth.signInWith": "로그인 -",
    "auth.or": "또는",
    "blog.create": "블로그 작성",
    "blog.readMore": "더 보기",
    "blog.publishedOn": "게시일",
    "blog.new": "새 블로그 포스트",
    "blog.title": "블로그 제목",
    "blog.content": "블로그 내용",
    "blog.publish": "게시",
    "blog.cancel": "취소",
    "blog.noPosts": "아직 블로그 포스트가 없습니다",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  if (!mounted) {
    return null
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
