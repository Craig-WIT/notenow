import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		user: locals.session?.user ?? null
	};
}) satisfies LayoutServerLoad;
