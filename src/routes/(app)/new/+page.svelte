<script lang="ts">
	import WorkspaceForm from '$components/WorkspaceForm.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="p-5">
	<WorkspaceForm form={data.form} />
</div>

<!-- <SuperDebug data={$formData} /> -->
