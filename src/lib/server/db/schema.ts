import {
	pgTable,
	uuid,
	varchar,
	boolean,
	text,
	timestamp,
	pgEnum,
	primaryKey
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role_enum', ['admin', 'editor', 'viewer']);

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	username: varchar('username', { length: 50 }).unique().notNull(),
	name: varchar('name', { length: 50 }).notNull(),
	email: varchar('email', { length: 255 }).unique().notNull(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const workspaces = pgTable('workspaces', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 100 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const roles = pgTable('roles', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: roleEnum('name').notNull().unique()
});

export const workspaceAccess = pgTable(
	'workspace_access',
	{
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		workspaceId: uuid('workspace_id')
			.notNull()
			.references(() => workspaces.id, { onDelete: 'cascade' }),
		roleId: uuid('role_id')
			.notNull()
			.references(() => roles.id),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => [primaryKey({ columns: [table.userId, table.workspaceId] })]
);

export const pages = pgTable('pages', {
	id: uuid('id').primaryKey().defaultRandom(),
	workspaceId: uuid('workspace_id')
		.notNull()
		.references(() => workspaces.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const pageAccess = pgTable(
	'page_access',
	{
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		pageId: uuid('page_id')
			.notNull()
			.references(() => pages.id, { onDelete: 'cascade' }),
		roleId: uuid('role_id')
			.notNull()
			.references(() => roles.id),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => [primaryKey({ columns: [table.userId, table.pageId] })]
);

export const notes = pgTable('notes', {
	id: uuid('id').primaryKey().defaultRandom(),
	pageId: uuid('page_id')
		.notNull()
		.references(() => pages.id, { onDelete: 'cascade' }),
	userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// NOTE LIKES
// export const noteLikes = pgTable(
// 	'note_likes',
// 	{
// 		noteId: uuid('note_id')
// 			.notNull()
// 			.references(() => notes.id, { onDelete: 'cascade' }),
// 		userId: uuid('user_id')
// 			.notNull()
// 			.references(() => users.id, { onDelete: 'cascade' }),
// 		createdAt: timestamp('created_at').notNull().defaultNow()
// 	},
// 	(table) => [primaryKey({ columns: [table.noteId, table.userId] })]
// );

// COMMENTS
// export const noteComments = pgTable('note_comments', {
// 	id: uuid('id').primaryKey().defaultRandom(),
// 	noteId: uuid('note_id')
// 		.notNull()
// 		.references(() => notes.id, { onDelete: 'cascade' }),
// 	userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
// 	parentCommentId: uuid('parent_comment_id').references((): AnyPgColumn => noteComments.id, {
// 		onDelete: 'cascade'
// 	}),
// 	content: text('content').notNull(),
// 	createdAt: timestamp('created_at').notNull().defaultNow(),
// 	updatedAt: timestamp('updated_at').notNull().defaultNow()
// });