// See https://svelte.dev/docs/kit/types#app.d.ts

import type { PageData as AddWorkspaceData } from './routes/(app)/new/$types';
import type { PageData as EditWorkspaceData } from './routes/(app)/(workspace)/w/[wid]/edit/$types';
import type { Session, User } from 'better-auth';

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: string;
		}
		interface Locals {
			session: { user: User; session: Session };
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
