import { betterAuth } from 'better-auth';
import { env } from '$env/dynamic/private';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { Resend } from 'resend';
import { building } from '$app/environment';

export const auth = betterAuth({
	baseURL: building ? '' : env.BETTER_AUTH_URL,
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
		sendVerificationEmail: async ({ url }) => {
			const resend = new Resend(env.RESEND_API_KEY);
			const { error } = await resend.emails.send({
				// from: 'onboarding@resend.dev'
				from: 'noreply@transactional.alialaa.dev',
				to: 'craig.grehan3@gmail.com',
				subject: 'Verify your email address',
				text: `Click the link to verify your email: ${url}`
			});
			if (error) {
				// report
			}
		}
	},
	socialProviders: {
		github: {
			clientId: building ? '' : env.GITHUB_CLIENT_ID,
			clientSecret: building ? '' : env.GITHUB_CLIENT_SECRET,
			mapProfileToUser(profile) {
				return {
					username: profile.login
				};
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
