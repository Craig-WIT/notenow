<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>{page.data.title ? `${page.data.title} | NoteNow` : 'NoteNow'}</title>
	<meta property="og:title" content={page.data.title ? `${page.data.title} | NoteNow` : 'NoteNow'} />
	{#if page.data.description}
		<meta property="og:description" content={page.data.description} />
		<meta name="description" content={page.data.description} />
	{/if}
</svelte:head>

{@render children()}