import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
const posts = await getCollection("posts");
const filteredPosts = posts.filter(post => !post.data.draft);

export async function GET(context) {
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: filteredPosts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
			pubDate: post.data.date,
			categories: post.data.tags,
		})),
	});
}
