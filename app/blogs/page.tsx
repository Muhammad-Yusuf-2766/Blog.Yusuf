import { Reveal, RevealItem } from '@/components/shared/motionRevel'
import { getBlogs } from '@/service'
import BlogClient from './blogClient'

export default async function BlogsPage() {
	const blogs = await getBlogs() // yaxshisi array qaytarsin
	return (
		<Reveal>
			<RevealItem>
				<BlogClient allBlogs={blogs} />)
			</RevealItem>
		</Reveal>
	)
}
