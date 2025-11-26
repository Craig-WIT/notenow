import type { PageServerLoad } from './$types';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const load = (async ({ locals }) => {
	if (!locals.session) {
		redirect(307, 'signin');
	}
	// console.log(locals.session);
	// await parent();
	// load page data
	return {};
}) satisfies PageServerLoad;

export const actions = {
	logout: async ({ request, cookies, locals }) => {
		try {
			const res = await auth.api.signOut({
				headers: request.headers,
				asResponse: true
			});
			if (res.status === 200) {
				cookies.delete('better-auth.session_token', {
					path: '/'
				});
				locals.session = null;
			} else {
				return fail(400, { message: 'Error logging out' });
			}
		} catch {
			return fail(400, { message: 'Error logging out' });
		}
		redirect(303, '/signin');
	}
} satisfies Actions;
