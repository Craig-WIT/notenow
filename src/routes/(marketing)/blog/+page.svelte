<script lang="ts">
	// import type { PageProps } from './$types';

	let { data } = $props();
</script>

<div class="container mx-auto px-4 py-8">
	<section class="mb-16 text-center">
		<h1 class="mb-3 text-4xl font-bold md:text-5xl">{data.title}</h1>
	</section>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.posts.posts as post}
            <data.component {post} />
		{/each}
	</div>
</div>