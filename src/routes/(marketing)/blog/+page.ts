import type { PageLoad } from './$types';

export const load = (async ({data}) => {
    return {
        ...data,
        x: 1
    };
}) satisfies PageLoad;