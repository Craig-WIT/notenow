import { eq } from "drizzle-orm"
import { db } from "."
import { pages } from "./schema"

export const getWorkspaceIDFromPageId = async (pageID: string) => {
    return (await db.select({workspaceID: pages.workspaceId}).from(pages).where(eq(pages.id, pageID)).limit(1))[0].workspaceID;
}