import type { RequestHandler } from '@sveltejs/kit';
import { getUserById } from '$services/queries/users';
import { commonLikedItems, likedItems } from '$services/queries/likes';

interface Params {
	id: string;
}

export const get: RequestHandler<Params, any> = async ({ params, locals }) => {
	const { id } = params;

	const user = await getUserById(id);
	const sharedItems = await commonLikedItems(id, locals.session.userId);
	const liked = await likedItems(id);

	return {
		body: {
			username: user.username,
			sharedItems: (sharedItems || []).map((item) => {
				return {
					...item,
					endingAt: item.endingAt.toMillis(),
					createdAt: item.createdAt.toMillis()
				};
			}),
			likedItems: (liked || []).map((item) => {
				return {
					...item,
					endingAt: item.endingAt.toMillis(),
					createdAt: item.createdAt.toMillis()
				};
			})
		}
	};
};
