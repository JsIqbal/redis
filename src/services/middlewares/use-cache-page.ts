import type { Handle } from '@sveltejs/kit';
import { getCachedPage, setCachedPage } from '$services/queries/page-cache';
import { streamToString } from '$lib/util/stream-to-string';

const cacheableRoutes = ['/about', '/privacy', '/auth/signin', '/auth/signup'];

export const useCachePage: Handle = async ({ event, resolve }) => {
	if (!cacheableRoutes.includes(event.url.pathname)) {
		return resolve(event);
	}

	const page = await getCachedPage(event.url.pathname);

	if (page) {
		return new Response(page, {
			headers: {
				'content-type': 'text/html'
			}
		});
	}

	event.request.headers.set('if-none-match', Math.random().toString());
	const res = await resolve(event);

	const resCache = res.clone();
	const body = await streamToString(resCache.body);
	await setCachedPage(event.url.pathname, body);

	return res;
};
