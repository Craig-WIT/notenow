<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let isDeleting = $state(false);
</script>

<h3>Settings</h3>
<a href="/w/{data.workspace.id}/edit" class="btn">Edit Workspace</a>
<form
	action="/w/{data.workspace.id}?/deleteWorkspace"
	method="POST"
	use:enhance={() => {
		isDeleting = true;
		return ({ result }) => {
			if (result.type === 'redirect') {
				toast.success(`Workspace '${data.workspace.name}' Deleted`);
				applyAction(result);
			} else if (result.type === 'failure') {
				toast.error('An error has occurred');
			} else {
				applyAction(result);
			}
			isDeleting = false;
		};
	}}
>
	<button class="btn mt-4 bg-red-700">Delete Workspace</button>
</form>
