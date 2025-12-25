'use client'

import type React from 'react'

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
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/contexts/language-context'
import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function SignUpPage() {
	const { t } = useLanguage()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleEmailSignUp = async (e: React.FormEvent) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			alert('Passwords do not match!')
			return
		}
		// TODO: Implement Supabase email/password signup
		console.log('[v0] Email signup:', email)
	}

	const handleGoogleSignUp = () => {
		// TODO: Implement Supabase Google OAuth
		console.log('[v0] Google signup clicked')
	}

	const handleGithubSignUp = () => {
		// TODO: Implement Supabase GitHub OAuth
		console.log('[v0] GitHub signup clicked')
	}

	return (
		<main className='min-h-[calc(100vh-4rem)] flex items-center justify-center p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-2'>
					<CardTitle className='text-2xl font-bold text-center'>
						{t('auth.signup')}
					</CardTitle>
					<CardDescription className='text-center'>
						Create a new account to get started
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex flex-col gap-3'>
						<Button
							variant='outline'
							className='w-full bg-transparent'
							onClick={handleGoogleSignUp}
						>
							<Image
								src='https://www.google.com/favicon.ico'
								alt='Google'
								width={20}
								height={20}
								className='mr-2'
							/>
							{t('auth.signInWith')} Google
						</Button>
						<Button
							variant='outline'
							className='w-full bg-transparent'
							onClick={handleGithubSignUp}
						>
							<Github className='mr-2 h-5 w-5' />
							{t('auth.signInWith')} GitHub
						</Button>
					</div>

					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<span className='w-full border-t' />
						</div>
						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-card px-2 text-muted-foreground'>
								{t('auth.or')}
							</span>
						</div>
					</div>

					<form onSubmit={handleEmailSignUp} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='your@email.com'
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								placeholder='••••••••'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='confirm-password'>Confirm Password</Label>
							<Input
								id='confirm-password'
								type='password'
								placeholder='••••••••'
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
						<Button type='submit' className='w-full'>
							{t('auth.signup')}
						</Button>
					</form>
				</CardContent>
				<CardFooter className='flex justify-center'>
					<p className='text-sm text-muted-foreground'>
						Already have an account?{' '}
						<Link href='/login' className='text-primary hover:underline'>
							{t('auth.login')}
						</Link>
					</p>
				</CardFooter>
			</Card>
		</main>
	)
}
