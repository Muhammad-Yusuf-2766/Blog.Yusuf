'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { Code, Lightbulb, Rocket, Users } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
	const { t } = useLanguage()

	const skills = [
		{ name: 'Next.js', level: 90 },
		{ name: 'React', level: 95 },
		{ name: 'TypeScript', level: 85 },
		{ name: 'Node.js', level: 80 },
		{ name: 'Tailwind CSS', level: 90 },
		{ name: 'PostgreSQL', level: 75 },
	]

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

	return (
		<main className='min-h-screen'>
			<section className='bg-muted/30 py-16'>
				<div className='container mx-auto px-4'>
					<h1 className='text-4xl md:text-5xl font-bold text-center mb-4'>
						{t('nav.about')}
					</h1>
					<p className='text-center text-muted-foreground max-w-2xl mx-auto'>
						Learn more about me, my skills, and what drives my passion for web
						development
					</p>
				</div>
			</section>

			<section className='container mx-auto px-4 py-16'>
				<div className='grid md:grid-cols-2 gap-12 items-center mb-16'>
					<div className='relative w-full h-100 rounded-lg overflow-hidden'>
						<Image
							src='/my doc picture.jpg'
							alt='Profile'
							fill
							className='object-contain'
							priority
						/>
					</div>

					<div className='space-y-4'>
						<h2 className='text-3xl font-bold'>Hi, I'm Mukhammad Yusuf</h2>
						<p className='text-muted-foreground leading-relaxed'>
							I'm a passionate full-stack developer with over 2 years of
							experience building modern web applications. I specialize in
							React, Next.js, Node.js and TypeScript, creating scalable and
							performant solutions.
						</p>
						<p className='text-muted-foreground leading-relaxed'>
							My journey in web development started with a curiosity about how
							websites work, and it has grown into a career I love. I'm
							constantly learning and exploring new technologies to stay at the
							forefront of web development.
						</p>
						<p className='text-muted-foreground leading-relaxed'>
							When I'm not coding, you can find me writing technical articles,
							contributing to open-source projects, or mentoring aspiring
							developers.
						</p>
					</div>
				</div>

				<div className='mb-16'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						Skills & Technologies
					</h2>
					<div className='max-w-3xl mx-auto space-y-4'>
						{skills.map(skill => (
							<div key={skill.name}>
								<div className='flex justify-between mb-2'>
									<span className='font-medium'>{skill.name}</span>
									<span className='text-muted-foreground'>{skill.level}%</span>
								</div>
								<div className='h-2 bg-muted rounded-full overflow-hidden'>
									<div
										className='h-full bg-primary transition-all'
										style={{ width: `${skill.level}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div>
					<h2 className='text-3xl font-bold mb-8 text-center'>Core Values</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{values.map(value => (
							<Card key={value.title}>
								<CardContent className='pt-6'>
									<div className='flex flex-col items-center text-center space-y-4'>
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
						))}
					</div>
				</div>
			</section>
		</main>
	)
}
