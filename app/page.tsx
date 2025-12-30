import { SparklesBackground } from '@/components/shared/sparklesBackground'
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
			<section id='home'>
				<HomeClient blogs={blogs} />
			</section>
			<section id='about'>
				<AboutPage />
			</section>
			<section id='projects'>
				<ProjectPage />
			</section>
			<section id='blogs'>
				<BlogsPage />
			</section>
			<section id='contact'>
				<ContactPage />
			</section>
		</SparklesBackground>
	)
}
