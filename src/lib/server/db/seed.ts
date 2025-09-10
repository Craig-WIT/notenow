import 'dotenv/config';
import { seed, reset } from 'drizzle-seed';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';

async function main() {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not set');
	}
	const db = drizzle(process.env.DATABASE_URL!);
	await reset(db, schema);
	await seed(db, schema).refine((f) => ({
		users: {
			count: 1,
			columns: {
				name: f.fullName(),
				username: f.string({ isUnique: true }),
				image: f.valuesFromArray({
					values: [
						'https://gravatar.com/avatar/db3d04f9e6cb5c0a7927cb82710f2a27?s=400&d=robohash&r=pg'
					]
				})
			}
		},
		workspaces: {
			count: 5,
			columns: {
				name: f.companyName()
			}
		},
		workspaceAccess: {
			count: 5
		},
		roles: {
			count: 3,
			columns: {
				name: f.valuesFromArray({
					values: ['admin', 'editor', 'viewer'],
					isUnique: true
				})
			}
		},
		pages: {
			count: 50,
			columns: {
				title: f.loremIpsum({ sentencesCount: 1 })
			}
		},
		pageAccess: {
			count: 10
		},
		notes: {
			count: 100,
			columns: {
				content: f.loremIpsum({
					sentencesCount: 5
				})
			}
		}
	}));
}

main();