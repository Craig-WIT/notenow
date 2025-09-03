import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({fetch}) => {
    const postRes = await fetch('https://dummyjson.com/posts');
    const postResJSON = await postRes.json();
    return json(postResJSON, {status: postRes.status})
};

export const POST: RequestHandler = async ({request}) => {
    const post = await request.json();
    console.log(post);

    if(!post.title){
        error(400, 'No post title')
    }

    return json({id: crypto.randomUUID(), title: post.title});
};