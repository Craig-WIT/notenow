<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>{page.params.authType === 'register' ? 'Sign Up' : 'Sign In'}</h1>