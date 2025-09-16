import { getWorkspaceIDFromPageId } from '$lib/server/db/utils';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pageAccess, pages, workspaces } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export const load = (async ({ locals, route, params, untrack }) => {
	// TODO: Auth
	const isPage = untrack(() => route.id.startsWith('/(app)/(workspace)/p/[pid]'));
	const workspaceId =
		isPage && params.pid ? await getWorkspaceIDFromPageId(params.pid) : params.wid;

	if (!workspaceId) {
		error(404, 'Not Found!');
	}

	const workspace = await db
		.select()
		.from(workspaces)
		.where(eq(workspaces.id, workspaceId))
		.limit(1)
		.then((r) => r[0]);

	if (!workspace) {
		error(404, 'Not Found!');
	}
	const userPages = await db
		.select({
			id: pages.id,
			title: pages.title,
			createdAt: pages.createdAt
		})
		.from(pages)
		.innerJoin(pageAccess, eq(pages.id, pageAccess.pageId))
		.where(and(eq(pages.workspaceId, workspaceId), eq(pageAccess.userId, locals.session.user.id)));
	return {
		workspace,
		pages: userPages
	};
}) satisfies LayoutServerLoad;
