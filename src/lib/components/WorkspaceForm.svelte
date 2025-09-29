<script lang="ts">
	import FormMessage from '$components/FormMessage.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { workspaceSchema, type WorkspaceSchema } from '$lib/schemas/workspace-schema';
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';
	import { toast } from 'svelte-sonner';

	let { form: formProp }: { form: SuperValidated<Infer<WorkspaceSchema>> } = $props();

	const form = superForm(formProp, {
		validators: zodClient(workspaceSchema),
		validationMethod: 'oninput',
		delayMs: 500,
		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toast.success('Workspace saved successfully!');
			}
		}
	});

	const { form: formData, enhance, message, submitting, delayed } = form;
</script>

<div class="card prose w-full rounded-md border-1 border-base-300 bg-base-200">
	<div class="card-body">
		{#if $message}
			<FormMessage formMessage={$message} />
		{/if}
		<form method="POST" action="?/createWorkspace" use:enhance>
			<Field {form} name="name">
				<Control>
					{#snippet children({ props })}
						<Label>Name</Label>
						<input
							type="text"
							class="input w-full rounded-md bg-base-200"
							{...props}
							bind:value={$formData.name}
						/>
					{/snippet}
				</Control>
				<Description>A name for your workspace.</Description>
				<FieldErrors class="mt-1 text-red-400" />
			</Field>
			<button disabled={$submitting} class="btn mt-4 w-full rounded-md btn-primary" type="submit">
				{#if $delayed}
					<span class="loading loading-spinner"></span>
				{/if}
				Submit</button
			>
		</form>
	</div>
</div>
