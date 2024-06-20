<script lang="ts">
	import type { Item } from '$services/types';
	import { DateTime } from 'luxon';
	import { page, session } from '$app/stores';
	import { post, del, get } from '$lib/fetch';
	import Chart from '$lib/components/chart.svelte';
	import LikeButton from '$lib/components/like-button.svelte';
	import Card from '$lib/components/card.svelte';
	import Stat from '$lib/components/stat.svelte';

	export let item: any = null;
	export let userLikes: boolean = false;
	export let history: { createdAt: string; amount: number }[] = [];
	export let similarItems: Item[] = [];
	export let userHasHighBid = false;

	let err = '';
	let amount = '';
	let loading = false;
	let message = '';

	$: err = amount && '';
	$: endingAt =
		typeof item.endingAt === 'object'
			? item.endingAt.toRelative().replace('in ', '')
			: DateTime.fromMillis(item.endingAt).toRelative().replace('in ', '');

	async function onClickLike() {
		if (!$session.userId) {
			return;
		}

		if (userLikes) {
			[{ item }] = await del(`/items/${$page.params.id}/likes`);
			userLikes = false;
		} else {
			[{ item }] = await post(`/items/${$page.params.id}/likes`, {});
			userLikes = true;
		}
	}

	async function onSubmit() {
		const parsed = parseFloat(amount);

		if (isNaN(parsed) || parsed <= 0) {
			err = 'Enter a valid amount';
			return;
		}

		message = '';
		loading = true;

		[, err] = await post(`/items/${$page.params.id}/bids`, { amount: parsed });

		if (err) {
			return;
		}

		[{ item, userLikes, history, similarItems, userHasHighBid }] = await get(
			`/items/${$page.params.id}`
		);
		amount = '';
		loading = false;
		message = 'Success! You have the winning bid';
	}
</script>

{#if item}
	<div>
		<div class="flex justify-end mb-2" />
		<div class="flex gap-10">
			<img alt="" class="w-1/3 p-3 border rounded" src={item.imageUrl} />
			<div class="flex-1 flex flex-col gap-4">
				<div class="flex items-center justify-between">
					<div class="text-3xl">
						{item.name}
					</div>
					<LikeButton numLikes={item.likes} {userLikes} on:click={onClickLike} />
				</div>
				<a
					href={`/users/${item.ownerId}`}
					class="inline-block self-start text-indigo-600 hover:text-indigo-900">See the seller</a
				>
				<p>
					{item.description}
				</p>

				<hr />

				<div class="flex justify-between">
					<Stat label="High Bid" value={'$' + item.price.toFixed(2)} />
					<Stat bg="bg-amber-500" label="# Bids" value={item.bids} />
					<Stat
						bg="bg-violet-500"
						label="Ending In"
						value={endingAt}
					/>
				</div>

				{#if userHasHighBid}
					<div class="text-lg text-green-600 font-bold">You have the highest bid!</div>
				{/if}

				<div class="border p-4 rounded w-full">
					<form on:submit|preventDefault={onSubmit} class="flex flex-col gap-3">
						<div class="text-lg">Place a Bid</div>

						<input
							bind:value={amount}
							id="amount"
							class="rounded-lgborder-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							placeholder={`$${(item.price + 0.01).toFixed(2)} minimum`}
						/>

						{#if err}
							<div class="text-red-500 font-bold">
								{err}
							</div>
						{/if}

						{#if message}
							<div class="text-green-500 font-bold">
								{message}
							</div>
						{/if}

						<button
							class:bg-gray-300={loading}
							class:disabled={loading}
							class="py-2 px-4 bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
						>
							Place Bid
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>

	<div class="my-8">
		<div class="text-xl">Bid History</div>
		<div class="my-2 mx-3">
			<Chart bidHistory={history} />
		</div>
	</div>
{/if}

<div class="text-xl">Similar Items</div>
<div class="flex flex-wrap gap-4 justify-center">
	{#each similarItems as item}
		<Card {item} />
	{/each}
</div>
