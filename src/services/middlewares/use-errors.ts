import type { Handle } from '@sveltejs/kit';

export const useErrors: Handle = async ({ event, resolve }) => {
	try {
		return await resolve(event);
	} catch (err) {
		console.error(err);

		return new Response(
			JSON.stringify({
				message: err.message
			}),
			{
				status: 500
			}
		);
	}
};
