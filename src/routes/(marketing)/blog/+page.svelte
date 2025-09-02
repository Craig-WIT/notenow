<script lang="ts">
	import type { PageProps } from "./$types";

    let {data}: PageProps = $props()

</script>

<h1 class="text-4xl">{data.title}</h1>