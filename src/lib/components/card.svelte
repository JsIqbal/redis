<script lang="ts">
	import { DateTime } from 'luxon';

	export let showViews = false;

	interface ItemSummary {
		id: string;
		name: string;
		endingAt: number;
		imageUrl: string;
		price: number;
		views?: number;
	}

	export let item: any;

	$: endingAt =
		typeof item.endingAt === 'number'
			? DateTime.fromMillis(item.endingAt).toRelative()
			: item.endingAt.toRelative();
</script>

<div class="w-80 flex justify-center items-center">
	<div class="w-full p-2">
		<div
			class="card flex flex-col justify-center p-8 border-gray-400 bg-white shadow border rounded-lg"
		>
			<div class="prod-title">
				<a href={`/items/${item.id}`}>
					<p class="h-16 text-ellipsis overflow-hidden text-xl uppercase text-gray-900 font-bold">
						{item.name}
					</p>
				</a>
				<p class="uppercase text-sm text-gray-400">
					Ends {endingAt}
				</p>
				{#if showViews}
					<p class="uppercase text-sm text-gray-400">
						{item.views} views
					</p>
				{/if}
			</div>
			<div class="prod-img">
				<a href={`/items/${item.id}`}>
					<img
						src={item.imageUrl}
						alt=""
						class="w-full object-cover object-center h-44 my-4 rounded"
					/>
				</a>
			</div>
			<div class="prod-info grid gap-10">
				<div class="flex flex-col md:flex-row justify-between items-center text-gray-900">
					<p class="font-bold text-xl">${item.price.toFixed(2) || 0}</p>
					<a href={`/items/${item.id}`}>
						<button
							class="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
						>
							View
						</button>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
