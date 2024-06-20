import type { RequestHandler } from '@sveltejs/kit';
import { DateTime } from 'luxon';
import { createItem } from '$services/queries/items/items';
import { createImageUrl } from '$services/utils/image-url';

export const post: RequestHandler = async ({ request, locals }) => {
	const data = await request.json();

	const id = await createItem(
		{
			name: data.name,
			description: data.description,
			createdAt: DateTime.now(),
			endingAt: DateTime.now().plus({ seconds: data.duration }),
			imageUrl: createImageUrl(),
			ownerId: locals.session.userId,
			highestBidUserId: '',
			price: 0,
			views: 0,
			likes: 0,
			bids: 0,
			status: ''
		},
		locals.session.userId
	);

	return {
		status: 200,
		body: {
			id
		}
	};
};
