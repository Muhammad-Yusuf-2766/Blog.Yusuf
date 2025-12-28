import { getProjects } from '@/service'
import ProjectsClient from './projectClient'

export default async function Page() {
	const allProjects = await getProjects()
	return <ProjectsClient allProjects={allProjects} />
}
