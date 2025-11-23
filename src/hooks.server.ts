import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.locals.session) {
		redirect(307, '/signin');
	}

	return resolve(event);
};

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	console.log(error, event, status, message);
	return {
		message: 'An unexpected error has occured'
	};
};
