import type { Handle } from "@sveltejs/kit";

export const handle: Handle = (({event,resolve}) => {

    event.cookies.set('test','value', {path: '/'})

    return resolve(event);
})