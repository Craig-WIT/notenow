import type { MouseEventHandler } from 'svelte/elements';
import { goto, preloadData, pushState } from '$app/navigation';
import type { PageData as AddWorkspaceData } from '../routes/(app)/new/$types';
import type { PageData as EditWorkspaceData } from '../routes/(app)/(workspace)/w/[wid]/edit/$types';

export const handlePopoverLink =
	(page: 'newWorkspace' | 'editWorkspace'): MouseEventHandler<HTMLAnchorElement> =>
	async (e) => {
		if (e.shiftKey || e.metaKey || e.ctrlKey) return;
		e.preventDefault();
		(e.currentTarget.closest('[popover') as HTMLElement)?.hidePopover();
		const { href } = e.currentTarget;
		const result = await preloadData(href);
		if (result.type === 'loaded' && result.status === 200) {
			if (page === 'newWorkspace') {
				pushState(href, { addWorkspaceData: result.data as AddWorkspaceData });
			}
			if (page === 'editWorkspace') {
				pushState(href, { editWorkspaceData: result.data as EditWorkspaceData });
			}
		} else {
			goto(href);
		}
	};
