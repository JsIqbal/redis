<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { browser } from '$app/env';
	import Icon from '$lib/components/icon.svelte';

	let container: HTMLDivElement = null;
	let scroller: HTMLDivElement = null;

	let scrollBy = 300;
	if (browser) {
		scrollBy = window.innerWidth / 2;
	}

	const offset = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	function goLeft() {
		if ($offset - scrollBy > 0) {
			offset.set($offset - scrollBy);
		} else {
			offset.set(0);
		}
	}

	function goRight() {
		const { width } = container.getBoundingClientRect();
		const { scrollWidth: scrollerWidth } = scroller;

		if ($offset + scrollBy > scrollerWidth - width) {
			offset.set(scrollerWidth - width);
		} else {
			offset.set($offset + scrollBy);
		}
	}
</script>

<div class="relative w-full bg-gray-100 rounded my-2 p-4">
	<div class="absolute inset-y-1/2 z-10">
		<button
			on:click={goLeft}
			style:transform="translate(-50%, -50%)"
			class="flex text-center items-center p-3 bg-gray-800 hover:bg-gray-600 cursor-pointer transition ease-in duration-100 uppercase rounded-full hover:text-white focus:outline-none"
		>
			<Icon name="arrow_back_ios" klass="text-white" size="24px" />
		</button>
	</div>
	<div class="overflow-hidden relative" bind:this={container}>
		<div class="flex relative min-h-[200px]" style:right={$offset + 'px'} bind:this={scroller}>
			<slot />
		</div>
	</div>
	<div class="absolute inset-y-1/2 right-0 z-10">
		<button
			on:click={goRight}
			style:transform="translate(50%, -50%)"
			class="flex text-center items-center p-3 bg-gray-800 hover:bg-gray-600 cursor-pointer transition ease-in duration-100 uppercase rounded-full hover:text-white focus:outline-none"
		>
			<Icon name="arrow_forward_ios" klass="text-white" size="24px" />
		</button>
	</div>
</div>
