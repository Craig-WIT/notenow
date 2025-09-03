export type Post = {
	body: string;
	id: number;
	reactions: { likes: 192; dislikes: 25 };
	tags: string[];
	title: string;
	userId: number;
	views: number;
};

export type PostsResponse = {
	posts: Post[];
	total: number;
	skip: number;
	limit: number;
};

export type PostComment = {
	id: number;
	body: string;
	postId: number;
	likes: number;
	user: { id: number; username: string; fullName: string };
};