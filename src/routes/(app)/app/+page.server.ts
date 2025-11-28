import type { PageServerLoad } from './$types';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { requireLogin } from '$lib/server/db/utils';

export const load = (async () => {
	const session = requireLogin();
	console.log(session.user);

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
