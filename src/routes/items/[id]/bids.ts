import type { RequestHandler } from '@sveltejs/kit';
import type { Item } from '$services/types';
import { DateTime } from 'luxon';
import { createBid } from '$services/queries/bids';
import { getItem } from '$services/queries/items/items';

export const post: RequestHandler<any> = async ({ request, params, locals }) => {
	if (!locals.session.userId) {
		return {
			status: 401,
			body: { message: 'You must login to do that' }
		};
	}

	const item = (await getItem(params.id)) as any as Item;

	if (!item) {
		return {
			status: 404,
			body: { message: 'item not found' }
		};
	}

	const body = await request.json();

	await createBid({
		itemId: params.id,
		userId: locals.session.userId,
		amount: body.amount,
		createdAt: DateTime.now(),
		itemEndingAt: item.endingAt
	});

	return {
		status: 201
	};
};
