import { getBlogs } from '@/service'
import HomeClient from './home/page'

export default async function Page() {
	const blogs = await getBlogs() // yaxshisi array qaytarsin
	return <HomeClient blogs={blogs} />
}
