'use client'
import { motion, Variants } from 'framer-motion'
import React from 'react'

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.2, delayChildren: 0.2 },
	},
}

const item: Variants = {
	hidden: { opacity: 0, y: 25, x: 50 },
	show: {
		opacity: 1,
		y: 0,
		x: 0,
		transition: { duration: 0.5, ease: 'easeInOut' }, // agar baribir error bersa -> Fix 2
	},
}

type RevealProps = {
	children: React.ReactNode
	className?: string
	once?: boolean
	amount?: number | 'some' | 'all'
}

export function Reveal({
	children,
	className,
	once = true,
	amount = 'some',
}: RevealProps) {
	return (
		<motion.div
			variants={container}
			initial='hidden'
			whileInView='show'
			viewport={{ once, amount }}
			className={className}
		>
			{children}
		</motion.div>
	)
}

export function RevealItem({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<motion.div variants={item} className={className}>
			{children}
		</motion.div>
	)
}
