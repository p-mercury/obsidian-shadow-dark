import {
	App,
	type MarkdownPostProcessorContext,
	MarkdownRenderChild,
	TFile,
} from "obsidian";
import { mount, unmount } from "svelte";
import ReadBlock from "./read-block.svelte";
import WriteBlock from "./write-block.svelte";
import { marshalNpc, unmarshalNpc, type Npc } from "../../types/npc";

class NpcBlockChild extends MarkdownRenderChild {
	private component: ReturnType<typeof mount> | undefined;

	constructor(
		containerEl: HTMLElement,
		private app: App,
		private source: string,
		private ctx: MarkdownPostProcessorContext,
	) {
		super(containerEl);
	}

	onload() {
		let character: Npc;

		try {
			console.log(this.source);
			character = unmarshalNpc(this.source);
		} catch {
			this.containerEl.setText("Invalid character data.");
			return;
		}

		setTimeout(() => {
			const isLivePreview =
				this.containerEl.closest(".markdown-source-view") !== null;

			const isEmbed =
				this.containerEl.closest(".internal-embed, .markdown-embed") !== null;

			const isEditable = isLivePreview && !isEmbed;

			const TargetComponent = isEditable ? WriteBlock : ReadBlock;

			this.component = mount(TargetComponent, {
				target: this.containerEl,
				props: {
					npc: character,
					editable: isEditable,
					onSave: async (updated: Npc) => {
						if (!isEditable) {
							return;
						}

						const section = this.ctx.getSectionInfo(this.containerEl);

						if (!section) {
							return;
						}

						const file = this.app.vault.getAbstractFileByPath(
							this.ctx.sourcePath,
						);

						if (!(file instanceof TFile)) {
							return;
						}

						await this.app.vault.process(file, (content) => {
							const lines = content.split("\n");

							lines.splice(
								section.lineStart,
								section.lineEnd - section.lineStart + 1,
								marshalNpc(updated),
							);

							return lines.join("\n");
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

export function renderNpcBlock(
	app: App,
	source: string,
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext,
) {
	ctx.addChild(new NpcBlockChild(el, app, source, ctx));
}
