import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	console.log('root layout load');
	return {
		user: locals.session?.user
	};
}) satisfies LayoutServerLoad;
