import { gsap } from 'gsap'
import { useCallback, useEffect, useRef } from 'react'

type UseTiltOptions = {
	maxTilt?: number
	perspective?: number
	speed?: number
	resetSpeed?: number
	ease?: string
}

export function useMotionWrapper<T extends HTMLElement>({
	maxTilt = 8,
	perspective = 900,
	speed = 0.2,
	resetSpeed = 0.5,
	ease = 'power2.out',
}: UseTiltOptions = {}) {
	const ref = useRef<T | null>(null)

	const onMouseMove = useCallback(
		(e: React.MouseEvent) => {
			const el = ref.current
			if (!el) return

			const rect = el.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			const px = (x / rect.width) * 2 - 1 // -1..1
			const py = (y / rect.height) * 2 - 1

			const rotateY = px * maxTilt
			const rotateX = -py * maxTilt

			gsap.to(el, {
				duration: speed,
				rotateX,
				rotateY,
				transformPerspective: perspective,
				ease,
			})
		},
		[maxTilt, perspective, speed, ease]
	)

	const onMouseLeave = useCallback(() => {
		const el = ref.current
		if (!el) return

		gsap.to(el, {
			duration: resetSpeed,
			rotateX: 0,
			rotateY: 0,
			ease,
		})
	}, [resetSpeed, ease])

	// optional: cleanup (kill tweens)
	useEffect(() => {
		const el = ref.current
		return () => {
			if (el) gsap.killTweensOf(el)
		}
	}, [])

	return { ref, onMouseMove, onMouseLeave }
}
