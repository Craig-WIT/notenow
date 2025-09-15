<script lang="ts">
	import type { PageProps } from './$types';
	import { StickyNote } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<h3>Pages</h3>
{#if data.pages.length === 0}
	<div class="text-center">
		<p>No Pages Yet</p>
		<div class="text-end">
			<!-- TODO: Check if the user can create pages -->
			<a href="/w/{data.workspace.id}/new" class="btn btn-primary rounded-md">Create a Page</a>
		</div>
	</div>
{:else}
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each data.pages as page}
			<a href="/p/{page.id}" class="no-underline">
				<div
					class="card bg-base-200 hover:bg-base-300 border-base-300 flex h-full justify-between rounded-md border-1 p-4"
				>
					<div>
						<StickyNote size="22" class="mb-3" />
						<h4 class="mt-0 mb-0">{page.title}</h4>
					</div>
				</div>
			</a>
		{/each}
	</div>
{/if}