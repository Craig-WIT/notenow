import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = (({event,resolve}) => {

    const token = event.cookies.get('token');

    if(!token && event.route.id?.startsWith('/(app)')) {
        redirect(307, '/signin')
    }

    event.locals.user = token ? {name: 'John', id: 1} : null;

    return resolve(event);
})