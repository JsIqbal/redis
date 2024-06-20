<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/icon.svelte';

	const dispatch = createEventDispatcher();

	interface ColumnConfig {
		id?: string;
		formatter?: (val: any) => string | number;
		component?: any;
		field?: string;
		label: string;
		sortable?: boolean;
		props?: (val: any) => any;
	}

	interface Sort {
		page: number;
		perPage: number;
		sortBy: string;
		direction: string;
	}

	export let columns: ColumnConfig[] = [];
	export let items: any[] = [];
	export let totalPages = 0;

	export let sort: Sort;

	const directions = ['', 'DESC', 'ASC'];
	function onHeaderClick(field: string) {
		if (sort.sortBy !== field) {
			dispatch('change', { ...sort, sortBy: field, direction: directions[1] });
			return;
		}

		let index = directions.indexOf(sort.direction) + 1;
		if (index > 2) {
			index = 0;
		}
		dispatch('change', { ...sort, sortBy: field, direction: directions[index] });
	}

	function onChangePage(index: number) {
		if (index < 0 || index >= totalPages) {
			return;
		}
		dispatch('change', { ...sort, page: index });
	}
</script>

<table class="table table-auto p-4 w-full bg-white shadow rounded-lg bg-gray-100">
	<thead class="bg-blue-400">
		<tr>
			{#each columns as column}
				<th
					class:hover:bg-blue-300={column.sortable}
					class:cursor-pointer={column.sortable}
					class="border-b-2 p-4 text-left whitespace-nowrap font-semibold"
					on:click={() => column.sortable && onHeaderClick(column.id || column.field)}
				>
					{column.label}

					{#if (sort.sortBy === column.field || sort.sortBy === column.id) && sort.direction !== ''}
						<Icon name={sort.direction === 'ASC' ? 'arrow_upward' : 'arrow_downward'} />
					{:else}
						<span style:display="inline-block" style:width="16px" />
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each items as item}
			<tr class="text-gray-700">
				{#each columns as column}
					<td class="border-b-2 p-4">
						{#if column.component}
							<svelte:component
								this={column.component}
								{...column.props ? column.props(item) : {}}
							/>
						{:else if column.formatter}
							{column.formatter(item)}
						{:else}
							{item[column.field]}
						{/if}
					</td>{/each}
			</tr>
		{/each}
	</tbody>
</table>

<div class="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
	<div class="flex items-center">
		<button
			type="button"
			class="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
			on:click={() => onChangePage(sort.page - 1)}
		>
			<svg
				width="9"
				fill="currentColor"
				height="8"
				class=""
				viewBox="0 0 1792 1792"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"
				/>
			</svg>
		</button>

		{#each Array(totalPages)
			.fill(0)
			.map((_, i) => i) as index}
			<button
				type="button"
				class="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
				class:bg-indigo-100={index === sort.page}
				on:click={() => onChangePage(index)}
			>
				{index + 1}
			</button>
		{/each}

		<button
			type="button"
			class="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
			on:click={() => onChangePage(sort.page + 1)}
		>
			<svg
				width="9"
				fill="currentColor"
				height="8"
				class=""
				viewBox="0 0 1792 1792"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
				/>
			</svg>
		</button>
	</div>
</div>
