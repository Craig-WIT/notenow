import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { userLoginSchema } from '$lib/schemas/login-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { userRegisterSchema } from '$lib/schemas/register-schema';
import { auth } from '$lib/server/auth';
import { getGravatarUrl } from '$lib/utils';
import { APIError } from 'better-auth';
import { env } from '$env/dynamic/private';

export const load = (async ({ locals }) => {
	if (locals.session) {
		redirect(307, '/app');
	}
	return {
		loginForm: await superValidate(zod(userLoginSchema)),
		registerForm: await superValidate(
			{
				email: 'sayopid586@aikunkun.com',
				name: 'Test',
				username: 'test',
				password: '123456789',
				confirmPassword: '123456789'
			},
			zod(userRegisterSchema)
		)
	};
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ request }) => {
		const form = await superValidate(request, zod(userRegisterSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, email, name, password } = form.data;

		try {
			const res = await auth.api.signUpEmail({
				headers: request.headers,
				body: {
					username,
					email,
					name,
					password,
					image: getGravatarUrl(email),
					callbackURL: `${env.BETTER_AUTH_URL}/app`
				}
			});
			console.log(res);
			return message(form, 'A Confirmation Email has been sent to verify your account');
		} catch (error) {
			let errorMessage = 'An error has occured';

			if (error instanceof APIError) {
				const duplicateUsername = error?.body?.details?.constraint_name === 'users_username_unique';
				errorMessage = duplicateUsername ? 'Username must be unique' : error.message;
			}
			return message(form, errorMessage, { status: 400 });
		}
	}
} satisfies Actions;
