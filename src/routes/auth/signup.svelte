<script lang="ts">
	import { goto } from '$app/navigation';
	import { post, f } from '$lib/fetch';
	import { session } from '$app/stores';

	let username = '';
	let password = '';
	let err = null;

	async function onSubmit() {
		let _data: any;
		[_data, err] = await post('/auth/signup', { username, password });

		if (err) {
			return;
		}

		const [data] = await f('/sessions');
		session.set(data);

		goto('/dashboard/items');
	}
</script>

<div
	class="flex flex-col mx-auto items-center max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10"
>
	<div class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
		Create a new account
	</div>
	<span
		class="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400"
	>
		Already have an account ?
		<a href="/auth/signin" class="text-sm text-blue-500 underline hover:text-blue-700"> Sign in </a>
	</span>
	<div class="p-6 mt-8">
		<form on:submit|preventDefault={onSubmit}>
			<div class="flex flex-col mb-2">
				<div class="relative">
					<input
						bind:value={username}
						type="text"
						id="create-account-pseudo"
						class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						name="username"
						placeholder="User Name"
					/>
				</div>
			</div>
			<div class="flex flex-col mb-2">
				<div class=" relative ">
					<input
						bind:value={password}
						type="password"
						id="password"
						class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						placeholder="Password"
					/>
				</div>
			</div>

			{#if err}
				<div class="my-4 text-red-600">
					{err}
				</div>
			{/if}

			<div class="flex w-full my-4">
				<button
					type="submit"
					class="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
				>
					Sign Up
				</button>
			</div>
		</form>
	</div>
</div>
