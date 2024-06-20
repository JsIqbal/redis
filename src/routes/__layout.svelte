<!-- <script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import { f } from '$lib/fetch';

	let lastHref = '';
	export const load: Load = async ({ fetch, url }) => {
		if (!browser) {
			return {};
		}

		if (lastHref === '') {
			lastHref = url.href;
			return {};
		}
		if (lastHref === url.href) {
			return {};
		}
		lastHref = url.href;

		const [data] = await f('/sessions', {}, fetch);
		session.set(data);

		return {};
	};
</script> -->
<script>
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import {
		Chart,
		ArcElement,
		LineElement,
		BarElement,
		PointElement,
		BarController,
		BubbleController,
		DoughnutController,
		LineController,
		PieController,
		PolarAreaController,
		RadarController,
		ScatterController,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale,
		Decimation,
		Filler,
		Legend,
		Title,
		Tooltip,
		SubTitle
	} from 'chart.js';
	import 'chartjs-adapter-luxon';

	Chart.register(
		ArcElement,
		LineElement,
		BarElement,
		PointElement,
		BarController,
		BubbleController,
		DoughnutController,
		LineController,
		PieController,
		PolarAreaController,
		RadarController,
		ScatterController,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale,
		Decimation,
		Filler,
		Legend,
		Title,
		Tooltip,
		SubTitle
	);
</script>

<Header />
<div style:min-height="80vh" class="container mx-auto">
	<slot />
</div>
<Footer />
