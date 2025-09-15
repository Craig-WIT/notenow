import type { PageServerLoad } from './$types';

export const load = (async () => {
    // TODO: Check user is logged in and page access etc
    return {};
}) satisfies PageServerLoad;