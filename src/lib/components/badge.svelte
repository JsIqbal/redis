<script lang="ts">
	export let role = 'success';
</script>

<span
	class:text-green-900={role === 'success'}
	class:text-gray-900={role === 'secondary'}
	class:text-red-900={role === 'danger'}
	class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
>
	<span
		class:bg-green-300={role === 'success'}
		class:bg-gray-300={role === 'secondary'}
		class:bg-red-300={role === 'danger'}
		class="absolute inset-0 opacity-50 rounded-full"
	/>
	<span class="relative"> <slot /> </span>
</span>
