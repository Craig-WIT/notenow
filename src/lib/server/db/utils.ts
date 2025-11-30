import { and, eq } from 'drizzle-orm';
import { db } from '.';
import { pages, roles, workspaceAccess } from './schema';
import { getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { URLSearchParams } from 'url';
import type { User } from 'better-auth';
import defineAbilityFor from '$lib/ability';

export const getWorkspaceIDFromPageId = async (pageID: string) => {
	return (
		await db
			.select({ workspaceID: pages.workspaceId })
			.from(pages)
			.where(eq(pages.id, pageID))
			.limit(1)
	)[0].workspaceID;
};

export function requireLogin() {
	const { locals, url } = getRequestEvent();

	if (!locals.session) {
		const redirectTo = url.pathname + url.search;
		redirect(307, `/signin?${new URLSearchParams({ redirectTo })}`);
	}

	return locals.session;
}

export const getWorkspaceAccess = async ({
	user,
	workspaceId
}: {
	user: User;
	workspaceId: string;
}) => {
	const [wsAccess] = await db
		.select({ workspaceId: workspaceAccess.workspaceId, role: roles.name, roleId: roles.id })
		.from(workspaceAccess)
		.innerJoin(roles, eq(workspaceAccess.roleId, roles.id))
		.where(and(eq(workspaceAccess.workspaceId, workspaceId), eq(workspaceAccess.userId, user.id)))
		.limit(1);

	return {
		workspaceAccess: wsAccess,
		ability: defineAbilityFor(user, wsAccess)
	};
};
