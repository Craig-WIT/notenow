import { betterAuth } from 'better-auth';
import { env } from '$env/dynamic/private';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export const auth = betterAuth({
	baseURL: env.BETTER_AUTH_URL,
	basePath: '/api/auth',
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true
	},
	database: drizzleAdapter(db, {
		provider: 'pg',
		usePlural: true
	}),
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			const { data, error } = await resend.emails.send({
				from: 'onboarding@resend.dev',
				to: 'craig.grehan3@gmail.com',
				subject: 'Verify your email address',
				text: `Click the link to verify your email: ${url}`
			});
			console.log(data);
			if (error) {
				console.log(user);
			}
		}
	},
	user: {
		additionalFields: {
			username: {
				type: 'string',
				required: true,
				unique: true
			},
			image: {
				type: 'string'
			}
		}
	},
	advanced: {
		database: {
			generateId: false
		}
	}
});
