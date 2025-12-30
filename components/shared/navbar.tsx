'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from '@/contexts/language-context'
import { useTheme } from '@/contexts/theme-context'
import {
	Book,
	Contact,
	FolderArchive,
	Globe,
	Moon,
	Notebook,
	Sun,
} from 'lucide-react'
import Link from 'next/link'
import MobileMenu from './mobile'

export function Navbar() {
	const { theme, toggleTheme } = useTheme()
	const { language, setLanguage, t } = useLanguage()
	const navlinks = [
		{ name: t('nav.about'), path: '/#about', icon: Book },
		{ name: t('nav.projects'), path: '/#projects', icon: FolderArchive },

		{ name: t('nav.blogs'), path: '/#blogs', icon: Notebook },
		{ name: t('nav.contact'), path: '/#contact', icon: Contact },
	]

	return (
		<nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
			<div className='container mx-auto flex h-16 items-center justify-between px-4'>
				<div className='flex items-center gap-8'>
					<Link href='/' className='text-xl font-bold'>
						Blog
					</Link>

					<div className='hidden md:flex gap-6'>
						{navlinks.map(link => (
							<Link
								key={link.path}
								href={link.path}
								className='hover:underline'
							>
								{link.name}
							</Link>
						))}
					</div>
					{/* Mobile menu button */}
					<MobileMenu navlinks={navlinks} />
				</div>

				<div className='flex items-center gap-2'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' size='icon'>
								<Globe className='h-5 w-5' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem onClick={() => setLanguage('en')}>
								English {language === 'en' && '✓'}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setLanguage('ko')}>
								한국어 {language === 'ko' && '✓'}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Button variant='ghost' size='icon' onClick={toggleTheme}>
						{theme === 'light' ? (
							<Moon className='h-5 w-5' />
						) : (
							<Sun className='h-5 w-5' />
						)}
					</Button>

					{/* <Link href='/login'>
						<Button variant='outline' size='sm'>
							{t('auth.login')}
						</Button>
					</Link> */}
				</div>
			</div>
		</nav>
	)
}
