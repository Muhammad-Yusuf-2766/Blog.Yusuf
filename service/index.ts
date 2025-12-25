const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string
import request, { gql } from 'graphql-request'

export const getBlogs = async () => {
	const query = gql`
		query MyQuery {
			blogs {
				title
				slug
				description
				image {
					url
				}
				author {
					name
				}
			}
		}
	`

	const data = await request(graphqlAPI, query)
	return data
}
