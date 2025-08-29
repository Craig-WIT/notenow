<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="my-2 bg-amber-600 p-2">
	<ul class="flex gap-2">
		<li>
			<a href="/">Home</a>
			<a href="/about">About</a>
		</li>
	</ul>
</nav>

{@render children?.()}
