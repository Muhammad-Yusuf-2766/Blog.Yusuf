'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SparklesCore } from '@/components/ui/sparkles'
import { useLanguage } from '@/contexts/language-context'
import {
	ArrowRight,
	Book,
	Code,
	ExternalLink,
	Github,
	ListVideo,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MotionCard } from '../about/page'

type Project = {
	projectName: string
	description: string
	image: {
		url: string
	}
	liveDemoLink?: string
	codeLink?: string
	stacks: [{ stackName: string }]
}

export function SparklesPreview() {
	const { t } = useLanguage()

	return (
		<div className='h-full relative w-full bg-muted/60 flex flex-col items-center justify-center overflow-hidden rounded-md'>
			<div className='w-full absolute inset-0 h-screen'>
				<SparklesCore
					id='tsparticlesfullpage'
					background='transparent'
					minSize={0.6}
					maxSize={1.4}
					particleDensity={100}
					className='w-full h-full'
					particleColor='#FFFFFF'
				/>
			</div>
			{/* Content Section */}
			<section className='py-16'>
				<div className='container mx-auto px-4'>
					<h1 className='text-4xl md:text-5xl font-bold text-center mb-4'>
						{t('nav.projects')}
					</h1>
					<p className='text-center text-muted-foreground max-w-2xl mx-auto'>
						{t('projects.descr')}
					</p>
				</div>
			</section>
		</div>
	)
}

export default function ProjectsClient({
	allProjects,
}: {
	allProjects: Project[]
}) {
	return (
		<main className='min-h-screen'>
			<SparklesPreview />

			<section className='py-16 w-full grid grid-cols-4 md:gap-x-10 px-4 max-md:grid-cols-1 gap-y-5'>
				<Accordion type='single' collapsible className='space-y-4 col-span-2'>
					{allProjects.map((project, index) => {
						const liveUrl =
							project.liveDemoLink?.startsWith('http://') ||
							project.liveDemoLink?.startsWith('https://')
								? project.liveDemoLink
								: project.liveDemoLink
								? `http://${project.liveDemoLink}`
								: ''

						return (
							<MotionCard key={project.projectName}>
								<AccordionItem
									value={`project-${index}`}
									className='border px-6 bg-card hover:shadow-sm shadow-card-foreground rounded-md'
								>
									<AccordionTrigger className='hover:no-underline py-6'>
										<div className='flex items-center gap-4 text-left flex-1'>
											<div className='relative h-16 w-16 overflow-hidden shrink-0'>
												<Image
													src={project.image.url || '/placeholder.svg'}
													alt={project.projectName}
													fill
													className='object-cover'
												/>
											</div>
											<div className='flex-1 min-w-0'>
												<h3 className='font-semibold text-lg mb-1'>
													{project.projectName}
												</h3>
												<p className='text-sm text-muted-foreground line-clamp-1'>
													{project.description}
												</p>
											</div>
										</div>
									</AccordionTrigger>

									<AccordionContent className='pb-6 pt-2'>
										<div className='space-y-6'>
											<div className='relative h-64 w-full overflow-hidden'>
												<Image
													src={project.image.url || '/placeholder.svg'}
													alt={project.projectName}
													fill
													className='object-cover'
												/>
											</div>

											<div>
												<h4 className='font-medium mb-2'>About this project</h4>
												<p className='text-muted-foreground'>
													{project.description}
												</p>
											</div>

											<div>
												<h4 className='font-medium mb-3'>Technologies used</h4>
												<div className='flex flex-wrap gap-2'>
													{project.stacks.map(stack => (
														<Badge key={stack.stackName} variant='secondary'>
															{stack.stackName}
														</Badge>
													))}
												</div>
											</div>

											<div className='flex gap-3 pt-2'>
												{project.liveDemoLink && (
													<Button
														variant='default'
														size='sm'
														className='flex-1'
														asChild
													>
														<a
															href={liveUrl}
															target='_blank'
															rel='noopener noreferrer'
															className='flex items-center justify-center'
														>
															<ExternalLink className='mr-2 h-4 w-4' />
															Live Demo
														</a>
													</Button>
												)}

												{project.codeLink && (
													<Button
														variant='outline'
														size='sm'
														className='flex-1'
														asChild
													>
														<a
															href={project.codeLink}
															target='_blank'
															rel='noopener noreferrer'
															className='flex items-center justify-center'
														>
															<Github className='mr-2 h-4 w-4' />
															View Code
														</a>
													</Button>
												)}
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</MotionCard>
						)
					})}
				</Accordion>
				<div
					className='col-span-2 space-y-6 text-muted-foreground
             transition-all duration-200 ease-in-out
             hover:text-primary hover:translate-x-2 transform cursor-pointer'
				>
					<h2 className='text-3xl font-bold'>Description</h2>
					<p className=' leading-relaxed flex gap-x-5 transition-all ease-in'>
						<Book size={35} /> Here you can learn about the projects I have
						done, see their drawings.
					</p>
					<p className=' leading-relaxed flex gap-x-5 transition-all ease-in'>
						<ListVideo size={35} /> You can also visit the project in real time
						via the live-demo link.
					</p>
					<p className=' leading-relaxed flex gap-x-5 transition-all ease-in'>
						<Code size={35} /> You can also view, analyze, and download the
						source code of the entire project via the Code button.
					</p>
					<Link href={'/projects'}>
						<Button className='mt-2 group'>
							All pojects
							<ArrowRight className='' />
						</Button>
					</Link>
				</div>
			</section>
		</main>
	)
}
