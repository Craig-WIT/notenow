import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {
    return {
        user: locals.user,
        marketingLayoutData: 'Some data on marketing'
    };
}) satisfies LayoutServerLoad;