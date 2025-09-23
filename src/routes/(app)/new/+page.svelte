<script lang="ts">
	import type { PageProps } from './$types';
	import FormMessage from '$components/FormMessage.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { workspaceSchema } from '$lib/schemas/workspace-schema';
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';

	let { data }: PageProps = $props();

	const form = superForm(data.form, {
		validators: zodClient(workspaceSchema),
		validationMethod: 'oninput'
	});

	const { form: formData, enhance, message } = form;
</script>

<div class="p-5">
	<div class="card prose w-full rounded-md border-1 border-base-300 bg-base-200">
		<div class="card-body">
			{#if $message}
				<FormMessage formMessage={$message} />
			{/if}
			<form method="POST" action="?/createWorkspace" use:enhance>
				<Field {form} name="name">
					<Control>
						{#snippet children(props)}
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
				<button class="btn mt-4 w-full rounded-md btn-primary" type="submit"> Submit</button>
			</form>
		</div>
	</div>
</div>

<!-- <SuperDebug data={$formData} /> -->
