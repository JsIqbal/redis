import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (event) => {
	return {
		status: 200,
		body: event.locals.session as any
	};
};
