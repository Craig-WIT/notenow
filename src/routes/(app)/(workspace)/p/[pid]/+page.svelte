<script lang="ts">
	import { Edit, FilePlus2, Heart, MessagesSquare, Share, Sparkles } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import defineAbilityFor from '$lib/ability';
	import { subject } from '@casl/ability';

	let { data }: PageProps = $props();

	let ability = defineAbilityFor(data.user, data.workspaceAccess, data.pageAccess);
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
			{#if ability.can('update', subject('Page', { id: data.page.id }))}
				<a href="/p/{data.page.id}/edit" class="btn ms-4 btn-outline btn-sm"
					><Edit size="16" /> Edit</a
				>
			{/if}
			<!-- TODO: Add delete page form -->
		</div>
	</div>
	<div class="mt-6">
		{#if ability.can('update', subject('Page', { id: data.page.id }))}
			<a href="/p/{data.page.id}/note/new" class="btn me-1 btn-sm btn-primary"
				><FilePlus2 size="16" /> New Note</a
			>
		{/if}
		{#if ability.can('manage', subject('Page', { id: data.page.id }))}
			<a href="" class="btn me-1 btn-sm btn-primary"><Share size="16" /> Share</a>
		{/if}
		<a href="" class="btn me-1 btn-sm btn-primary"><Sparkles size="16" /> Summarize</a>
	</div>
</div>

<div class="max-w-[900px]">
	{#await data.notes}
		{#each { length: 4 }}
			<div class="card mb-4 rounded-md bg-base-200 p-4">
				<div class="mb-2 h-8 w-full skeleton rounded-md"></div>
				<div class="mb-2 h-4 w-full skeleton rounded-md"></div>
				<div class="mb-2 h-4 w-full skeleton rounded-md"></div>
				<div class="mb-2 h-4 w-full skeleton rounded-md"></div>
			</div>
		{/each}
	{:then notes}
		{#each notes as note}
			<div class="card mb-4 rounded-md bg-base-200 p-4">
				<div
					class="group -m-4 mb-4 flex items-center justify-between border-b-1 border-b-base-100 px-4 py-2"
				>
					<div>
						<a href="" class="btn border-base-300 btn-outline btn-sm"
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
				<div class="rounded-md bg-base-300 p-4">
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
