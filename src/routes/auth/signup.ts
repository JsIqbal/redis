import type { RequestHandler } from '@sveltejs/kit';
import { signup } from '$services/auth/auth';

export const post: RequestHandler = async ({ request, locals }) => {
	const { username, password } = await request.json();

	const userId = await signup(username, password);

	locals.session.userId = userId;
	locals.session.username = username;

	return {
		status: 200
	};
};
