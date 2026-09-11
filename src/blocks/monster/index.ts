import {
	type MarkdownPostProcessorContext,
	MarkdownRenderChild,
	TFile,
} from "obsidian";
import { mount, unmount } from "svelte";
import ReadBlock from "./read-block.svelte";
import type Shadowdark from "../../main";
import { Monster } from "../../types/monster.svelte";

class MonsterBlockChild extends MarkdownRenderChild {
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
		let monster: Monster;
		try {
			monster = Monster.unmarshal(this.source);
		} catch {
			this.containerEl.setText("Invalid monster data!");
			return;
		}

		this.component = mount(ReadBlock, {
			target: this.containerEl,
			props: {
				scope: this.scope,
				monster,
				onSave: async (updated: Monster) => {
					const section = this.ctx.getSectionInfo(this.containerEl);
					if (!section) return;

					const file = this.scope.app.vault.getAbstractFileByPath(
						this.ctx.sourcePath,
					);

					if (!(file instanceof TFile)) return;

					await this.scope.app.vault.process(file, (content) => {
						const newline = content.includes("\r\n") ? "\r\n" : "\n";
						const lines = content.split(/\r?\n/);

						lines.splice(
							section.lineStart,
							section.lineEnd - section.lineStart + 2,
							updated.marshal(),
						);

						return lines.join(newline);
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

export function renderMonsterBlock(
	scope: Shadowdark,
	source: string,
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext,
) {
	ctx.addChild(new MonsterBlockChild(el, scope, source, ctx));
}
