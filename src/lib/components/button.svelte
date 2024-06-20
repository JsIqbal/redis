<script lang="ts">
	import c from 'classnames';

	export let iconOutline = false;
	export let loading = false;
	export let icon = '';
	export let klass = '';
	export let fadeIn = false;
	export let disabled = false;
	export let role = 'primary';

	const common = c(fadeIn ? 'opacity-30 hover:opacity-100' : '', { 'opacity-75': loading });

	const textButton = c(
		common,
		{
			'bg-green-500 hover:bg-green-700 disabled:bg-green-300': role === 'success',
			'bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300': role === 'primary',
			'bg-gray-500 hover:bg-gray-700 disabled:bg-gray-300': role === 'secondary',
			'bg-red-500 hover:bg-red-700 disabled:bg-red-300': role === 'danger',
			'cursor-not-allowed': disabled
		},
		`py-2 px-4 flex justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-full`,
		'flex items-center align-center',
		klass
	);

	$: iconKlasses = c(
		'text-center mr-1',
		{
			'animate-spin': loading
		},
		iconOutline ? 'material-icons-outlined' : 'material-icons'
	);
</script>

<button disabled={disabled || loading} on:click type="button" class={textButton}>
	{#if icon}
		<span style:font-size="20px" class={iconKlasses}>{icon}</span>
	{/if}
	<slot />
</button>
