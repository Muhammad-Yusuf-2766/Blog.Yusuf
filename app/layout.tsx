import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type React from 'react'
// import { Analytics } from "@vercel/analytics/next"
import { Navbar } from '@/components/shared/navbar'
import { LanguageProvider } from '@/contexts/language-context'
import { ThemeProvider } from '@/contexts/theme-context'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Personal Blog - Share Your Stories',
	description:
		'A personal blog website to share thoughts, projects, and experiences',
	generator: 'v0.app',
	icons: {
		icon: [
			{
				url: '/icon-light-32x32.png',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: '/icon-dark-32x32.png',
				media: '(prefers-color-scheme: dark)',
			},
			{
				url: '/icon.svg',
				type: 'image/svg+xml',
			},
		],
		apple: '/apple-icon.png',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`font-sans antialiased`}>
				<ThemeProvider>
					<LanguageProvider>
						<div className='md:px-24'>
							<Navbar />
							{children}
						</div>
					</LanguageProvider>
				</ThemeProvider>
				{/* <Analytics /> */}
			</body>
		</html>
	)
}
