import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    return {
        marketingLayoutData: 'Some data on marketing'
    };
}) satisfies LayoutServerLoad;