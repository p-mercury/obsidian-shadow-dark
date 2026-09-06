import {
	type MarkdownPostProcessorContext,
	MarkdownRenderChild,
} from "obsidian";
import { mount, unmount } from "svelte";
import ReadBlock from "./read-block.svelte";
import type Shadowdark from "../../main";
import {
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
			this.containerEl.setText("Invalid encounter table.");
			return;
		}

		this.component = mount(ReadBlock, {
			target: this.containerEl,
			props: {
				monsters: this.scope.monsters,
				encounterTable,
			},
		});
	}

	private renderCodeBlock() {
		this.containerEl.empty();

		const pre = this.containerEl.createEl("pre");
		const code = pre.createEl("code");

		code.addClass("language-encounter-table");
		code.setText(this.source);
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
