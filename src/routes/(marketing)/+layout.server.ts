import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load = (async ({ locals }) => {
	return {
		user: locals.session?.user ?? null
	};
}) satisfies LayoutServerLoad;
