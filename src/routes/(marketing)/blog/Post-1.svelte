<script lang="ts">
    import type {Post} from "$lib/types"

    let {post}: {post: Post} = $props();
</script>

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