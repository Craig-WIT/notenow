import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param): param is 'signin' | 'register' => {
	return param === 'signin' || param === 'register';
}) satisfies ParamMatcher;
