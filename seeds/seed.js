import 'dotenv/config';
import _ from 'lodash';
import { createClient } from 'redis';
import { DateTime } from 'luxon';
import fs from 'fs/promises';
import {
	usersKey,
	usernamesKey,
	usersItemsKey,
	usersBidsKey,
	usersLikesKey,
	itemsKey,
	bidHistoryKey,
	itemsByBidsKey,
	itemsByViewsKey,
	itemsByPriceKey,
	itemsByEndingAtKey,
	itemsViewsKey,
	usernamesUniqueKey
} from './seed-keys.js';

const client = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT)
	},
	password: process.env.REDIS_PW
});

const serializeHistory = (amount, createdAt) => {
	return `${amount}:${createdAt}`;
};

const run = async () => {
	client.on('error', (err) => console.log(err));
	await client.connect();

	await client.flushAll();

	const content = JSON.parse(await fs.readFile(new URL('./content.json', import.meta.url), 'utf8'));

	const itemPromises = _.flatMap(content.items, (_item) => {
		const delta = Date.now() - content.baseTime;
		const endingAt = DateTime.fromMillis(_item.endingAt).plus({ milliseconds: delta }).toMillis();

		const item = {
			..._item,
			id: _item.id.replace('items#', ''),
			views: _item.views.length,
			likes: _item.likes.length,
			createdAt: DateTime.now().toMillis(),
			endingAt
		};

		return [
			..._item.likes.map((userId) => {
				return client.sAdd(usersLikesKey(userId), _item.id);
			}),
			..._item.views.map((userId) => {
				return client.pfAdd(itemsViewsKey(_item.id), userId);
			}),
			client.hSet(itemsKey(item.id), item),
			client.zAdd(usersItemsKey(item.ownerId), {
				value: item.id,
				score: endingAt
			}),
			client.zAdd(itemsByBidsKey(), {
				value: item.id,
				score: item.bids
			}),
			client.zAdd(itemsByViewsKey(), {
				value: item.id,
				score: item.views
			}),
			client.zAdd(itemsByPriceKey(), {
				value: item.id,
				score: item.price
			}),
			client.zAdd(itemsByEndingAtKey(), {
				value: item.id,
				score: item.endingAt
			})
		];
	});

	const userPromises = _.flatMap(content.users, (user) => {
		return [
			client.sAdd(usernamesUniqueKey(), {
				value: user.username
			}),
			client.zAdd(usernamesKey(), {
				value: user.username,
				score: parseInt(user.id, 16)
			}),
			client.hSet(usersKey(user.id), {
				username: user.username,
				password: ''
			})
		];
	});

	const bidPromises = _.flatMap(content.bids, (bid) => {
		return [
			client.sAdd(usersBidsKey(bid.userId), bid.itemId),
			client.rPush(bidHistoryKey(bid.itemId), serializeHistory(bid.amount, bid.time)),
			client.zIncrBy(itemsByBidsKey(), 1, bid.itemId),
			client.zAdd(itemsByPriceKey(), { score: bid.amount, value: bid.itemId })
		];
	});

	await Promise.all([...itemPromises, ...userPromises, ...bidPromises]);

	client.quit();
};

run();
