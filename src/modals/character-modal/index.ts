import { App, Modal } from "obsidian";
import { mount, unmount } from "svelte";

import Moadl from "./modal.svelte";
import type { Pc } from "../../types/pc";

export class CharacterModal extends Modal {
	private component: ReturnType<typeof mount> | undefined;

	constructor(
		app: App,
		private character: Pc,
	) {
		super(app);
	}

	onOpen(): void {
		this.setTitle(this.character.name);

		this.component = mount(Moadl, {
			target: this.contentEl,
			props: {
				character: this.character,
			},
		});
	}

	async onClose(): Promise<void> {
		if (this.component) {
			await unmount(this.component);
			this.component = undefined;
		}

		this.contentEl.empty();
	}
}
