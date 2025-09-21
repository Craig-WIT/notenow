<script lang="ts">
	import { NotebookPen } from '@lucide/svelte';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';

	let { children, data }: LayoutProps = $props();

	const menuItems = [
		{
			path: '/',
			label: 'Home'
		},
		{
			path: '/about',
			label: 'About'
		},
		{
			path: '/blog',
			label: 'Blog'
		},
		{
			path: '/faq',
			label: 'FAQ'
		},
		{
			path: '/pricing',
			label: 'Pricing'
		}
	];
</script>

<header class="bg-base-100 py-4">
	<div class="container mx-auto flex items-center justify-between">
		<h1 class="ml-6 text-2xl font-bold">
			<a class="flex items-center no-underline" href="/"
				><NotebookPen /> <span class="ms-2">NoteNow</span></a
			>
		</h1>
		<nav>
			<ul class="menu menu-horizontal items-center space-x-4">
				{#each menuItems as menuItem}
					<li>
						<a
							href={menuItem.path}
							class={[
								'rounded-md hover:underline',
								page.url.pathname === menuItem.path && 'bg-base-300'
							]}>{menuItem.label}</a
						>
					</li>
				{/each}

				<li>
					{#if data.user}
						<a href="/app" class="btn rounded-md bg-orange-600 text-white">Dashboard</a>
					{:else}
						<a href="/signin" class="btn rounded-md btn-primary">Login</a>
					{/if}
				</li>
			</ul>
		</nav>
	</div>
</header>

{@render children()}
