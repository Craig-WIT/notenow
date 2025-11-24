import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.session) {
		redirect(307, 'signin');
	}
	// console.log(locals.session);
	// await parent();
	// load page data
	return {};
}) satisfies PageServerLoad;
