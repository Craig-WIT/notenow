<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="card prose w-full rounded-md border-1 border-base-300 bg-base-200">
	<div class="card-body">
		<form method="POST" action="?/createWorkspace">
			<label for="ws-name">Name</label>
			<input id="ws-name" name="name" class="input w-full rounded-md bg-base-200" type="text" />
			<button class="btn mt-4 w-full rounded-md btn-primary" type="submit">Submit</button>
		</form>
	</div>
</div>
