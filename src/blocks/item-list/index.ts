import {
	type MarkdownPostProcessorContext,
	MarkdownRenderChild,
	TFile,
} from "obsidian";
import { mount, unmount } from "svelte";
import ReadBlock from "./read-block.svelte";
import {
	marshalItemList,
	unmarshalItemList,
	type ItemList,
} from "../../types/item-list";
import type Shadowdark from "../../main";

class ItemListBlockChild extends MarkdownRenderChild {
	private component: ReturnType<typeof mount> | undefined;

	constructor(
		containerEl: HTMLElement,
		private scope: Shadowdark,
		private source: string,
		private ctx: MarkdownPostProcessorContext,
	) {
		super(containerEl);
	}

	onload() {
		let itemList: ItemList;
		try {
			itemList = unmarshalItemList(this.source);
		} catch {
			this.containerEl.setText("Invalid character data.");
			return;
		}

		window.setTimeout(() => {
			const isLivePreview =
				this.containerEl.closest(".markdown-source-view") !== null;

			const isEmbed =
				this.containerEl.closest(".internal-embed, .markdown-embed") !== null;

			const isEditable = isLivePreview && !isEmbed;

			if (isEditable) {
				return;
			}

			this.component = mount(ReadBlock, {
				target: this.containerEl,
				props: {
					items: this.scope.items,
					itemList,
					editable: isEditable,
					onSave: async (updated: ItemList) => {
						const file = this.scope.app.vault.getAbstractFileByPath(
							this.ctx.sourcePath,
						);
						if (!(file instanceof TFile)) return;

						await this.scope.app.vault.process(file, (content) => {
							const section = this.ctx.getSectionInfo(this.containerEl);
							if (!section) return content;

							const { lineStart, lineEnd } = section;
							const newline = content.includes("\r\n") ? "\r\n" : "\n";
							const lines = content.split(/\r?\n/);

							lines.splice(
								lineStart,
								lineEnd - lineStart + 1,
								...marshalItemList(updated).split(/\r?\n/),
							);

							return lines.join(newline);
						});
					},
				},
			});
		}, 0);
	}

	onunload() {
		if (this.component) {
			void unmount(this.component);
		}
	}
}

export function renderItemListBlock(
	scope: Shadowdark,
	source: string,
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext,
) {
	ctx.addChild(new ItemListBlockChild(el, scope, source, ctx));
}
