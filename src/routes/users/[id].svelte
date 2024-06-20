<script lang="ts">
	import Card from '$lib/components/card.svelte';
	export let username = '';
	export let sharedItems: any[] = [];
	export let likedItems: any[] = [];
</script>

<h1 class="text-3xl">{username}'s profile</h1>
<hr class="my-4" />

<h3 class="text-xl">Items you <span class="font-bold">both</span> like</h3>
<div class="flex flex-wrap gap-4 justify-start">
	{#each sharedItems as item}
		<Card {item} />
	{/each}
</div>

<hr class="my-12" />

<h3 class="text-xl">Items {username} likes</h3>
<div class="flex flex-wrap gap-4 justify-start">
	{#each likedItems as item}
		<Card {item} />
	{/each}
</div>
