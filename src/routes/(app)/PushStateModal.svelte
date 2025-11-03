<script>
	// @ts-nocheck

	import { page } from '$app/state';
	import AddWorkspace from './new/+page.svelte';
	import EditWorkspace from './(workspace)/w/[wid]/edit/+page.svelte';
	import { fly } from 'svelte/transition';
</script>

{#if page.state.addWorkspaceData}
	<dialog
		id="add-ws-modal"
		class="modal-open modal transition-none"
		transition:fly={{ duration: 200, y: -50 }}
	>
		<div class="modal-box rounded-md bg-base-200">
			<button
				onclick={() => window.history.back()}
				class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">X</button
			>
			<h3 class="text-lg font-bold">Add a New Workspace</h3>
			<div class="mt-4">
				<AddWorkspace data={page.state.addWorkspaceData} form={null} params={page.params} />
			</div>
		</div>
	</dialog>
{/if}

{#if page.state.editWorkspaceData}
	<dialog
		id="add-ws-modal"
		class="modal-open modal transition-none"
		transition:fly={{ duration: 200, y: -50 }}
	>
		<div class="modal-box rounded-md bg-base-200">
			<button
				onclick={() => window.history.back()}
				class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">X</button
			>
			<h3 class="text-lg font-bold">Edit Workspace</h3>
			<div class="mt-4">
				<EditWorkspace data={page.state.editWorkspaceData} form={null} params={page.params} />
			</div>
		</div>
	</dialog>
{/if}
