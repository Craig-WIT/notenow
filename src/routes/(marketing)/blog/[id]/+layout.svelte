<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<div class="container mx-auto px-4 py-8">
	<div class="container mx-auto px-4 py-8">
		<div class="flex gap-4">
			<div class="flex-[2.5]">
				{@render children()}
			</div>
			<div class="flex-1">
				{#each data.morePosts.posts as post}
					<a href="/blog/{post.id}" class="no-underline">
						<div class="card bg-base-200 hover:bg-base-300 mb-4 rounded-md p-4">
							<div>
								<h5 class=" mb-3 text-2xl font-bold">{post.title}</h5>
								<p class="text-md text-md opacity-80">{post.body.slice(0, 100)}...</p>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>