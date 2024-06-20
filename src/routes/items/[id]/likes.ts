import type { RequestHandler } from '@sveltejs/kit';
import { getItem } from '$services/queries/items/items';
import { likeItem, unlikeItem } from '$services/queries/likes';

export const post: RequestHandler<any, any> = async ({ params, locals }) => {
	if (!locals.session.userId) {
		return {
			status: 401,
			body: { message: 'You must login to do that' }
		};
	}

	await likeItem(params.id, locals.session.userId);
	const item = await getItem(params.id);

	return {
		status: 201,
		body: {
			item: {
				...item,
				endingAt: item.endingAt.toMillis(),
				createdAt: item.createdAt.toMillis()
			}
		}
	};
};

export const del: RequestHandler<any, any> = async ({ params, locals }) => {
	if (!locals.session.userId) {
		return {
			status: 401,
			body: { message: 'You must login to do that' }
		};
	}

	await unlikeItem(params.id, locals.session.userId);
	const item = await getItem(params.id);

	return {
		status: 201,
		body: {
			item: {
				...item,
				endingAt: item.endingAt.toMillis(),
				createdAt: item.createdAt.toMillis()
			}
		}
	};
};
