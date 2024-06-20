import type { Item } from '$services/types';
import { DateTime } from 'luxon';

export enum ItemStatus {
	Sold = 'sold',
	Unsold = 'unsold',
	Active = 'active'
}

export const getStatus = (item: Item) => {
	const ended = item.endingAt < DateTime.now();

	if (ended && item.price > 0) {
		return ItemStatus.Sold;
	} else if (ended) {
		return ItemStatus.Unsold;
	} else {
		return ItemStatus.Active;
	}
};
