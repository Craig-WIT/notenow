// See https://svelte.dev/docs/kit/types#app.d.ts

import type { users } from '$lib/server/db/schema';
import type { PageData as AddWorkspaceData } from './routes/(app)/new/$types';
import type { PageData as EditWorkspaceData } from './routes/(app)/(workspace)/w/[wid]/edit/$types';

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: string;
		}
		interface Locals {
			session: { user: typeof users.$inferSelect; session: string };
		}
		// interface PageData {}
		interface PageState {
			addWorkspaceData?: AddWorkspaceData;
			editWorkspaceData?: EditWorkspaceData;
		}
		// interface Platform {}
	}
}

export {};
