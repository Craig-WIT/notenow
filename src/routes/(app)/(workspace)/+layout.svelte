<script lang="ts">
	import type { LayoutProps } from './$types';
	import { Settings, StickyNote, User } from '@lucide/svelte';

	import { page } from '$app/state';

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex h-full">
	<div class="bg-base-100 border-base-300 flex w-65 flex-col border-r">
		<div class="bg-base-100 border-b-base-300 flex flex-row items-center border-b-1 p-4">
			<div class="avatar avatar-placeholder">
				<div class=" w-10 rounded-md bg-blue-700">
					<span class="text-lg text-white">{data.workspace.name[0].toUpperCase()}</span>
				</div>
			</div>
			<div class="ms-4 flex-1">
				<h4 class="me-2 mt-0 mb-0 line-clamp-1">{data.workspace.name}</h4>
				<!-- TODO: Add role -->
				<p class="text-sm opacity-70">TODO</p>
			</div>
			<div>
				<!-- TODO: CHECK IF USER CAN UPDATE WORKSPACE -->
				<a class="btn btn-sm rounded-md" href="/w/{data.workspace.id}/edit">Edit</a>
			</div>
		</div>
		<div class="flex-1 overflow-y-auto p-2">
			<ul class="menu rounded-box m-0 mt-2 w-full bg-transparent p-0">
				<li>
					<a class="rounded-md" href="/w/{data.workspace.id}"><StickyNote size="22" /> Pages</a>
				</li>
				<!-- TODO: CHECK IF USER CAN MANAGE WORKSPACE -->
				<li>
					<a class="rounded-md" href="/w/{data.workspace.id}/members"><User size="22" /> Members</a>
				</li>
				<!-- TODO: CHECK IF USER CAN CHANGE WORKSPACE SETTINGS -->
				<li>
					<a class="rounded-md" href="/w/{data.workspace.id}/settings"
						><Settings size="22" />Settings</a
					>
				</li>
			</ul>
			<ul class="menu rounded-box mt-4 w-full bg-transparent p-0">
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
		{@render children()}
	</div>
</div>