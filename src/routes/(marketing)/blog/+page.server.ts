import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { PostsResponse } from '$lib/types';

export const load = (async ({fetch}) => {
    
const postRes = await fetch('/api/posts');
if(!postRes.ok) {
    error(postRes.status, 'An error has occured!')
}

    return {
        title: "The Blog",
        posts: (await postRes.json()) as PostsResponse
    };
}) satisfies PageServerLoad;