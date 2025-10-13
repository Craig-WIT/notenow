<script lang="ts">
	import WorkspaceForm from '$components/WorkspaceForm.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<WorkspaceForm form={data.form} />

<!-- <SuperDebug data={$formData} /> -->
