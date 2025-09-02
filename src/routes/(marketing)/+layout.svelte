<script lang="ts">
	import { NotebookPen } from '@lucide/svelte';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';

	let { children }: LayoutProps = $props();

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
		<h1 class="text-2xl font-bold">
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
					<a href="/signin" class="btn btn-primary rounded-md">Login</a>
				</li>
			</ul>
		</nav>
	</div>
</header>

{@render children()}