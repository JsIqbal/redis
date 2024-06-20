import type { DateTime } from 'luxon';

export interface Bid {
	createdAt: DateTime;
	amount: number;
}

export interface Item {
	id: string;
	name: string;
	ownerId: string;
	imageUrl: string;
	description: string;
	createdAt: DateTime;
	endingAt: DateTime;
	views: number;
	likes: number;
	price: number;
	bids: number;
	highestBidUserId: string;
}

export interface CreateItemAttrs {
	name: string;
	imageUrl: string;
	description: string;
	createdAt: DateTime;
	endingAt: DateTime;
	ownerId: string;
	highestBidUserId: string;
	status: string;
	price: number;
	views: number;
	likes: number;
	bids: number;
}

export interface User {
	id: string;
	username: string;
	password: string;
}

export interface CreateUserAttrs {
	username: string;
	password: string;
}

export interface CreateBidAttrs {
	itemId: string;
	userId: string;
	amount: number;
	createdAt: DateTime;
	itemEndingAt: DateTime;
}

export interface Session {
	id: string;
	userId: string | null;
	username: string;
}

export interface CreateSessionDto {
	userId: string;
}
