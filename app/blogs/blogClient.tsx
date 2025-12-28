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
import { Input } from '@/components/ui/input'
import { useMotionWrapper } from '@/hooks/useMotionCard'
import { ArrowRight, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface BlogPost {
	title: string
	description: string
	slug: string
	author: {
		name: string
	}
	image: {
		url: string
	}
}

interface Props {
	allBlogs: BlogPost[]
}

function MotionCard({ post }: { post: BlogPost }) {
	const { ref, onMouseMove, onMouseLeave } = useMotionWrapper<HTMLDivElement>({
		maxTilt: 8,
	})

	return (
		<div
			ref={ref}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			style={{ transformStyle: 'preserve-3d' }}
		>
			<Card
				id='card'
				className='overflow-hidden hover:shadow-lg transition-shadow h-full'
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
					<CardDescription>Published by {post.author.name}</CardDescription>
				</CardHeader>
				<CardContent>
					<p className='text-muted-foreground line-clamp-3'>
						{post.description}
					</p>
				</CardContent>
				<CardFooter>
					<Link href={`/blogs/${post.slug}`}>
						<Button variant='ghost' size='sm'>
							Read More <ArrowRight className='ml-2 h-4 w-4' />
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	)
}

export default function BlogClient({ allBlogs }: Props) {
	const [searchQuery, setSearchQuery] = useState('')

	const filteredPosts = allBlogs.filter(
		post =>
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.description.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<main className='min-h-screen'>
			<section className='bg-muted/30 py-12'>
				<div className='container mx-auto px-4'>
					<h1 className='text-4xl md:text-5xl font-bold text-center mb-4'>
						Blog
					</h1>
					<p className='text-center text-muted-foreground mb-8 max-w-2xl mx-auto'>
						Explore articles about web development, programming, and technology
					</p>

					<div className='max-w-xl mx-auto relative'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search blog posts...'
							className='pl-10'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>
			</section>

			<section className='container mx-auto px-4 py-12'>
				{filteredPosts.length === 0 ? (
					<div className='text-center py-16'>
						<p className='text-muted-foreground'>
							No blog posts found matching your search.
						</p>
					</div>
				) : (
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredPosts.map((post: BlogPost) => (
							<MotionCard key={post.slug} post={post} />
						))}
					</div>
				)}
			</section>
		</main>
	)
}
