'use client'
import { useTheme } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'
import {
	motion,
	useAnimationFrame,
	useMotionTemplate,
	useMotionValue,
	useTransform,
} from 'motion/react'
import React, { useRef } from 'react'

export function MovingButton({
	reverse = false,
	borderRadius = '1.75rem',
	children,
	as: Component = 'button',
	containerClassName,
	borderClassName,
	duration = 8000,
	className,
	...otherProps
}: {
	reverse?: boolean
	borderRadius?: string
	children: React.ReactNode
	as?: any
	containerClassName?: string
	borderClassName?: string
	duration?: number
	className?: string
	[key: string]: any
}) {
	const { theme } = useTheme()
	const glowColor = theme === 'dark' ? '#ffffff' : '#0891B2'
	return (
		<Component
			className={cn(
				'relative overflow-hidden bg-transparent',
				containerClassName
			)}
			style={{
				borderRadius: borderRadius,
			}}
			{...otherProps}
		>
			<div
				className='absolute inset-0'
				style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
			>
				<MovingBorder duration={duration} rx='30%' ry='30%' reverse={reverse}>
					<div
						className={cn('h-24 w-24 opacity-[0.8]', borderClassName)}
						style={{
							backgroundImage: `radial-gradient(${glowColor} 70%, transparent 60%)`,
						}}
					/>
				</MovingBorder>
			</div>

			<div
				className={cn(
					'relative flex antialiased border border-border',
					className
				)}
				style={{
					borderRadius: `calc(${borderRadius} * 0.96)`,
				}}
			>
				{children}
			</div>
		</Component>
	)
}

export const MovingBorder = ({
	children,
	duration = 3000,
	rx,
	ry,
	reverse,
	...otherProps
}: {
	children: React.ReactNode
	duration?: number
	rx?: string
	ry?: string
	reverse?: boolean
	[key: string]: any
}) => {
	const pathRef = useRef<any>(null)
	const progress = useMotionValue<number>(0)

	useAnimationFrame(time => {
		const length = pathRef.current?.getTotalLength()
		if (!length) return

		const pxPerMs = length / duration
		const t = (time * pxPerMs) % length

		// ✅ direction: normal -> t, reverse -> length - t
		progress.set(reverse ? length - t : t)
	})

	const x = useTransform(
		progress,
		val => pathRef.current?.getPointAtLength(val).x
	)
	const y = useTransform(
		progress,
		val => pathRef.current?.getPointAtLength(val).y
	)

	const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`

	return (
		<>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				preserveAspectRatio='none'
				className='absolute h-full w-full'
				width='100%'
				height='100%'
				{...otherProps}
			>
				<rect
					fill='none'
					width='100%'
					height='100%'
					rx={rx}
					ry={ry}
					ref={pathRef}
				/>
			</svg>
			<motion.div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					display: 'inline-block',
					transform,
				}}
			>
				{children}
			</motion.div>
		</>
	)
}
