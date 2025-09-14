import { db } from '$lib/server/db';
import { notes, pageAccess, pages, roles, workspaceAccess, workspaces as wsSchema } from '$lib/server/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {
    if(locals.session) {
        const workspacesPromise = db
        .select({
            name: wsSchema.name,
            id: wsSchema.id,
            role: roles.id,
        })
        .from(workspaceAccess)
        .innerJoin(wsSchema, eq(workspaceAccess.workspaceId, wsSchema.id))
        .innerJoin(roles, eq(workspaceAccess.roleId, roles.id))
        .where(eq(workspaceAccess.userId, locals.session.user.id))

        const recentPagesPromise = db
			.select({
				title: pages.title,
				id: pages.id,
				updatedAt: pages.updatedAt,
				role: roles.name,
				workspace: wsSchema.name
			})
			.from(pageAccess)
			.innerJoin(pages, eq(pages.id, pageAccess.pageId))
			.innerJoin(roles, eq(pageAccess.roleId, roles.id))
			.innerJoin(wsSchema, eq(wsSchema.id, pages.workspaceId))
			.where(eq(pageAccess.userId, locals.session?.user?.id))
			.orderBy(desc(pages.createdAt))
			.limit(5);

        const recentNotesPromise = db
			.select({
				id: notes.id,
				content: notes.content,
				createdAt: notes.createdAt,
				pageId: notes.pageId,
				pageTitle: pages.title,
				workspaceName: wsSchema.name
			})
			.from(notes)
			.innerJoin(pages, eq(notes.pageId, pages.id))
			.innerJoin(pageAccess, eq(pages.id, pageAccess.pageId))
			.innerJoin(wsSchema, eq(pages.workspaceId, wsSchema.id))
			.where(
				and(
					eq(notes.userId, locals.session?.user?.id), // user created the note
					eq(pageAccess.userId, locals.session?.user?.id) // and still has access
				)
			)
			.orderBy(desc(notes.createdAt))
			.limit(3);

            const [workspaces,recentPages,recentNotes] = await Promise.all([workspacesPromise, recentPagesPromise, recentNotesPromise])

    return {
        user: locals.session.user,
        workspaces,
        recentPages,
        recentNotes,
    }
    } else {
        return{
            user: null,
        }
    }
}) satisfies LayoutServerLoad;