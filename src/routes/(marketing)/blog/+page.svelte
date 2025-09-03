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
			<a href="/blog/{post.id}" class="no-underline">
				<div
					class="card bg-base-200 hover:bg-base-300 mb-4 flex h-full flex-col justify-between rounded-md p-4"
				>
					<div>
						<h5 class=" mb-3 text-2xl font-bold">{post.title}</h5>
						<p class="text-md opacity-80">{post.body.slice(0, 200)}...</p>
					</div>
					<div class="-mx-1 mt-4 flex">
						{#each post.tags as tag}
							<span class="badge badge-md badge-accent m-1 rounded-md">{tag}</span>
						{/each}
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>