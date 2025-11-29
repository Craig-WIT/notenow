import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { roles, workspaceAccess, workspaces } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { requireLogin } from '$lib/server/db/utils';

export const load = (async ({ params }) => {
	// TODO: Check user is logged in and workspace access etc
	const { user } = requireLogin();
	const [wsAccess] = await db
		.select({ workspaceid: workspaceAccess.workspaceId, role: roles.name, roleId: roles.id })
		.from(workspaceAccess)
		.innerJoin(roles, eq(workspaceAccess.roleId, roles.id))
		.where(and(eq(workspaceAccess.workspaceId, params.wid), eq(workspaceAccess.userId, user.id)))
		.limit(1);

	console.log(wsAccess);
	return {};
}) satisfies PageServerLoad;

export const actions = {
	deleteWorkspace: async ({ locals, params }) => {
		if (!locals.session) {
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

		//TODO check authorisation to delete
	}
} satisfies Actions;
