<script lang="ts">
	import { CircleCheck, CircleX } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import FormMessage from '$components/FormMessage.svelte';

	let { data, form }: PageProps = $props();
</script>

<div class="card prose w-full rounded-md border-1 border-base-300 bg-base-200">
	<div class="card-body">
		{#if form?.message}
			<FormMessage message={form?.message} />
		{/if}
		<form method="POST" action="?/createWorkspace">
			<label for="ws-name">Name</label>
			<input id="ws-name" name="name" class="input w-full rounded-md bg-base-200" type="text" />
			<button class="btn mt-4 w-full rounded-md btn-primary" type="submit">Submit</button>
		</form>
	</div>
</div>
