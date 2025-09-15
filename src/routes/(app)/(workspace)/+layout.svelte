<script lang="ts">
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
</script>

<container class="flex">
    <div class="flex">
        <div class="w-50 bg-amber-100">
            Sidebar
        </div>
         <div class="w-50 bg-amber-300">
            {@render children()}
        </div>
    </div>
</container>