<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import { ChevronDown, MoonIcon, NotebookPen, Plus, StickyNote, Sun } from '@lucide/svelte';
	import { page } from '$app/state';
	import { handlePopoverLink } from '$lib/utils';
	import PushStateModal from './PushStateModal.svelte';
	import { toast } from 'svelte-sonner';
	import defineAbilityFor from '$lib/ability';
	import { subject } from '@casl/ability';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let selectedWorkspaceID = $derived(
		page.route.id === '/(app)/(workspace)/w/[wid]' && page.params.wid
	);

	let ability = $derived(defineAbilityFor(data.user, page.data.workspaceAccess));
</script>

<div class="flex h-svh flex-col">
	<div class="navbar border-b-1 border-b-base-300 bg-base-100 px-4 shadow-sm">
		<div class="flex flex-1 items-center gap-4">
			<a class="flex items-center no-underline" href="/app"
				><NotebookPen /> <span class="ms-2">NoteNow</span></a
			>
			<div class="">
				<!-- TO POPULATE -->
				<ul class="menu menu-horizontal space-x-2 p-0">
					<li>
						<button
							class="btn rounded-md px-2 font-normal btn-ghost btn-md"
							popovertarget="popover-1"
							style="anchor-name:--anchor-1"
						>
							Workspaces
							<ChevronDown size="18" />
						</button>
						<ul
							class="dropdown-content dropdown-menu menu dropdown dropdown-start min-w-[300px]! menu-md"
							popover
							id="popover-1"
							style="position-anchor:--anchor-1"
						>
							{#each data.workspaces || [] as workspace}
								<li>
									<a
										onclick={(e) => {
											(e.currentTarget.closest('[popover]') as HTMLElement)?.hidePopover();
										}}
										href="/w/{workspace.id}"
										class="rounded-md"
									>
										<div class="avatar avatar-placeholder">
											<div class="w-10 rounded-md bg-blue-700">
												<span class="text-lg text-white">{workspace.name[0].toUpperCase()}</span>
											</div>
										</div>
										<p>{workspace.name}</p>
										{#if selectedWorkspaceID === workspace.id}
											<div class="badge rounded-lg badge-sm">Current</div>
										{/if}
									</a>
								</li>
							{:else}
								<li class="mx-1">No Workspaces Yet</li>
							{/each}
							<li>
								<a
									onclick={handlePopoverLink('newWorkspace')}
									href="/new"
									class="btn mt-3 w-full rounded-md bg-base-300 btn-sm"
								>
									<Plus size={16} />
									New Workspace</a
								>
							</li>
						</ul>
					</li>
					<li>
						<button
							class="btn rounded-md px-2 font-normal btn-ghost btn-md"
							popovertarget="popover-2"
							style="anchor-name:--anchor-2"
						>
							Pages
							<ChevronDown size="18" />
						</button>
						<ul
							class="dropdown-content dropdown-menu menu dropdown dropdown-start min-w-[300px]! menu-md"
							popover
							id="popover-2"
							style="position-anchor:--anchor-2"
						>
							{#each data.recentPages || [] as page}
								<li>
									<a
										onclick={(e) => {
											(e.currentTarget.closest('[popover]') as HTMLElement)?.hidePopover();
										}}
										class="items-start rounded-md"
										href="/p/{page.id}"
									>
										<StickyNote size="22" class="me-1 mt-1" />
										<div>
											<span class="block text-[16px]">{page.title}</span>
											<span class="text-xs italic"><span>Workspace:</span> {page.workspace}</span>
										</div>
									</a>
								</li>
							{:else}
								<li class="mx-1">No Pages Yet</li>
							{/each}
						</ul>
					</li>
					{#if page.data.workspaceId && ability.can('update', subject( 'Workspace', { id: page.data.workspaceId } ))}
						<li class="ms-2">
							<a class="btn rounded-md bg-orange-600 px-2 font-normal text-black btn-md">
								Create <Plus size="18" />
							</a>
						</li>
					{/if}
				</ul>
			</div>
		</div>
		<div class="flex flex-1 justify-end gap-2">
			<label class="swap me-3 swap-rotate">
				<!-- this hidden checkbox controls the state -->
				<input type="checkbox" class="theme-controller" value="synthwave" />

				<!-- sun icon -->
				<Sun class="swap-off" />

				<MoonIcon class="swap-on" />
			</label>
			<input
				type="text"
				placeholder="Search"
				class="input-bordered input w-24 rounded-md md:w-auto"
			/>
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn avatar btn-circle btn-ghost">
					<div class="w-10 rounded-full">
						<!-- TO POPULATE -->
						<img alt="" src={data.user?.image} />
					</div>
				</div>
				<!-- dropdown dropdown-right menu rounded-box bg-base-100 border-base-300 -ms-1 w-52 animate-none! rounded-md
			border-1 shadow-md transition-none! -->
				<div tabindex="0" role="menu" class="dropdown-content dropdown-menu menu menu-md">
					<ul>
						<li>
							<a class="rounded-md">Profile</a>
						</li>
						<li><a class="rounded-md">Settings</a></li>
					</ul>
					<form
						method="POST"
						action="/app?/logout"
						use:enhance={() => {
							return ({ result }) => {
								if (result.type === 'failure') {
									toast.error('An error has occurred');
								} else {
									applyAction(result);
								}
							};
						}}
					>
						<button
							class="btn mt-2 w-full cursor-pointer rounded-md bg-red-700 text-white btn-sm"
							type="submit">Signout</button
						>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- Page content here -->
	<div class=" w-full flex-1 overflow-y-hidden">
		{@render children()}
	</div>
</div>

<PushStateModal />
