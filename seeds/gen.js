import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import { randomBytes } from 'crypto';
import { chairDescriptions, tableDescriptions } from './content.js';
import fs from 'fs/promises';

const random = (arr) => {
	return arr[~~(Math.random() * arr.length)];
};

export const genId = () => {
	return randomBytes(3).toString('hex');
};

export const createImageUrl = () => {
	return `https://realrealreal-redis.s3.amazonaws.com/${~~(Math.random() * 198) + 1}.jpg`;
};

const run = async () => {
	const buildItem = async (description) => {
		const id = genId();
		const owner = random(users);
		const duration = faker.datatype.number({ min: 60, max: 86400 / 2 });

		const item = {
			id,
			name: faker.commerce.productName(),
			imageUrl: createImageUrl(),
			description: description,
			ownerId: owner.id,
			createdAt: DateTime.now().toMillis(),
			endingAt: DateTime.now().plus({ seconds: duration }).toMillis(),
			highestBidUserId: '',
			views: [],
			likes: [],
			bids: 0,
			price: 0,
			status: 'active'
		};

		return item;
	};

	const users = Array(100)
		.fill(null)
		.map(() => {
			return {
				id: genId(),
				username: faker.internet.userName()
			};
		});

	const items = [];
	for (let desc of chairDescriptions) {
		items.push(await buildItem(desc));
	}
	for (let desc of tableDescriptions) {
		items.push(await buildItem(desc));
	}

	const bids = Array(1600)
		.fill(0)
		.map((_, i) => {
			const item = random(items);
			const user = random(users);
			const amount = item.price + faker.datatype.number({ min: 1, max: 10 });

			item.price = amount;
			item.highestBidUserId = user.id;
			item.bids++;

			return {
				userId: user.id,
				itemId: item.id,
				amount,
				time: Date.now() + i
			};
		});

	Array(800)
		.fill(0)
		.forEach(() => {
			const user = random(users);
			const item = random(items);

			if (item.likes.includes(user.id)) {
				return null;
			}
			item.likes.push(user.id);
		});

	Array(2500)
		.fill(0)
		.forEach(() => {
			const user = random(users);
			const item = random(items);
			if (item.views.includes(user.id)) {
				return null;
			}
			item.views.push(user.id);
		});

	fs.writeFile(
		'./content.json',
		JSON.stringify({
			baseTime: Date.now(),
			users,
			items,
			bids
		})
	);
};

run();

const pause = (duration = 10) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};
