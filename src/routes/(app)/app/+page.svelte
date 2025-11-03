<script lang="ts">
	import { FilePenLine, ShieldUser, StickyNote, View } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { handlePopoverLink } from '$lib/utils';

	let { data }: PageProps = $props();
</script>

{#snippet roleIcon(role: 'admin' | 'viewer' | 'editor')}
	<span class="tooltip" data-tip={role.charAt(0).toUpperCase() + role.slice(1)}>
		{#if role === 'admin'}
			<ShieldUser size="16" />
		{:else if role === 'viewer'}
			<View size="16" />
		{:else if role === 'editor'}
			<FilePenLine size="16" />
		{/if}
	</span>
{/snippet}

<div class="ml-6 h-full overflow-y-auto">
	<div class="container! mx-auto prose pb-10">
		<div>
			<h2 class="text-3xl">Welcome, {data.user?.name}</h2>
		</div>

		<h3>Your Workspaces</h3>
		{#if data.workspaces && data.workspaces.length > 0}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{#each data.workspaces as workspace}
					<a href="/w/{workspace.id}" class="no-underline">
						<div
							class="card flex flex-row items-center rounded-md border-1 border-base-300 bg-base-200 p-4 hover:bg-base-300"
						>
							<div class="avatar avatar-placeholder">
								<div class=" w-12 rounded-md bg-blue-700">
									<span class="text-xl text-white">{workspace.name[0].toUpperCase()}</span>
								</div>
							</div>
							<div class="ms-4 flex flex-1 items-center justify-between">
								<h4 class="me-2 mt-0 mb-0">{workspace.name}</h4>
								{@render roleIcon(workspace.role)}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div>
				<p class="text-center">No Workspaces Yet</p>
				<div class="text-end">
					<a
						onclick={handlePopoverLink('newWorkspace')}
						href="/new"
						class="btn rounded-md btn-primary">Create a Workspace</a
					>
				</div>
			</div>
		{/if}
		{#if data.recentPages && data.recentPages.length > 0}
			<h3>Recent Pages</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{#each data.recentPages as page}
					<a href="/p/{page.id}" class="no-underline">
						<div
							class="card flex h-full justify-between rounded-md border-1 border-base-300 bg-base-200 p-4 hover:bg-base-300"
						>
							<div>
								<StickyNote size="22" class="mb-3" />
								<h4 class="mt-0 mb-0">{page.title}</h4>
								<p class="mt-2 mb-0 text-sm font-normal italic opacity-70">
									Workspace: {page.workspace}
								</p>
							</div>
							<div class="mt-6 flex items-center justify-between gap-1">
								{@render roleIcon(page.role)}
								<span class="text-sm font-normal opacity-70">{page.updatedAt.toLocaleString()}</span
								>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
		{#if data.recentNotes && data.recentNotes.length > 0}
			<h3>Recent Notes</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each data.recentNotes as note}
					<div
						class="card flex h-full justify-between rounded-md border-1 border-base-300 bg-base-200 p-4"
					>
						<blockquote class="mt-0 mb-0">
							{note.content.slice(0, 100)}...
						</blockquote>
						<p class="mt-6 mb-0 flex items-start gap-2 text-sm font-normal">
							<StickyNote size="18" class="mt-0.5" /> Page:
							<a href="/p/{note.pageId}">{note.pageTitle}</a>
						</p>
						<p class="mt-6 mb-0 text-sm font-normal italic">Workspace: {note.workspaceName}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
