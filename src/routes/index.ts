import type { RequestHandler } from '@sveltejs/kit';
import {
	itemsByBids,
	itemsByLikes,
	itemsByPrice,
	itemsByViews,
	itemsByEndingTime
} from '$services/queries/items';

export const get: RequestHandler<any, any> = async () => {
	const [endingSoonest, mostViews, highestPrice] = await Promise.all([
		itemsByEndingTime('ASC', 0, 10),
		itemsByViews('DESC', 0, 10),
		itemsByPrice('DESC', 0, 10)
	]);

	return {
		body: { endingSoonest, mostViews, highestPrice }
	};
};
