<script lang="ts">
	import { Chart } from 'chart.js';

	type Bid = { createdAt: string; amount: number };

	export let bidHistory: Bid[] = [];
	let canvas: HTMLCanvasElement | null = null;
	let chart: any;

	$: context = bidHistory && canvas && canvas.getContext('2d');
	$: createChart(context);

	function createChart(ctx: RenderingContext) {
		if (!ctx) {
			return;
		}

		const labels = bidHistory.map(() => '');
		const data = bidHistory.map(({ amount }) => amount);

		if (labels.length < 9) {
			labels.unshift('');
			data.unshift(0);
		}

		if (chart) {
			chart.data.labels = labels;
			chart.data.datasets[0].data = data;
			chart.update();
			return;
		}

		chart = new Chart(context, {
			type: 'line',
			options: {
				responsive: true,
				aspectRatio: 5,
				plugins: {
					legend: {
						display: false
					}
				}
			},
			data: {
				labels: labels,
				datasets: [
					{
						label: '',
						data: data,
						borderColor: 'rgb(75, 192, 192)'
					}
				]
			}
		});
	}
</script>

<div class="relative">
	{#if !bidHistory.length}
		<div class="absolute inset-0 flex justify-center items-center text-3xl text-slate-500">
			No Bids Yet
		</div>
	{/if}
	<canvas bind:this={canvas} />
</div>
