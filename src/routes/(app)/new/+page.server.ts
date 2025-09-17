import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.session) {
		redirect(307, '/signin');
	}
	return {};
}) satisfies PageServerLoad;

export const actions = {
	createWorkspace: async ({ request, locals }) => {
		if (!locals.session) {
			return fail(401, { message: 'Unauthorised' });
		}

		const data = await request.formData();
		const name = data.get('name');

		if (!name) {
			return fail(400, { message: 'Name is required' });
		}

		if (name.toString().length < 4) {
			return fail(400, { message: 'Name is too short' });
		}

		return {
			message: 'Workspace created successfully!'
		};
	}
} satisfies Actions;
