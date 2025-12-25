'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { getBlogs } from '@/service'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomePage() {
	const { t } = useLanguage()
	const [blogs, setBlogs] = useState<any>(null)

	useEffect(() => {
		;(async () => {
			const data = await getBlogs()
			setBlogs(data)
			console.log('Fetched blogs:', data)
		})()
	}, [])

	// Mock blog posts - will be replaced with real data from Supabase
	const recentPosts = [
		{
			id: 1,
			title: 'Getting Started with Next.js 16',
			description: 'Learn the new features and improvements in Next.js 16',
			date: '2024-03-15',
			image: '/nextjs-coding.png',
		},
		{
			id: 2,
			title: 'Building Modern Web Apps',
			description: 'Best practices for creating scalable applications',
			date: '2024-03-10',
			image: '/web-development-concept.png',
		},
		{
			id: 3,
			title: 'TypeScript Tips & Tricks',
			description: 'Advanced TypeScript patterns for better code',
			date: '2024-03-05',
			image: '/typescript-code.png',
		},
	]

	return (
		<main className='min-h-screen'>
			{/* Hero Section */}
			<section className='container mx-auto px-4 py-20 md:py-32'>
				<div className='flex flex-col md:flex-row items-center gap-12'>
					<div className='flex-1 space-y-6'>
						<h1 className='text-4xl md:text-6xl font-bold text-balance'>
							{t('hero.greeting')}{' '}
							<span className='text-primary'>Mukhammad Yusuf</span>
						</h1>
						<p className='text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl'>
							{t('hero.description')}
						</p>
						<div className='flex gap-4'>
							<Link href='/blogs'>
								<Button size='lg'>
									{t('nav.blogs')} <ArrowRight className='ml-2 h-4 w-4' />
								</Button>
							</Link>
							<Link href='/contact'>
								<Button size='lg' variant='outline'>
									{t('nav.contact')}
								</Button>
							</Link>
						</div>
					</div>

					<div className='flex-1 flex justify-center'>
						<div className='relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-2xl'>
							<Image
								src='/my doc picture.jpg'
								alt='Profile'
								fill
								className='object-cover'
								priority
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Recent Blog Posts Section */}
			<section className='bg-muted/50 py-16'>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between mb-8'>
						<h2 className='text-3xl font-bold'>Recent {t('nav.blogs')}</h2>
						<Link href='/blogs'>
							<Button variant='ghost'>
								View All <ArrowRight className='ml-2 h-4 w-4' />
							</Button>
						</Link>
					</div>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{blogs?.blogs.map(post => (
							<Card
								key={post.title}
								className='overflow-hidden hover:shadow-lg transition-shadow'
							>
								<div className='relative h-48 w-full'>
									<Image
										src={post.image.url || '/placeholder.svg'}
										alt={post.title}
										fill
										className='object-cover'
									/>
								</div>
								<CardHeader>
									<CardTitle className='line-clamp-2'>{post.title}</CardTitle>
									<CardDescription>
										Published by {post.author.name}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className='text-muted-foreground line-clamp-3'>
										{post.description}
									</p>
								</CardContent>
								<CardFooter>
									<Link href={`/blogs/${post.slug}`}>
										<Button variant='ghost' size='sm'>
											{t('blog.readMore')}{' '}
											<ArrowRight className='ml-2 h-4 w-4' />
										</Button>
									</Link>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</section>
		</main>
	)
}
