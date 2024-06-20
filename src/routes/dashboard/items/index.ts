import type { RequestHandler } from '@sveltejs/kit';
import { itemsByUser } from '$services/queries/items';

export const get: RequestHandler<any, any> = async ({ url, locals }) => {
	const sort = {
		page: parse(url.searchParams.get('page'), 0),
		perPage: parse(url.searchParams.get('perPage'), 10),
		sortBy: url.searchParams.get('sortBy') ?? '',
		direction: url.searchParams.get('direction') ?? '',
		tag: (url.searchParams.get('tag') ?? '').replace(/[^a-zA-Z0-9 -]/gi, '')
	};

	const { items, totalPages } = await itemsByUser(locals.session.userId, sort);

	return {
		body: { items, totalPages }
	};
};

const parse = (val: string, def: number) => {
	const parsed = parseInt(val);
	if (isNaN(parsed)) {
		return def;
	} else {
		return parsed;
	}
};
