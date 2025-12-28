'use client'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

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

export default function BlogDetailPage() {
	const params = useParams()
	const { t } = useLanguage()
	const postId = params
	console.log('params:', postId)

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
						src={post.image || '/placeholder.svg'}
						alt={post.b}
						fill
						className='object-cover'
					/>
				</div>

				<div className='mb-6'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4 text-balance'>
						{post.title}
					</h1>

					<div className='flex items-center gap-6 text-muted-foreground'>
						<div className='flex items-center gap-2'>
							<User className='h-4 w-4' />
							<span>{post.author}</span>
						</div>
						<div className='flex items-center gap-2'>
							<Calendar className='h-4 w-4' />
							<span>
								{t('blog.publishedOn')} {post.date}
							</span>
						</div>
					</div>
				</div>

				<div className='prose prose-lg dark:prose-invert max-w-none'>
					<div className='whitespace-pre-wrap leading-relaxed'>
						{post.content}
					</div>
				</div>

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
