// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import Theme from './theme.json';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.twhlynch.me',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			themes: {
				light: Theme,
				dark: Theme,
			},
			theme: Theme,
		},
	}
});