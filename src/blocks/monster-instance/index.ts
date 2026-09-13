import {
	type MarkdownPostProcessorContext,
	MarkdownRenderChild,
	TFile,
} from "obsidian";
import { mount, unmount } from "svelte";
import ReadBlock from "./read-block.svelte";
import type Shadowdark from "../../main";
import { MonsterInstance } from "../../types/monster-instance.svelte";

class MonsterInstanceBlockChild extends MarkdownRenderChild {
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
		let monsterInstance: MonsterInstance;
		try {
			monsterInstance = MonsterInstance.unmarshal(this.source);
		} catch {
			this.containerEl.setText("Invalid monster instance data!");
			return;
		}

		this.component = mount(ReadBlock, {
			target: this.containerEl,
			props: {
				scope: this.scope,
				monsterInstance,
				onSave: async (updated: MonsterInstance) => {
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
							...updated.marshal().split(/\r?\n/),
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

export function renderMonsterInstanceBlock(
	scope: Shadowdark,
	source: string,
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext,
) {
	ctx.addChild(new MonsterInstanceBlockChild(el, scope, source, ctx));
}
