<script lang="ts">
	import { Edit, FilePlus2, Heart, MessagesSquare, Share, Sparkles } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="mb-10">
	<div class="flex items-start justify-between">
		<div class="flex-1">
			<h2 class="mt-0 mb-2 text-4xl">{data.page.title}</h2>
			<div>
				<span>Created at: </span><time datetime={data.page.createdAt.toISOString()}
					>{data.page.createdAt.toLocaleString()}</time
				>
			</div>
		</div>
		<div>
			<!-- TODO: Check if user can update page -->
			<a href="/p/{data.page.id}/edit" class="btn btn-outline btn-sm ms-4"
				><Edit size="16" /> Edit</a
			>
			<!-- TODO: Add delete page form -->
		</div>
	</div>
	<div class="mt-6">
		<!-- TODO: Check if user can update page -->
		<a href="/p/{data.page.id}/note/new" class="btn btn-primary btn-sm me-1"
			><FilePlus2 size="16" /> New Note</a
		>
		<!-- TODO: Check if user can manage page -->
		<a href="" class="btn btn-primary btn-sm me-1"><Share size="16" /> Share</a>
		<a href="" class="btn btn-primary btn-sm me-1"><Sparkles size="16" /> Summarize</a>
	</div>
</div>

<div class="max-w-[900px]">
	{#await data.notes}
		{#each { length: 4 }}
			<div class="card bg-base-200 mb-4 rounded-md p-4">
				<div class="skeleton mb-2 h-8 w-full rounded-md"></div>
				<div class="skeleton mb-2 h-4 w-full rounded-md"></div>
				<div class="skeleton mb-2 h-4 w-full rounded-md"></div>
				<div class="skeleton mb-2 h-4 w-full rounded-md"></div>
			</div>
		{/each}
	{:then notes}
		{#each notes as note}
			<div class="card bg-base-200 mb-4 rounded-md p-4">
				<div
					class="group border-b-base-100 -m-4 mb-4 flex items-center justify-between border-b-1 px-4 py-2"
				>
					<div>
						<a href="" class="btn btn-outline border-base-300 btn-sm"
							><Sparkles size="16" /> Summarize</a
						>
					</div>
					<div class="flex gap-3">
						<!-- TODO: Check if user can update note -->
						<a href="/p/{data.page.id}/note/{note.id}/edit" title="Edit" class="btn p-1"
							><Edit size="16" /> <span class="sr-only">Edit</span>
						</a>
						<!-- TODO: Add delete note form -->
					</div>
				</div>
				<div class="bg-base-300 rounded-md p-4">
					<!-- TODO: Render the content as markdown -->
					<p>{note.content}</p>
				</div>
				<p class="font-bold">Posted By: {note.username}</p>
				<div class="flex justify-end gap-2">
					<a href="" class="btn btn-outline btn-sm"><MessagesSquare size="16" /> Comments</a>
					<a href="" class="btn btn-outline btn-sm"><Heart size="16" /> Like</a>
				</div>
			</div>
		{/each}
	{:catch error}
		<p>Failed to load notes: {error.message}</p>
	{/await}
</div>