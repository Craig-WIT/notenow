import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const user = locals.session?.user ?? null;

	return { user };
}) satisfies LayoutServerLoad;
