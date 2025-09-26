// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog-qz09b2ni6-kevin-christs-projects.vercel.app',
  integrations: [mdx(), sitemap()],
  adapter: vercel(),
});
