import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { redirect, type Handle, type HandleServerError } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const handle: Handle = async ({event,resolve}) => {

    event.locals.session = {user: (await db.select().from(users).where(eq(users.id, '3e0bb3d0-2074-4a1e-6263-d13dd10cb0cf')).limit(1))[0], session: 'session'}

    if(!event.locals.session) {
        redirect(307, '/signin')
    }

    console.log(event.locals.session)

    return resolve(event);
}

export const handleError: HandleServerError = async({error, event, status, message}) => {
    console.log(error, event, status, message);
    return {
        message: 'An unexpected error has occured'
    }
}