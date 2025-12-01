import type { User } from 'better-auth';
import type { InferSelectModel } from 'drizzle-orm';
import type { roles } from './server/db/schema';
import { AbilityBuilder, createMongoAbility, type MongoAbility } from '@casl/ability';

class Workspace {
	id: string = '';
}

class Page {
	id: string = '';
}
class Note {
	id: string = '';
	userId: string = '';
	pageId: string = '';
}

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = Workspace | 'Workspace' | Page | 'Page' | Note | 'Note';

export default function defineAbilityFor(
	user?: User | null,
	workspaceAccess?: { workspaceId: string; role: InferSelectModel<typeof roles>['name'] },
	pageAccess?: { pageId: string; role: InferSelectModel<typeof roles>['name'] }
) {
	const { can, build } = new AbilityBuilder<MongoAbility<[Actions, Subjects]>>(createMongoAbility);

	if (!user) {
		return build();
	}

	if (workspaceAccess?.role === 'admin') {
		can('manage', 'Workspace', { id: workspaceAccess.workspaceId });
	}
	if (workspaceAccess?.role === 'editor') {
		can('read', 'Workspace', { id: workspaceAccess.workspaceId });
		can('update', 'Workspace', { id: workspaceAccess.workspaceId });
	}
	if (workspaceAccess?.role === 'viewer') {
		can('read', 'Workspace', { id: workspaceAccess.workspaceId });
	}

	const isWorkspaceAdmin = workspaceAccess?.role === 'admin';
	const isWorkspaceEditor = ['admin', 'editor'].includes(workspaceAccess?.role || '');
	const isWorkspaceViewer = ['admin', 'editor', 'viewer'].includes(workspaceAccess?.role || '');

	if (isWorkspaceAdmin && pageAccess?.role === 'admin') {
		can('manage', 'Page', { id: pageAccess.pageId });
		can('manage', 'Note', { pageId: pageAccess.pageId });
	}
	if (isWorkspaceEditor && pageAccess?.role === 'editor') {
		can('read', 'Page', { id: pageAccess.pageId });
		can('update', 'Page', { id: pageAccess.pageId });
		can('update', 'Note', { pageId: pageAccess.pageId, userId: user.id });
		can('delete', 'Note', { pageId: pageAccess.pageId, userId: user.id });
	}
	if (isWorkspaceViewer && pageAccess?.role === 'viewer') {
		can('read', 'Page', { id: pageAccess.pageId });
		// Maybe you need a viewer to update a note he created when he was an editor
		can('update', 'Note', { pageId: pageAccess.pageId, userId: user.id });
		can('delete', 'Note', { pageId: pageAccess.pageId, userId: user.id });
	}

	return build();
}
