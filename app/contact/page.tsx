'use client'

import type React from 'react'

import { Reveal, RevealItem } from '@/components/shared/motionRevel'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MovingButton } from '@/components/ui/moving-border'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/contexts/language-context'
import { Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ContactPage() {
	const { t } = useLanguage()
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		phone: '',
		message: '',
	})

	const handleSubmit = async (e: React.FormEvent) => {
		setIsLoading(true)
		e.preventDefault()
		await fetch('/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		}).then(async res => {
			const data = await res.json()
			if (!data.ok)
				return toast.error(`Error: ${data.error || 'Unknown error'}`)
			toast.success("Thank you for your message! I'll get back to you soon.")
			setIsLoading(false)
		})

		setFormData({ name: '', email: '', subject: '', phone: '', message: '' })
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<main className='min-h-screen'>
			<Reveal>
				<RevealItem>
					<section className='bg-muted/60 rounded-md py-16'>
						<div className='container mx-auto px-4'>
							<h1 className='text-4xl md:text-5xl font-bold text-center mb-4'>
								{t('nav.contact')}
							</h1>
							<p className='text-center text-muted-foreground max-w-2xl mx-auto'>
								{t('contact.descr')}
							</p>
						</div>
					</section>
				</RevealItem>{' '}
				<RevealItem>
					<section className='container mx-auto px-4 py-16'>
						<div className='grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
							<div className='lg:col-span-2'>
								<Card>
									<CardHeader>
										<CardTitle>Send me a message</CardTitle>
										<CardDescription>
											Fill out the form below and I'll get back to you as soon
											as possible
										</CardDescription>
									</CardHeader>
									<CardContent>
										<form onSubmit={handleSubmit} className='space-y-4'>
											<div className='grid md:grid-cols-2 gap-4'>
												<div className='space-y-2'>
													<Label htmlFor='name'>Name</Label>
													<Input
														id='name'
														name='name'
														placeholder='Your name'
														value={formData.name}
														onChange={handleChange}
														required
													/>
												</div>
												<div className='space-y-2'>
													<Label htmlFor='email'>Email</Label>
													<Input
														id='email'
														name='email'
														type='email'
														placeholder='your@email.com'
														value={formData.email}
														onChange={handleChange}
														required
													/>
												</div>
											</div>
											<div className='grid md:grid-cols-2 gap-4'>
												<div className='space-y-2'>
													<Label htmlFor='subject'>Subject</Label>
													<Input
														id='subject'
														name='subject'
														placeholder='What is this about?'
														value={formData.subject}
														onChange={handleChange}
														required
													/>
												</div>

												<div className='space-y-2'>
													<Label htmlFor='phone'>Phone</Label>
													<Input
														type='tel'
														id='phone'
														name='phone'
														placeholder='Your phone number'
														value={formData.phone}
														onChange={handleChange}
														required
													/>
												</div>
											</div>

											<div className='space-y-2'>
												<Label htmlFor='message'>Message</Label>
												<Textarea
													id='message'
													name='message'
													placeholder='Your message...'
													className='min-h-[200px]'
													value={formData.message}
													onChange={handleChange}
													required
												/>
											</div>
											<Button
												type='submit'
												className='w-full'
												disabled={isLoading}
											>
												{isLoading ? (
													<>
														<Loader2 className='mr-2 h-4 w-4 animate-spin' />
														Sending...
													</>
												) : (
													<>
														<Send className='mr-2 h-4 w-4' />
														Send Message
													</>
												)}
											</Button>
										</form>
									</CardContent>
								</Card>
							</div>

							<div className='space-y-6'>
								<MovingButton as={'div'}>
									<Card className='w-full bg-card/50  backdrop-blur-lg'>
										<CardHeader>
											<CardTitle>Contact Information</CardTitle>
										</CardHeader>
										<CardContent className='space-y-4'>
											<div className='flex items-start gap-3'>
												<div className='p-2 rounded-lg bg-primary/10 mt-1'>
													<Mail className='h-5 w-5 text-primary' />
												</div>
												<div>
													<p className='font-medium'>Email</p>
													<p className='text-sm text-muted-foreground'>
														john.doe@example.com
													</p>
												</div>
											</div>

											<div className='flex items-start gap-3'>
												<div className='p-2 rounded-lg bg-primary/10 mt-1'>
													<Phone className='h-5 w-5 text-primary ' />
												</div>
												<div>
													<p className='font-medium'>Phone</p>
													<p className='text-sm text-muted-foreground'>
														+1 (555) 123-4567
													</p>
												</div>
											</div>

											<div className='flex items-start gap-3'>
												<div className='p-2 rounded-lg bg-primary/10 mt-1'>
													<MapPin className='h-5 w-5 text-primary' />
												</div>
												<div>
													<p className='font-medium'>Location</p>
													<p className='text-sm text-muted-foreground'>
														San Francisco, CA
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</MovingButton>

								<MovingButton as={'div'} reverse>
									<Card className='w-full bg-card/50  backdrop-blur-lg'>
										<CardHeader>
											<CardTitle>Office Hours</CardTitle>
										</CardHeader>
										<CardContent className='space-y-2'>
											<div className='flex justify-between'>
												<span className='text-muted-foreground'>
													Monday - Friday
												</span>
												<span className='font-medium'>9:00 AM - 6:00 PM</span>
											</div>
											<div className='flex justify-between'>
												<span className='text-muted-foreground'>Weekend</span>
												<span className='font-medium'>Closed</span>
											</div>
										</CardContent>
									</Card>
								</MovingButton>
							</div>
						</div>
					</section>
				</RevealItem>
			</Reveal>
		</main>
	)
}
