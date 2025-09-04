import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Post, PostComment } from '$lib/types';

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

    async function fetchComments() {
        console.log('Fetch comments started')
        const commentsRes = await fetch(`https://dummyjson.com/posts/${params.id}/comments`)

        const commentsArray: PostComment[] = commentsRes.ok ? (await commentsRes.json()).comments : []

        console.log('Fetch comments ended')

        return commentsArray
    }
    
    return {
        comments: fetchComments(),
        post: await fetchPost()
    };
}) satisfies PageServerLoad;