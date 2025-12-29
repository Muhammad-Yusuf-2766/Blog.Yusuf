import { Reveal, RevealItem } from '@/components/shared/motionRevel'
import { getProjects } from '@/service'
import ProjectsClient from './projectClient'

export default async function ProjectPage() {
	const allProjects = await getProjects()
	return (
		<Reveal>
			<RevealItem>
				<ProjectsClient allProjects={allProjects} />)
			</RevealItem>
		</Reveal>
	)
}
