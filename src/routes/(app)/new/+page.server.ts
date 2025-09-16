import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.session) {
		redirect(307, '/signin');
	}
	return {};
}) satisfies PageServerLoad;

export const actions = {
	createWorkspace: async ({ request }) => {
		console.log(await request.formData());
	}
} satisfies Actions;
