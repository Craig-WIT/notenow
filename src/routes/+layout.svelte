<script lang="ts">
	import { page } from '$app/state';
	import { BProgress } from '@bprogress/core';
	import '@bprogress/core/css';
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { Toaster } from 'svelte-sonner';

	BProgress.configure({ showSpinner: false });

	let { children } = $props();

	let loadingTimeout: any;

	beforeNavigate(() => {
		loadingTimeout = setTimeout(() => {
			BProgress.start();
		}, 500);
	});

	afterNavigate(() => {
		clearTimeout(loadingTimeout);
		BProgress.done();
	});
</script>

<Toaster />
<svelte:head>
	<title>{page.data.title ? `${page.data.title} | NoteNow` : 'NoteNow'}</title>
	<meta
		property="og:title"
		content={page.data.title ? `${page.data.title} | NoteNow` : 'NoteNow'}
	/>
	{#if page.data.description}
		<meta property="og:description" content={page.data.description} />
		<meta name="description" content={page.data.description} />
	{/if}
</svelte:head>

{@render children()}
