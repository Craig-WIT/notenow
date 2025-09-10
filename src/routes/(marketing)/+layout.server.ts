import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {
    return {
        user: locals.session.user,
        marketingLayoutData: 'Some data on marketing'
    };
}) satisfies LayoutServerLoad;