import { redirect, type Handle, type HandleServerError } from "@sveltejs/kit";

export const handle: Handle = ({event,resolve}) => {

    const token = event.cookies.get('token');

    if(!token && event.route.id?.startsWith('/(app)')) {
        redirect(307, '/signin')
    }

    event.locals.user = token ? {name: 'John', id: 1} : null;

    return resolve(event);
}

export const handleError: HandleServerError = async({error, event, status, message}) => {
    console.log(error, event, status, message);
    return {
        message: 'An unexpected error has occured'
    }
}