'use client'

import { Reveal, RevealItem } from '@/components/shared/motionRevel'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { useTheme } from '@/contexts/theme-context'
import { useMotionWrapper } from '@/hooks/useMotionCard'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Code, Download, Lightbulb, Rocket, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function AboutPage() {
	const { t } = useLanguage()

	// const skills = [
	// 	{ name: 'Next.js', level: 90 },
	// 	{ name: 'React', level: 95 },
	// 	{ name: 'TypeScript', level: 85 },
	// 	{ name: 'Node.js', level: 80 },
	// 	{ name: 'Tailwind CSS', level: 90 },
	// 	{ name: 'PostgreSQL', level: 75 },
	// ]

	const values = [
		{
			icon: Code,
			title: 'Clean Code',
			description: 'Writing maintainable and efficient code is my priority',
		},
		{
			icon: Lightbulb,
			title: 'Innovation',
			description: 'Always exploring new technologies and approaches',
		},
		{
			icon: Rocket,
			title: 'Performance',
			description: 'Building fast and optimized web applications',
		},
		{
			icon: Users,
			title: 'Collaboration',
			description: 'Working together to achieve great results',
		},
	]

	const techs = [
		{
			name: 'Next.js',
			src: '/nextdotjs.svg',
		},
		{ name: 'React', src: '/react.svg' },
		{ name: 'TypeScript', src: '/typescript.svg' },
		{ name: 'Tailwind', src: '/tailwindcss.svg' },
		{ name: 'Express.js', src: '/express.svg' },
		{ name: 'Node.js', src: '/nodedotjs.svg' },
		{ name: 'MongoDB', src: '/mongodb.svg' },
		{ name: 'PostgreSQL', src: '/postgresql.svg' },
	]

	return (
		<main className='min-h-screen'>
			<Reveal>
				<RevealItem>
					<section className='bg-muted/60 rounded-md py-16'>
						<div className='container mx-auto px-4'>
							<h1 className='text-4xl md:text-5xl font-bold text-center mb-4'>
								{t('nav.about')}
							</h1>
							<p className='text-center text-muted-foreground max-w-2xl mx-auto'>
								{t('about.descr')}
							</p>
						</div>
					</section>
				</RevealItem>

				<RevealItem>
					<section className='container mx-auto px-4 py-16'>
						<div className='grid md:grid-cols-2 gap-12 items-center mb-16'>
							<MotionCard>
								<div className='relative w-full h-100 overflow-hidden'>
									<Image
										src='/my doc picture.jpg'
										alt='Profile'
										fill
										className='object-contain'
										priority
									/>
								</div>
							</MotionCard>

							<div className='space-y-4'>
								<h2 className='text-3xl font-bold'>
									{t('hero.greeting')} I'm Mukhammad Yusuf
								</h2>
								<p className='text-muted-foreground leading-relaxed'>
									{t('about.paragraph1')}
								</p>
								<p className='text-muted-foreground leading-relaxed'>
									{t('about.paragraph2')}
								</p>
								<p className='text-muted-foreground leading-relaxed'>
									{t('about.paragraph3')}
								</p>

								<Link
									href='/CV/My_CV_Notion.pdf'
									target='_blank'
									rel='noopener noreferrer'
								>
									<Button className='mt-2 p-5 hover:translate-x-2 transform cursor-pointer transition-all duration-200 ease-in-out'>
										CV donwload
										<Download />
									</Button>
								</Link>
							</div>
						</div>

						<div className='mb-16'>
							<h2 className='text-3xl font-bold mb-8 text-center'>
								{t('skills.title')}
							</h2>
							<div className='mx-auto space-y-4'>
								{/* <TechMarquee items={techs} speed={28} /> */}
								<TechBouncyGrid items={techs} />
							</div>
						</div>

						<div>
							<h2 className='text-3xl font-bold mb-8 text-center'>
								{t('skills.core')}
							</h2>
							<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
								{values.map((value, idx) => (
									// <MovingButton key={value.title} reverse={idx % 2 === 1}>
									<Card className='group' key={value.title}>
										{/* add to card: w-full bg-card/50  backdrop-blur-lg */}
										<CardContent className='pt-6'>
											<div className='flex flex-col items-center text-center space-y-4 group-hover:translate-x-2 transform cursor-pointer transition-all duration-200 ease-in-out'>
												<div className='p-3 rounded-full bg-primary/10'>
													<value.icon className='h-6 w-6 text-primary' />
												</div>
												<h3 className='font-bold'>{value.title}</h3>
												<p className='text-sm text-muted-foreground'>
													{value.description}
												</p>
											</div>
										</CardContent>
									</Card>
									// </MovingButton>
								))}
							</div>
						</div>
					</section>
				</RevealItem>
			</Reveal>
		</main>
	)
}

export function MotionCard({ children }: { children: React.ReactNode }) {
	const { ref, onMouseMove, onMouseLeave } = useMotionWrapper<HTMLDivElement>({
		maxTilt: 8,
	})

	return (
		<div
			ref={ref}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			style={{ transformStyle: 'preserve-3d' }}
			className=''
		>
			{children}
		</div>
	)
}

// export function SkillProgress({ skill }: { skill: Skill }) {
// 	const ref = useRef<HTMLDivElement | null>(null)
// 	const isInView = useInView(ref, { amount: 0.6, once: true })

// 	const [count, setCount] = useState(0)

// 	useEffect(() => {
// 		if (!isInView) return

// 		const controls = animate(0, skill.level, {
// 			duration: 3,
// 			ease: 'easeOut',
// 			onUpdate: latest => setCount(Math.round(latest)),
// 		})

// 		return () => controls.stop()
// 	}, [isInView, skill.level])

// 	return (
// 		<div ref={ref}>
// 			<div className='flex justify-between mb-2'>
// 				<span className='font-medium'>{skill.name}</span>

// 				{/* number count-up */}
// 				<span className='text-muted-foreground tabular-nums'>{count}%</span>
// 			</div>

// 			<div className='h-2 bg-muted rounded-full overflow-hidden'>
// 				{/* bar grow */}
// 				<motion.div
// 					className='h-full bg-primary'
// 					initial={{ width: 0 }}
// 					animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
// 					transition={{ duration: 1.2, ease: 'easeOut' }}
// 				/>
// 			</div>
// 		</div>
// 	)
// }

type Tech = { name: string; src: string }

export function TechBouncyGrid({
	items,
	className,
	intervalMs = 300,
}: {
	items: Tech[]
	className?: string
	intervalMs?: number
}) {
	const [activeIndex, setActiveIndex] = useState(0)
	const { theme } = useTheme()

	useEffect(() => {
		if (!items.length) return
		const id = setInterval(() => {
			setActiveIndex(i => (i + 1) % items.length)
		}, intervalMs)
		return () => clearInterval(id)
	}, [intervalMs, items.length])

	return (
		<div
			className={cn(
				'relative w-full overflow-hidden rounded-xl border bg-card/40 backdrop-blur p-6',
				className
			)}
		>
			<div className='flex justify-between flex-wrap max-md:justify-center'>
				{items.map((t, idx) => {
					const active = idx === activeIndex

					return (
						<motion.div
							key={t.name}
							className='group flex flex-col gap-3 items-center px-4 py-3'
							animate={
								active
									? { y: [0, -15, 0], scale: [1, 1.3, 1] }
									: { y: 0, scale: 1 }
							}
							transition={{ duration: 0.55, ease: 'easeOut' }}
						>
							<div className='relative h-7 w-7'>
								<Image
									src={t.src}
									alt={t.name}
									fill
									className={cn(`object-contain`, theme === 'dark' && 'invert')}
								/>
							</div>
							<span className='text-sm text-muted-foreground group-hover:text-foreground transition-colors'>
								{t.name}
							</span>
						</motion.div>
					)
				})}
			</div>
		</div>
	)
}
