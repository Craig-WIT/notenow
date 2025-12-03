import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { workspaces } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { workspaceSchema } from '$lib/schemas/workspace-schema';
import { requireLogin } from '$lib/server/db/utils';
import { getWorkspaceAccess } from '$lib/server/db/utils';
import { subject } from '@casl/ability';

export const load = (async ({ params }) => {
	// TODO: Auth: Logged in and can update workspace

	const { user } = requireLogin();

	const { workspaceAccess, ability } = await getWorkspaceAccess({ user, workspaceId: params.wid });
	if (ability.cannot('update', subject('Workspace', { id: params.wid }))) {
		redirect(307, '/access-denied');
	}

	const workspace = await db
		.select()
		.from(workspaces)
		.where(eq(workspaces.id, params.wid))
		.limit(1)
		.then((r) => r[0]);

	if (!workspace) error(404, 'Not found');

	return {
		form: await superValidate(workspace, zod(workspaceSchema)),
		workspaceAccess
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, params }) => {
		const form = await superValidate(request, zod(workspaceSchema));

		if (!locals.session) {
			return message(form, 'Unauthorized', { status: 401 });
		}

		if (!form.valid) {
			return fail(400, { form });
		}

		const { ability } = await getWorkspaceAccess({
			user: locals.session.user,
			workspaceId: params.wid
		});
		if (ability.cannot('update', subject('Workspace', { id: params.wid }))) {
			return message(form, 'Unauthorised', { status: 401 });
		}

		const { name } = form.data;

		try {
			const [updatedWorkspace] = await db
				.update(workspaces)
				.set({ name })
				.where(eq(workspaces.id, params.wid))
				.returning({ id: workspaces.id });

			if (!updatedWorkspace) throw new Error('Workspace update failed');
		} catch (error) {
			// Report
			console.log(error);
			return message(form, 'An error has occured!', { status: 500 });

			//return fail(500, { message: 'An error has occurred!', name });
		}
		redirect(303, `/w/${params.wid}`);
		// return { message: 'Workspace created successfully!' };
	}
} satisfies Actions;
