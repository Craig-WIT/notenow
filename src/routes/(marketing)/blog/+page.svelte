<script lang="ts">
	import { page } from '$app/state';
	import { POSTS_PER_PAGE } from '$lib/constants.js';
	import type { PostsResponse } from '$lib/types.js';

	// import type { PageProps } from './$types';

	let { data } = $props();

    let posts = $derived(data.posts.posts)

    let currentPage = $derived(+(page.url.searchParams.get('page') ?? 1))

    let isLoading = $state(false)

    let firstLoadedPage = $derived(currentPage)

    let lastLoadedPage = $derived(currentPage)

    async function loadMorePosts () {
        isLoading = true;
        const newPosts = await fetch(
            `https://dummyjson.com/posts?limit=${POSTS_PER_PAGE}&skip=${(lastLoadedPage) * POSTS_PER_PAGE}`
        );
        const newPostsJSON: PostsResponse = await newPosts.json();
        console.log(newPostsJSON)
        posts = [...posts, ...newPostsJSON.posts];
        lastLoadedPage = newPostsJSON.skip / POSTS_PER_PAGE + 1
        isLoading = false
    }
    
    async function loadPreviousPosts () {
        isLoading = true;
        const newPosts = await fetch(
            `https://dummyjson.com/posts?limit=${POSTS_PER_PAGE}&skip=${(firstLoadedPage - 2) * POSTS_PER_PAGE}`
        );
        const newPostsJSON: PostsResponse = await newPosts.json();
        console.log(newPostsJSON)
        posts = [...newPostsJSON.posts, ...posts];
        firstLoadedPage = newPostsJSON.skip / POSTS_PER_PAGE + 1
        isLoading = false
    }
</script>

<div class="container mx-auto px-4 py-8">
	<section class="mb-16 text-center">
		<h1 class="mb-3 text-4xl font-bold md:text-5xl">{data.title}</h1>
	</section>

    <div class="flex no-js:hidden mt-10 justify-center px-4 py-8">
        {#if firstLoadedPage !== 1}
            <button disabled={isLoading} class="btn btn-outline" onclick={loadPreviousPosts}>Load Previous</button>
        {/if}
    </div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as post}
            <data.component {post} />
		{/each}
	</div>
    <div class="flex no-js:hidden mt-10 justify-center">

        {#if Math.ceil(data.posts.total / POSTS_PER_PAGE) !== lastLoadedPage}
            <button disabled={isLoading} class="btn btn-outline" onclick={loadMorePosts}>Load More</button>
        {:else}
        <p>
            No more posts to load
        </p>
        {/if}
    </div>
    <div class="no-js:flex hidden justify-end">
		<div class="join mt-10 grid w-full max-w-[500px] grid-cols-2 gap-4">
			{#if currentPage > 1}
				<a href="/blog?page={currentPage - 1}" class="join-item btn btn-outline">Previous page</a>
			{/if}
			{#if Math.ceil(data.posts.total / POSTS_PER_PAGE) !== currentPage}
				<a href="/blog?page={currentPage + 1}" class="join-item btn btn-outline">Next</a>
			{/if}
		</div>
	</div>
</div>