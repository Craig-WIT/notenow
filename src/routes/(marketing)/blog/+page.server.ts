import type { PageServerLoad } from './$types';

export const load = (async ({parent}) => {
    const parentData = await parent();
    console.log('Blog Route Universal Load')
    return {
        title: "The Blog",
        count: 10,
        parentData: parentData,
    };
}) satisfies PageServerLoad;