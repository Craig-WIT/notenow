import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { roles, workspaceAccess, workspaces } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { workspaceSchema } from '$lib/schemas/workspace-schema';
import { requireLogin } from '$lib/server/db/utils';

export const load = (async () => {
	requireLogin();
	return {
		form: await superValidate(zod(workspaceSchema))
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(workspaceSchema));

		if (!locals.session) {
			return message(form, 'Unauthorized', { status: 401 });
		}

		if (!form.valid) {
			return fail(400, { form });
		}

		const { name } = form.data;

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
				if (!locals.session?.user.id) throw new Error('Unauthorised');
				await tx.insert(workspaceAccess).values({
					userId: locals.session?.user.id,
					workspaceId: newWorkspace.id,
					roleId: adminRole.id
				});
				return newWorkspace;
			});
		} catch (error) {
			// Report
			console.log(error);
			return message(form, 'An error has occured!', { status: 500 });

			//return fail(500, { message: 'An error has occurred!', name });
		}
		redirect(303, `/w/${_newWorkspace.id}`);
		// return { message: 'Workspace created successfully!' };
	}
} satisfies Actions;
