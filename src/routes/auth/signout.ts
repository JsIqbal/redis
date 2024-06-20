import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request, locals }) => {
	locals.session = null;

	return {
		status: 200
	};
};
