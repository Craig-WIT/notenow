import type { LayoutServerLoad } from './$types';

export const load = (async ({cookies}) => {
    const token = cookies.get('token')
    return {
        user: token ? {name: 'John', id: 1} : null
    };
}) satisfies LayoutServerLoad;