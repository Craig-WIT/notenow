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
</div>