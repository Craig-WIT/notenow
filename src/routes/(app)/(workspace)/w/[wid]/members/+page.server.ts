import { requireLogin } from '$lib/server/db/utils';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	//TODO Auth Checks
	requireLogin();
	return {};
}) satisfies PageServerLoad;
