import { db } from '$lib/server/db';
import { notes, pages, users } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {
    // TODO: Check user is logged in and page access etc

    async function getPage() {
        const page = await db
        .select()
        .from(pages)
        .where(eq(pages.id, params.pid))
        .limit(1)
        .then((r) => r[0]);

        return page;
    }

    async function getNotes() {
        const _notes = await db
        .select({
            id: notes.id,
            content: notes.content,
            userId: notes.userId,
            pageId: notes.pageId,
            username: users.name,
        })
        .from(notes)
        .innerJoin(users, eq(notes.userId, users.id))
        .where(eq(notes.pageId, params.pid))
        .orderBy(desc(notes.createdAt));

        return _notes;
    }

    return {
        notes: getNotes(),
        page: await getPage(),
    };
}) satisfies PageServerLoad;