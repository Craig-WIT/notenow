import { getWorkspaceAccess } from '$lib/server/db/utils';
import { requireLogin } from '$lib/server/db/utils';
import { subject } from '@casl/ability';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const { user } = requireLogin();

	const { workspaceAccess, ability } = await getWorkspaceAccess({ user, workspaceId: params.wid });
	if (
		ability.cannot('update', subject('Workspace', { id: params.wid })) &&
		ability.cannot('delete', subject('Workspace', { id: params.wid }))
	) {
		redirect(307, '/access-denied');
	}
	return { workspaceAccess };
}) satisfies PageServerLoad;
