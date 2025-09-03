import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { PostsResponse } from '$lib/types';
import { POSTS_PER_PAGE } from '$lib/constants';

export const load = (async ({fetch, url}) => {
const page = +(url.searchParams.get('page') || 1)
const postRes = await fetch(`https://dummyjson.com/posts?limit=${POSTS_PER_PAGE}&skip=${(page - 1) * POSTS_PER_PAGE}`);
if(!postRes.ok) {
    error(postRes.status, 'An error has occured!')
}

    return {
        title: "The Blog",
        posts: (await postRes.json()) as PostsResponse,
        postType: Math.random() > 0.5 ? 1 : 2
    };
}) satisfies PageServerLoad;