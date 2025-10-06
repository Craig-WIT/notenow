import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { workspaces } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { workspaceSchema } from '$lib/schemas/workspace-schema';

export const load = (async ({ locals, params }) => {
	// TODO: Auth: Logged in and can update workspace

	if (!locals.session) {
		redirect(307, '/signin');
	}

	const workspace = await db
		.select()
		.from(workspaces)
		.where(eq(workspaces.id, params.wid))
		.limit(1)
		.then((r) => r[0]);

	if (!workspace) error(404, 'Not found');

	return {
		form: await superValidate(workspace, zod(workspaceSchema))
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
