'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type BlogPost = {
	title: string
	slug: string
	description: string
	image?: { url: string } | null
	author?: { name: string } | null
	publishedAt?: string | null
	content?: { html: string } | null
}

async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
	const res = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
        query BlogBySlug($slug: String!) {
          blog(where: { slug: $slug }) {
            title
            slug
            description
            image { url }
            author { name }
            publishedAt
            content { html }
          }
        }
      `,
			variables: { slug },
		}),
	})

	const json = await res.json()
	return json.data?.blog ?? null
}

export default function BlogDetailPage() {
	const params = useParams()
	const slug = params?.slug as string

	const [post, setPost] = useState<BlogPost | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!slug) return

		let alive = true
		setLoading(true)
		setError(null)

		fetchBlogBySlug(slug)
			.then(data => {
				if (!alive) return
				setPost(data)
			})
			.catch(e => {
				if (!alive) return
				setError(e?.message ?? 'Error')
			})
			.finally(() => {
				if (!alive) return
				setLoading(false)
			})

		return () => {
			alive = false
		}
	}, [slug])

	if (loading) {
		return (
			<main className='min-h-screen container mx-auto px-4 py-12'>
				<p>Loading...</p>
			</main>
		)
	}

	if (error) {
		return (
			<main className='min-h-screen container mx-auto px-4 py-12'>
				<p>Error: {error}</p>
				<Link href='/blogs'>
					<Button variant='outline' className='mt-4'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back to Blogs
					</Button>
				</Link>
			</main>
		)
	}

	if (!post) {
		return (
			<main className='min-h-screen container mx-auto px-4 py-12'>
				<p>Post topilmadi.</p>
				<Link href='/blogs'>
					<Button variant='outline' className='mt-4'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back to Blogs
					</Button>
				</Link>
			</main>
		)
	}

	return (
		<main className='min-h-screen'>
			<article className='container mx-auto px-4 py-8 max-w-4xl'>
				<Link href='/blogs'>
					<Button variant='ghost' className='mb-6'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back to Blogs
					</Button>
				</Link>

				<div className='relative w-full h-[400px] rounded-lg overflow-hidden mb-8'>
					<Image
						src={post.image?.url || '/placeholder.svg'}
						alt={post.title}
						fill
						className='object-cover'
						priority
					/>
				</div>

				<div className='mb-6'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4 text-balance'>
						{post.title}
					</h1>

					<div className='flex items-center gap-6 text-muted-foreground'>
						<div className='flex items-center gap-2'>
							<User className='h-4 w-4' />
							<span>{post.author?.name ?? 'Unknown'}</span>
						</div>

						{post.publishedAt && (
							<div className='flex items-center gap-2'>
								<Calendar className='h-4 w-4' />
								<span>{new Date(post.publishedAt).toLocaleDateString()}</span>
							</div>
						)}
					</div>
				</div>

				<div
					className='prose prose-lg dark:prose-invert max-w-none'
					dangerouslySetInnerHTML={{ __html: post.content?.html ?? '' }}
				/>

				<div className='mt-12 pt-8 border-t'>
					<Link href='/blogs'>
						<Button variant='outline'>
							<ArrowLeft className='mr-2 h-4 w-4' />
							Back to All Posts
						</Button>
					</Link>
				</div>
			</article>
		</main>
	)
}
