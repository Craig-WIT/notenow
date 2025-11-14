import { betterAuth } from 'better-auth';
import { env } from '$env/dynamic/private';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';

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
	user: {
		additionalFields: {
			username: {
				type: 'string',
				required: true,
				unique: true
			}
		}
	},
	advanced: {
		database: {
			generateId: false
		}
	}
});
