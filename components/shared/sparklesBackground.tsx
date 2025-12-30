'use client'

import { useTheme } from '@/contexts/theme-context'
import { useEffect, useState } from 'react'
import { SparklesCore } from '../ui/sparkles'

type Props = {
	children: React.ReactNode
	className?: string
	density?: number
}

export function SparklesBackground({
	children,
	className = '',
	density = 100,
}: Props) {
	const { theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	const particleColor = theme === 'dark' ? '#ffffff' : '#0891B2'

	return (
		<div className={`relative w-full overflow-hidden ${className}`}>
			<div className='fixed inset-0 -z-10'>
				<SparklesCore
					id={`sparkles-bg-${particleColor}`} // <-- pastdagi 3-band uchun ham foydali
					background='transparent'
					minSize={0.6}
					maxSize={1.4}
					particleDensity={density}
					className='w-full h-full'
					particleColor={particleColor}
				/>
			</div>
			{children}
		</div>
	)
}
