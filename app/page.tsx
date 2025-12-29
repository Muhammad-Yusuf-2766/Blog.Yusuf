import { SparklesCore } from '@/components/ui/sparkles'
import { getBlogs } from '@/service'
import AboutPage from './about/page'
import BlogsPage from './blogs/page'
import ContactPage from './contact/page'
import HomeClient from './home/page'
import ProjectPage from './projects/page'

export default async function Page() {
	const blogs = await getBlogs() // yaxshisi array qaytarsin
	return (
		<SparklesBackground>
			<HomeClient blogs={blogs} />
			<AboutPage />
			<ProjectPage />
			<BlogsPage />
			<ContactPage />
		</SparklesBackground>
	)
}

type Props = {
	children: React.ReactNode
	className?: string
	particleColor?: string
	density?: number
}

export function SparklesBackground({
	children,
	className = '',
	particleColor = '#FFFFFF',
	density = 100,
}: Props) {
	return (
		<div className={`relative w-full overflow-hidden ${className}`}>
			<div className='fixed inset-0 -z-10'>
				<SparklesCore
					id='sparkles-bg'
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
