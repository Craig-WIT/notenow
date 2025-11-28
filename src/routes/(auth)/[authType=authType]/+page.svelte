<script lang="ts">
	import { page } from '$app/state';
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { userLoginSchema } from '$lib/schemas/login-schema';
	import { userRegisterSchema } from '$lib/schemas/register-schema';
	import { AtSign, Github, Lock, NotebookPen, User } from '@lucide/svelte';
	import { Control, Field, FieldErrors } from 'formsnap';
	import FormMessage from '$components/FormMessage.svelte';

	let { data, form }: PageProps = $props();

	const loginForm = superForm(data.loginForm, {
		validators: zodClient(userLoginSchema)
	});

	const registerForm = superForm(data.registerForm, {
		validators: zodClient(userRegisterSchema)
	});

	const {
		form: loginFormData,
		enhance: loginFormEnhance,
		message: loginFormMessage,
		submitting: loginFormSubmitting,
		delayed: loginFormDelayed
	} = loginForm;

	const {
		form: registerFormData,
		enhance: registerFormEnhance,
		message: registerFormMessage,
		submitting: registerFormSubmitting,
		delayed: registerFormDelayed
	} = registerForm;

	let redirectTo = $derived(page.url.searchParams.get('redirectTo'));
</script>

<div class=" flex h-screen w-full items-center justify-center p-5">
	<div class="card prose w-full max-w-100 rounded-md border-1 border-base-300 bg-base-200">
		<div class="card-body">
			<h1 class="mb-0 mb-4 flex items-center">
				<NotebookPen /> <span class="ms-2 text-2xl">NotesApp</span>
			</h1>
			<h2 class="mt-0 mb-0 card-title">
				{page.params.authType === 'register' ? 'Sign Up' : 'Sign In'}
			</h2>
			<p class="mb-0 text-sm">Please enter your details.</p>

			{#if $loginFormMessage || $registerFormMessage || form?.message}
				<FormMessage formMessage={$loginFormMessage || $registerFormMessage || form?.message} />
			{/if}

			<div class="mt-4">
				{#if page.params.authType === 'signin'}
					<form
						method="POST"
						action="?/login{redirectTo ? `&redirectTo=${redirectTo}` : ''}"
						use:loginFormEnhance
					>
						<div class="mb-4">
							<Field form={loginForm} name="email">
								<Control>
									{#snippet children({ props })}
										<div class="field">
											<label class="input w-full rounded-md bg-base-200">
												<User size="16" />
												<input
													placeholder="mail@site.com"
													{...props}
													type="email"
													bind:value={$loginFormData.email}
												/>
											</label>
										</div>
									{/snippet}
								</Control>
								<FieldErrors class="mt-1 text-red-400" />
							</Field>
						</div>
						<Field form={loginForm} name="password">
							<Control>
								{#snippet children({ props })}
									<div class="field">
										<label class="input w-full rounded-md bg-base-200">
											<Lock size="16" />
											<input
												{...props}
												placeholder="Password"
												type="password"
												bind:value={$loginFormData.password}
											/>
										</label>
									</div>
								{/snippet}
							</Control>
							<FieldErrors class="mt-1 text-red-400" />
						</Field>
						<button
							disabled={$loginFormSubmitting}
							class="btn mt-4 w-full rounded-md btn-primary"
							type="submit"
						>
							{#if $loginFormDelayed}
								<span class="loading loading-spinner"></span>
							{/if} Login</button
						>
					</form>
				{/if}
				{#if page.params.authType === 'register'}
					<form method="POST" action="?/register" use:registerFormEnhance>
						<div class="mb-4">
							<Field form={registerForm} name="email">
								<Control>
									{#snippet children({ props })}
										<div class="field">
											<label class="input w-full rounded-md bg-base-200">
												<User size="16" />
												<input
													placeholder="mail@site.com"
													{...props}
													type="email"
													bind:value={$registerFormData.email}
												/>
											</label>
										</div>
									{/snippet}
								</Control>
								<FieldErrors class="mt-1 text-red-400" />
							</Field>
						</div>
						<div class="mb-4">
							<Field form={registerForm} name="username">
								<Control>
									{#snippet children({ props })}
										<div class="field">
											<label class="input w-full rounded-md bg-base-200">
												<AtSign size="16" />
												<input
													placeholder="Username"
													{...props}
													type="text"
													bind:value={$registerFormData.username}
												/>
											</label>
										</div>
									{/snippet}
								</Control>
								<FieldErrors class="mt-1 text-red-400" />
							</Field>
						</div>
						<div class="mb-4">
							<Field form={registerForm} name="name">
								<Control>
									{#snippet children({ props })}
										<div class="field">
											<label class="input w-full rounded-md bg-base-200">
												<Lock size="16" />
												<input
													placeholder="Name"
													{...props}
													type="text"
													bind:value={$registerFormData.name}
												/>
											</label>
										</div>
									{/snippet}
								</Control>
								<FieldErrors class="mt-1 text-red-400" />
							</Field>
						</div>

						<div class="mb-4">
							<Field form={registerForm} name="password">
								<Control>
									{#snippet children({ props })}
										<div class="field">
											<label class="input w-full rounded-md bg-base-200">
												<User size="16" />
												<input
													placeholder="Password"
													{...props}
													type="password"
													bind:value={$registerFormData.password}
												/>
											</label>
										</div>
									{/snippet}
								</Control>
								<FieldErrors class="mt-1 text-red-400" />
							</Field>
						</div>

						<div class="mb-4">
							<Field form={registerForm} name="confirmPassword">
								<Control>
									{#snippet children({ props })}
										<div class="field">
											<label class="input w-full rounded-md bg-base-200">
												<Lock size="16" />
												<input
													placeholder="Confirm Password"
													{...props}
													type="password"
													bind:value={$registerFormData.confirmPassword}
												/>
											</label>
										</div>
									{/snippet}
								</Control>
								<FieldErrors class="mt-1 text-red-400" />
							</Field>
						</div>

						<button
							disabled={$registerFormSubmitting}
							class="btn mt-4 w-full rounded-md btn-primary"
							type="submit"
						>
							{#if $registerFormDelayed}
								<span class="loading loading-spinner"></span>
							{/if}Register</button
						>
					</form>
				{/if}
				{#if page.params.authType === 'register'}
					<p class="mt-2 mb-0">Already have an account? <a href="/signin">Sign In</a>.</p>
				{:else}
					<p class="mt-2 mb-0">
						Forgot your password? <a href="/reset-password">Reset it here</a>.
					</p>
					<p class="mt-0 mb-0">Don't have an account? <a href="/register">Sign up</a>.</p>
				{/if}
				<form
					method="POST"
					class="mt-4"
					action="?/githubSignIn{redirectTo ? `&redirectTo=${redirectTo}` : ''}"
				>
					<button class="btn w-full rounded-md bg-black text-white" type="submit"
						><Github size="18" /> Sign in with GitHub</button
					>
				</form>
			</div>
		</div>
	</div>
</div>
