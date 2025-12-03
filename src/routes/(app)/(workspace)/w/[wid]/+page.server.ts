import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { workspaces } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { getWorkspaceAccess, requireLogin } from '$lib/server/db/utils';
import { subject } from '@casl/ability';

export const load = (async ({ params }) => {
	const { user } = requireLogin();

	const { workspaceAccess, ability } = await getWorkspaceAccess({ user, workspaceId: params.wid });
	if (ability.cannot('read', subject('Workspace', { id: params.wid }))) {
		redirect(307, '/access-denied');
	}
	return { workspaceAccess };
}) satisfies PageServerLoad;

export const actions = {
	deleteWorkspace: async ({ locals, params }) => {
		if (!locals.session) {
			return fail(401, { message: 'Unauthorized' });
		}

		const { ability } = await getWorkspaceAccess({
			user: locals.session.user,
			workspaceId: params.wid
		});
		if (ability.cannot('delete', subject('Workspace', { id: params.wid }))) {
			return fail(401, { message: 'Unauthorized' });
		}

		try {
			const [deleteWorkspace] = await db
				.delete(workspaces)
				.where(eq(workspaces.id, params.wid))
				.returning({ id: workspaces.id });

			if (!deleteWorkspace) {
				throw new Error('Workspace delete failed.');
			}
		} catch {
			return fail(500, { message: 'An error has occured' });
		}

		redirect(303, '/app');
	}
} satisfies Actions;
