'use client'

import type React from 'react'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'ko'

type LanguageContextType = {
	language: Language
	setLanguage: (lang: Language) => void
	t: (key: string) => string
}

const translations = {
	en: {
		'nav.about': 'About Me',
		'nav.blogs': 'Blogs',
		'nav.projects': 'Projects',
		'nav.contact': 'Contact',
		'hero.greeting': "Hello, I'm",
		'hero.description':
			'Welcome to my personal portfolio & blog website where I share my thoughts, projects, and experiences.',
		'about.descr':
			'Learn more about my story, skills, and the driving force behind my passion for web development.',
		'about.paragraph1':
			"I'm a passionate full-stack developer with over 2 years of experience building modern web applications. I specialize in React, Next.js, Node.js and TypeScript, creating scalable and performant solutions.",
		'about.paragraph2':
			"My journey in web development started with a curiosity about how websites work, and it has grown into a career I love. I'm constantly learning and exploring new technologies to stay at the forefront of web development.",
		'about.paragraph3':
			"When I'm not coding, you can find me writing technical articles, contributing to open-source projects, or mentoring aspiring developers.",
		'skills.title': 'Technical Skills',
		'skills.core': 'Core Values',
		'projects.descr':
			"A collection of projects I've built, showcasing my skills and passion for creating amazing web experiences.",
		'blogs.descr':
			'Explore articles about web development, programming, and technology.',
		'contact.descr':
			'Have a question or want to work together? Feel free to reach out!',

		'blog.readMore': 'Read More',
		'blog.content': 'Blog Content',
		'blog.publish': 'Publish',
		'blog.cancel': 'Cancel',
		'blog.noPosts': 'No blog posts yet',
	},
	ko: {
		'nav.about': '소개',
		'nav.blogs': '블로그',
		'nav.projects': '프로젝트',
		'nav.contact': '연락처',
		'hero.greeting': '안녕하세요,',
		'hero.description':
			'제 생각, 프로젝트, 경험을 공유하는 개인 포트폴리오 & 블로그 웹사이트에 오신 것을 환영합니다.',
		'about.descr':
			'저의 이야기, 보유 기술, 그리고 웹 개발에 대한 열정을 이끄는 원동력을 더 알아보세요.',
		'about.paragraph1':
			'저는 2년 이상의 경험을 가진 열정적인 풀스택 개발자입니다. React, Next.js, Node.js, TypeScript를 중심으로 확장 가능하고 성능이 뛰어난 솔루션을 개발합니다.',
		'about.paragraph2':
			'웹 개발을 시작하게 된 계기는 “웹사이트는 어떻게 동작할까?”라는 호기심이었습니다. 그 호기심은 지금 제가 사랑하는 커리어로 성장했습니다. 저는 최신 웹 기술 흐름을 따라가기 위해 꾸준히 학습하고 새로운 기술을 탐구하고 있습니다.',
		'about.paragraph3':
			'코딩을 하지 않을 때는 기술 아티클을 작성하거나, 오픈소스 프로젝트에 기여하거나, 개발자를 꿈꾸는 사람들을 멘토링하며 시간을 보냅니다.',
		'skills.title': '기술 스택',
		'skills.core': '핵심 가치',
		'projects.descr':
			'제가 만든 프로젝트들을 모아둔 컬렉션으로, 멋진 웹 경험을 만들기 위한 저의 역량과 열정을 보여드립니다.',
		'blogs.descr': ' 웹 개발, 프로그래밍, 기술에 관한 글들을 살펴보세요.',
		'contact.descr':
			'질문이 있으시거나 함께 협업하고 싶으신가요? 편하게 연락 주세요!',

		'blog.readMore': '더 보기',
		'blog.publishedOn': '게시일',
		'blog.new': '새 블로그 포스트',
		'blog.title': '블로그 제목',
		'blog.content': '블로그 내용',
		'blog.publish': '게시',
		'blog.cancel': '취소',
		'blog.noPosts': '아직 블로그 포스트가 없습니다',
	},
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguageState] = useState<Language>('en')
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		const savedLanguage = localStorage.getItem('language') as Language
		if (savedLanguage) {
			setLanguageState(savedLanguage)
		}
	}, [])

	const setLanguage = (lang: Language) => {
		setLanguageState(lang)
		localStorage.setItem('language', lang)
	}

	const t = (key: string): string => {
		return translations[language][key as keyof typeof translations.en] || key
	}

	if (!mounted) {
		return null
	}

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	)
}

export function useLanguage() {
	const context = useContext(LanguageContext)
	if (!context) {
		throw new Error('useLanguage must be used within LanguageProvider')
	}
	return context
}
