<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="container mx-auto px-4 py-8">
	<div class="card bg-base-200 rounded-md p-10">
		<div class="mb-16">
			<h1 class=" mb-10 text-5xl font-bold">{data.post.title}</h1>
			<p class="text-lg">{data.post.body}</p>
		</div>
		<div class="-mx-1 mt-4 flex">
			{#each data.post.tags as tag}
				<span class="badge badge-md badge-accent m-1 rounded-md">{tag}</span>
			{/each}
		</div>
	</div>


	{#await data.comments}
		{#each { length: 4 }}
				<div class="card border-base-300 mt-4 rounded-md border-1 p-4">
					<div class="skeleton mb-2 h-4 w-full rounded-md"></div>
					<div class="skeleton mb-2 h-4 w-full rounded-md"></div>
					<div class="skeleton mb-2 h-4 w-50 rounded-md"></div>
				</div>
			{/each}
		{:then comments}
		{#each comments as comment}
			<div class="card border-base-300 mt-4 rounded-md border-1 p-4">
				<p class="mb-3 text-lg">{comment.body}</p>
				<p class="text-sm">{comment.user.fullName}</p>
			</div>
		{/each}
	{/await}
</div>