import {
	type MarkdownPostProcessorContext,
	MarkdownRenderChild,
	TFile,
} from "obsidian";
import { mount, unmount } from "svelte";
import ReadBlock from "./read-block.svelte";
import type Shadowdark from "../../main";
import {
	marshalEncounterTable,
	unmarshalEncounterTable,
	type EncounterTable,
} from "../../types/encounter-table";

class EncoutnerTableBlockChild extends MarkdownRenderChild {
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
		let encounterTable: EncounterTable;
		try {
			encounterTable = unmarshalEncounterTable(this.source);
		} catch {
			this.containerEl.setText("Invalid encounter table data!");
			return;
		}

		this.component = mount(ReadBlock, {
			target: this.containerEl,
			props: {
				scope: this.scope,
				encounterTable,
				onSave: async (updated: EncounterTable) => {
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
							...marshalEncounterTable(updated).split(/\r?\n/),
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

export function renderEncoutnerTableBlock(
	scope: Shadowdark,
	source: string,
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext,
) {
	ctx.addChild(new EncoutnerTableBlockChild(el, scope, source, ctx));
}
