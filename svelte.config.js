import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		floc: true,
		adapter: adapter({ out: 'dist' }),
		vite: {
			resolve: {
				alias: {
					$services: resolve('./src/services')
				}
			}
		}
	}
};

export default config;
