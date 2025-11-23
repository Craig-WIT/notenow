import { z } from 'zod';

export const userRegisterSchema = z
	.object({
		username: z.string().min(3).max(20),
		email: z.string().email(),
		name: z.string().min(3).max(50),
		password: z.string().min(8).max(100),
		confirmPassword: z.string().min(8).max(100)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});
