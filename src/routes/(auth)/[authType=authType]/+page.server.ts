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
import { parse } from 'cookie';
import { dev } from '$app/environment';

export const load = (async ({ locals }) => {
	if (locals.session) {
		redirect(307, '/app');
	}
	return {
		loginForm: await superValidate(
			{
				email: 'sayopid586@aikunkun.com',
				password: '123456789'
			},
			zod(userLoginSchema)
		),
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
	login: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(userLoginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		try {
			const res = await auth.api.signInEmail({
				headers: request.headers,
				body: {
					email,
					password,
					callbackURL: `${env.BETTER_AUTH_URL}/app`
				},
				asResponse: true
			});
			if (res.status !== 200) {
				return message(form, (await res.json())?.message || 'An error has occured', {
					status: 400
				});
			}
			const setCookieHeader = res.headers.get('set-cookie');
			if (setCookieHeader) {
				const parsedCookie = parse(setCookieHeader);
				cookies.set('better-auth.session_token', parsedCookie['better-auth.session_token'], {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					secure: !dev,
					maxAge: +parsedCookie['Max-Age']
				});
			}
		} catch (error) {
			return message(form, 'An error has occured', { status: 500 });
			console.log(error);
		}
		redirect(303, '/app');
	},
	register: async ({ request }) => {
		const form = await superValidate(request, zod(userRegisterSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, email, name, password } = form.data;

		try {
			await auth.api.signUpEmail({
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
