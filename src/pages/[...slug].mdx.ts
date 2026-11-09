import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
	const posts = await getCollection("blog");

	return posts.map((post) => ({
		params: { slug: `${post.id}` },
		props: { source: post.body },
	}));
}

export const GET: APIRoute = ({ props }) => {
	return new Response(props.source, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
