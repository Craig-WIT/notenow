import type { InferSelectModel } from 'drizzle-orm';
import type { roles } from './server/db/schema';
import type { User } from 'better-auth';
import { AbilityBuilder, createMongoAbility, type MongoAbility } from '@casl/ability';

class Workspace {
	id: string = '';
}
export type Actions = 'manage' | 'create' | 'update' | 'delete' | 'read';

export type Subjects = Workspace | 'Workspace';

export default function defineAbilityFor(
	user?: User | null,
	workspaceAccess?: { workspaceId: string; role: InferSelectModel<typeof roles>['name'] }
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

	if (workspaceAccess?.role === 'editor') {
		can('read', 'Workspace', { id: workspaceAccess.workspaceId });
	}

	return build();
}
