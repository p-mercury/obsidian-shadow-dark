import {
	type MarkdownPostProcessorContext,
	MarkdownRenderChild,
} from "obsidian";
import { mount, unmount } from "svelte";
import ReadBlock from "./read-block.svelte";
import { Item } from "../../types/item.svelte";

class MonsterSetBlockChild extends MarkdownRenderChild {
	private component?: ReturnType<typeof mount>;

	constructor(
		containerEl: HTMLElement,
		private readonly source: string,
	) {
		super(containerEl);
	}

	onload(): void {
		let items: Item[];

		try {
			items = Item.unmarshalSet(this.source);
		} catch {
			this.containerEl.setText("Invalid item table.");
			return;
		}

		window.setTimeout(() => {
			const isLivePreview =
				this.containerEl.closest(".markdown-source-view") !== null;

			const isEmbed =
				this.containerEl.closest(".internal-embed, .markdown-embed") !== null;

			if (isLivePreview && !isEmbed) {
				return;
			}

			this.component = mount(ReadBlock, {
				target: this.containerEl,
				props: { items },
			});
		}, 0);
	}

	onunload(): void {
		if (this.component) {
			void unmount(this.component);
			this.component = undefined;
		}
	}
}

export function renderMonsterSet(
	source: string,
	table: HTMLTableElement,
	ctx: MarkdownPostProcessorContext,
): void {
	const container = document.createElement("div");
	container.classList.add("shadowdark-items");
	table.replaceWith(container);
	ctx.addChild(new MonsterSetBlockChild(container, source));
}
