<script lang="ts">
	import type { LayoutProps } from './$types';
	import { Settings, StickyNote, User } from '@lucide/svelte';

	import { page } from '$app/state';
	import FormMessage from '$components/FormMessage.svelte';
	import { handlePopoverLink } from '$lib/utils';
	import defineAbilityFor from '$lib/ability';
	import { subject } from '@casl/ability';

	let { data, children }: LayoutProps = $props();

	let ability = $derived(defineAbilityFor(data.user, data.workspaceAccess, data.pageAccess));
</script>

<div class="flex h-full">
	<div class="flex w-65 flex-col border-r border-base-300 bg-base-100">
		<div class="flex flex-row items-center border-b-1 border-b-base-300 bg-base-100 p-4">
			<div class="avatar avatar-placeholder">
				<div class=" w-10 rounded-md bg-blue-700">
					<span class="text-lg text-white">{data.workspace.name[0].toUpperCase()}</span>
				</div>
			</div>
			<div class="ms-4 flex-1">
				<h4 class="me-2 mt-0 mb-0 line-clamp-1">{data.workspace.name}</h4>
				<h3 class="me-2 mt-0 mb-0 line-clamp-1">{data.workspaceAccess.role.toUpperCase()}</h3>
			</div>
			<div>
				{#if ability.can('update', subject('Workspace', data.workspace))}
					<a
						onclick={handlePopoverLink('editWorkspace')}
						class="btn rounded-md btn-sm"
						href="/w/{data.workspace.id}/edit">Edit</a
					>
				{/if}
			</div>
		</div>
		<div class="flex-1 overflow-y-auto p-2">
			<ul class="menu m-0 mt-2 w-full rounded-box bg-transparent p-0">
				<li>
					<a class="rounded-md" href="/w/{data.workspace.id}"><StickyNote size="22" /> Pages</a>
				</li>
				{#if ability.can('manage', subject('Workspace', data.workspace))}
					<li>
						<a class="rounded-md" href="/w/{data.workspace.id}/members"
							><User size="22" /> Members</a
						>
					</li>
				{/if}
				{#if ability.can('update', subject('Workspace', data.workspace)) || ability.can('delete', subject('Workspace', data.workspace))}
					<li>
						<a class="rounded-md" href="/w/{data.workspace.id}/settings"
							><Settings size="22" />Settings</a
						>
					</li>
				{/if}
			</ul>
			<ul class="menu mt-4 w-full rounded-box bg-transparent p-0">
				<li class="menu-title">Pages</li>
				{#each data.pages as _page}
					<li>
						<a
							class={['rounded-md', page.params.pid === _page.id && 'bg-base-300']}
							href="/p/{_page.id}">{_page.title}</a
						>
					</li>
				{:else}
					<li>
						<p class="cursor-default hover:bg-transparent! active:bg-transparent!">No Pages Yet!</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div class="prose max-h-full max-w-none flex-1 overflow-y-auto p-6">
		{#if page.form?.message}
			<FormMessage formMessage={page.form?.message} />
		{/if}
		{@render children()}
	</div>
</div>
