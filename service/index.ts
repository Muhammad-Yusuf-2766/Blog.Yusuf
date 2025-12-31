export interface BlogPost {
	title: string
	description: string
	slug: string
	author: { name: string }
	image: { url: string } | null
	publishedAt?: string
	content?: { html: string } // agar RichText bo'lsa (variant A)
	// content?: { raw: any }   // agar raw ishlatsangiz (variant B)
} // lib/getBlogs.ts (server)

export async function getBlogs() {
	const res = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
        query {
          blogs {
            title
            slug
            description
            image { url }
            author { name }
          }
        }
      `,
		}),
		next: { revalidate: 60 }, // 60 soniyada 1 marta yangilanadi
	})

	const json = await res.json()
	return json.data.blogs
}

export async function getBlogBySlug(slug: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
        query BlogBySlug($slug: String!) {
          blog(where: { slug: $slug }) {
            title
            slug
            description
            image { url }
            author { name }
            publishedAt
            content { html }
          }
        }
      `,
			variables: { slug },
		}),
		next: { revalidate: 60 },
	})

	const json = await res.json()
	return json.data?.blog as BlogPost | null
}

export async function getProjects() {
	const res = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
        query {
          projects {
    projectName
    description
    image {
      url
    }
    liveDemoLink
    codeLink
    stacks {
      stackName
    }
  }
        }
      `,
		}),
		next: { revalidate: 60 }, // 60 soniyada 1 marta yangilanadi
	})

	const json = await res.json()
	return json.data.projects
}

export async function getProject(slug: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
        query {
          project {
  }
}
      `,
		}),
		next: { revalidate: 60 }, // 60 soniyada 1 marta yangilanadi
	})

	const json = await res.json()
	return json.data.project
}
