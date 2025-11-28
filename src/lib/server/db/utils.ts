import { eq } from 'drizzle-orm';
import { db } from '.';
import { pages } from './schema';
import { getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { URLSearchParams } from 'url';

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
