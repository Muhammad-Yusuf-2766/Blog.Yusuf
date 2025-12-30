// app/HomeClient.tsx
'use client'

import { Reveal, RevealItem } from '@/components/shared/motionRevel'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/all'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

interface BlogPost {
	title: string
	description: string
	slug: string
	image: {
		url: string
	}
	author: {
		name: string
	}
}

export default function HomeClient({ blogs }: { blogs: BlogPost[] }) {
	const { t } = useLanguage()

	gsap.registerPlugin(MotionPathPlugin)

	useEffect(() => {
		const radiusX = 5 // x bo'yicha radius (oval bo'lsa farq qiladi)
		const radiusY = 5 // y bo'yicha radius
		const duration = 3

		gsap.to('#image', {
			duration,
			repeat: -1,
			ease: 'none',
			motionpath: false,
			onUpdate: function () {
				const p = this.progress() * Math.PI * 2 // 0..2PI
				gsap.set('#image', {
					x: Math.cos(p) * radiusX,
					y: Math.sin(p) * radiusY,
				})
			},
		})

		gsap.to('#text', {
			duration,
			repeat: -1,
			ease: 'none',
			onUpdate: function () {
				const p = this.progress() * Math.PI * 2 + Math.PI // <-- 180° offset
				gsap.set('#text', {
					x: Math.cos(p) * radiusX,
					y: Math.sin(p) * radiusY,
				})
			},
		})
	}, [])

	return (
		<main className='min-h-screen'>
			{/* Hero Section */}
			<Reveal>
				<section className='container mx-auto px-4 py-20 md:py-32'>
					<RevealItem>
						<div className='flex flex-col md:flex-row items-center gap-12'>
							<div id='text' className='flex-1 space-y-6'>
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
									<Link href='/#contact'>
										<Button size='lg' variant='outline'>
											{t('nav.contact')}
										</Button>
									</Link>
								</div>
							</div>

							<div id='image' className='flex-1 flex justify-center '>
								<div className='relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-2xl'>
									<Image
										src='/my doc picture.jpg'
										alt='Profile'
										fill
										className='object-cover scale-100'
										priority
									/>
								</div>
							</div>
						</div>
					</RevealItem>
				</section>
			</Reveal>

			{/* Recent Blog Posts Section */}
			{/* <section className='py-16 border-t '>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between mb-8'>
						<h2 className='text-3xl font-bold'>Recent {t('nav.blogs')}</h2>
						<Link href='/blogs'>
							<Button variant='ghost'>
								View All <ArrowRight className='ml-2 h-4 w-4' />
							</Button>
						</Link>
					</div>

					<Reveal>
						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{blogs?.map((post: BlogPost) => (
								<RevealItem key={post.slug}>
									<MotionCard post={post} />
								</RevealItem>
							))}
						</div>
					</Reveal>
				</div>
			</section> */}
		</main>
	)
}
