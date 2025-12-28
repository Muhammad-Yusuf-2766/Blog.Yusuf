import { Reveal, RevealItem } from '@/components/shared/motionRevel'
import { getBlogs } from '@/service'
import BlogClient from './blogClient'

export default async function Page() {
	const blogs = await getBlogs() // yaxshisi array qaytarsin
	return (
		<Reveal>
			<RevealItem key={'s'}>
				<BlogClient allBlogs={blogs} />)
			</RevealItem>
		</Reveal>
	)
}
