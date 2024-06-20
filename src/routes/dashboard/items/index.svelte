<script lang="ts">
	import { DateTime } from 'luxon';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import ItemBadge from '$lib/components/item-badge.svelte';
	import Table from '$lib/components/table.svelte';
	import Link from '$lib/components/link.svelte';

	interface ItemSummary {
		id: string;
		name: string;
		endingAt: number;
		imageUrl: string;
		price: number;
		bids: number;
		views: number;
		likes: number;
	}

	interface Sort {
		page: number;
		perPage: number;
		sortBy: string;
		direction: string;
		tag: string;
	}

	const parse = (val: string, def: number) => {
		const parsed = parseInt(val);
		if (isNaN(parsed)) {
			return def;
		} else {
			return parsed;
		}
	};

	export let totalPages = 0;
	export let items: ItemSummary[] = [];
	let err = '';
	$: sort = {
		page: parse($page.url.searchParams.get('page'), 0),
		perPage: parse($page.url.searchParams.get('perPage'), 10),
		direction: $page.url.searchParams.get('direction') ?? '',
		sortBy: $page.url.searchParams.get('sortBy') ?? '',
		tag: $page.url.searchParams.get('tag') ?? ''
	};

	function timeLeft(t: number) {
		let _t = typeof t === 'object' ? (t as any).toMillis() : t;
		const endingAt = DateTime.fromMillis(_t);

		if (endingAt < DateTime.now()) {
			return '-';
		} else {
			return endingAt.toRelative().replace('in ', '');
		}
	}

	const columns = [
		{ label: 'Name', field: 'name', sortable: true },
		{ label: 'Price', field: 'price', sortable: true },
		{
			field: 'endingAt',
			label: 'Time Left',
			formatter: (item: ItemSummary) => timeLeft(item.endingAt),
			sortable: true
		},
		{ label: '# Bids', field: 'bids', sortable: true },
		{ label: '# Views', field: 'views', sortable: true },
		{ label: '# Likes', field: 'likes', sortable: true },
		{
			label: 'Link',
			component: Link,
			props: (item: ItemSummary) => {
				return { href: `/items/${item.id}`, child: 'View' };
			}
		}
	];

	function updateParams(update: Partial<Sort>) {
		if (!browser) {
			return;
		}

		const params = new URLSearchParams({ ...sort, ...update } as any);
		goto(`/dashboard/items?${params.toString()}`, {
			replaceState: true,
			noscroll: true,
			keepfocus: true
		});
	}

	function onChange(e: any) {
		updateParams(e.detail);
	}

	function onSelectChange(e: any) {
		updateParams({ tag: e.target.value });
	}
</script>

<div class="flex justify-between">
	<div class="text-3xl mb-4">Your Items</div>
	<!-- <div>
		Filter By Status
		<select
			value={sort.tag}
			on:change={onSelectChange}
			id="duration"
			class="border py-2 pr-4 pl-2 shadow-sm border-gray-300 rounded"
		>
			<option value={''}>Show All</option>
			<option value={'active'}>Show Active</option>
			<option value={'unsold'}>Show Unsold</option>
			<option value={'sold'}>Show Sold</option>
		</select>
	</div> -->
</div>

{#if err}
	<div class="text-red-500 text-lg font-bold">{err}</div>
{/if}

<Table on:change={onChange} {totalPages} {sort} {items} {columns} />
