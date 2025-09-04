import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Post } from '$lib/types';

export const load = (async ({params, fetch}) => {
    
    async function fetchPost() {
        console.log('Fetch post started')
        const postRes = await fetch(`https://dummyjson.com/posts/${params.id}`)

        if(postRes.status !== 200) {
            error(postRes.status, 'Failed to load post')
        }

        const postResJSON: Post = await postRes.json()

        console.log('Fetch post ended')

        return postResJSON

    }

    return {
        post: await fetchPost()
    };
}) satisfies PageLoad;