<script lang="ts">
	import { debounce } from '$lib/util/debounce';
	import { get } from '$lib/fetch';

	let term = '';
	let results = [];
	let err = '';
	let focused = false;

	const search = debounce(async (searchTerm: string) => {
		const qs = new URLSearchParams({ term: searchTerm });
		[{ results }, err] = await get(`/items/search?${qs.toString()}`);
		loading = false;

		if (results.length === 0 && !err) {
			err = 'No Results';
		}
	}, 300);

	$: term && search(term);
	$: loading = !!term;
	$: !term && (results = []);
</script>

<svelte:window on:click={() => (focused = false)} />
<div
	class="relative h-10 w-96 ml-4 border border-gray-300 text-sm rounded-full flex"
	on:click|stopPropagation={() => (focused = true)}
>
	<input
		type="search"
		name="search"
		placeholder="Search"
		class="px-4 w-full rounded-full text-sm focus:outline-none"
		bind:value={term}
	/>

	{#if focused && (loading || err || results.length)}
		<div class="absolute z-40 w-full shadow top-[110%] bg-gray-50 border rounded">
			{#if loading}
				<div class="p-2">Loading...</div>
			{:else if err}
				<div class="p-2">
					{err}
				</div>
			{:else if results.length}
				<div class="flex flex-col gap-0.5 bg-gray-200">
					{#each results as item}
						<a href={`/items/${item.id}`}>
							<div class="p-4 bg-white hover:bg-gray-50">
								{item.name}
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
