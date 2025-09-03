import type { PageLoad } from './$types';

export const load = (async ({data}) => {
    const module = data.postType === 1 ? await import('./Post-1.svelte') : await import('./Post-2.svelte')
    return {
        ...data,
        component: module.default,
    };
}) satisfies PageLoad;