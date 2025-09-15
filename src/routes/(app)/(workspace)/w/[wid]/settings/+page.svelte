<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<h3>Settings</h3>
<a href="/w/{data.workspace.id}/edit" class="btn">Edit Workspace</a>