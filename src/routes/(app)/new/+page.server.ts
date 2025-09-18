import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { roles, workspaceAccess, workspaces } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = (async ({ locals }) => {
	if (!locals.session) {
		redirect(307, '/signin');
	}
	return {};
}) satisfies PageServerLoad;

export const actions = {
	createWorkspace: async ({ request, locals }) => {
		if (!locals.session) {
			return fail(401, { message: 'Unauthorized', name: '' });
		}
		const data = await request.formData();
		const name = data.get('name');
		if (!name) {
			return fail(400, { message: 'Name is Required!', name: '' });
		}
		if (name.toString().length < 4) {
			return fail(400, { message: 'Name is too short!', name });
		}
		let _newWorkspace;
		try {
			_newWorkspace = await db.transaction(async (tx) => {
				const [newWorkspace] = await tx
					.insert(workspaces)
					.values({
						name: name.toString()
					})
					.returning({ id: workspaces.id });
				if (!newWorkspace) throw new Error('Workspace creation failed!');
				const [adminRole] = await tx.select().from(roles).where(eq(roles.name, 'admin'));
				if (!adminRole) throw new Error('Admin role not found');
				await tx.insert(workspaceAccess).values({
					userId: locals.session.user.id,
					workspaceId: newWorkspace.id,
					roleId: adminRole.id
				});
				return newWorkspace;
			});
		} catch (error) {
			// Report
			console.log(error);
			return fail(500, { message: 'An error has occurred!' });
		}
		redirect(303, `/w/${_newWorkspace.id}`);
		// return { message: 'Workspace created successfully!' };
	}
} satisfies Actions;
