import {
	type MarkdownPostProcessorContext,
	MarkdownRenderChild,
	TFile,
} from "obsidian";
import { mount, unmount } from "svelte";
import ReadBlock from "./read-block.svelte";
import type Shadowdark from "../../main";
import { Class } from "../../types/class.svelte";

class ClassBlockChild extends MarkdownRenderChild {
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
		const isLivePreview =
			this.containerEl.closest(".markdown-source-view") !== null;

		const isEmbed =
			this.containerEl.closest(".internal-embed, .markdown-embed") !== null;

		const isEditable = isLivePreview && !isEmbed;

		if (isEditable) {
			return;
		}

		let clas: Class;

		try {
			clas = Class.unmarshal(this.source);
		} catch {
			this.containerEl.setText("Invalid character data.");
			return;
		}

		this.component = mount(ReadBlock, {
			target: this.containerEl,
			props: {
				class: clas,
				onSave: async (updated: Class) => {
					const section = this.ctx.getSectionInfo(this.containerEl);
					if (!section) return;

					const file = this.scope.app.vault.getAbstractFileByPath(
						this.ctx.sourcePath,
					);

					if (!(file instanceof TFile)) return;

					await this.scope.app.vault.process(file, (content) => {
						const lines = content.split(/\r?\n/);
						const replacement = updated.marshal().split("\n");

						lines.splice(
							section.lineStart,
							section.lineEnd - section.lineStart + 2,
							...replacement,
						);

						return lines.join("\n");
					});
				},
			},
		});
	}

	onunload() {
		if (this.component) {
			void unmount(this.component);
		}
	}
}

export function renderClassBlock(
	scope: Shadowdark,
	source: string,
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext,
) {
	ctx.addChild(new ClassBlockChild(el, scope, source, ctx));
}
