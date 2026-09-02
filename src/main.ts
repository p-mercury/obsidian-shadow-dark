import { Plugin, TAbstractFile, TFile, TFolder } from "obsidian";
import { Item } from "./types/item.svelte";
import { DEFAULT_SETTINGS, type ShadowdarkSettings } from "./settings";
import { renderNpcBlock } from "./blocks/npc-block";
import { Npc } from "./types/npc.svelte";
import { getRandomItem } from "./generators/random-item";
import { marshalItemList } from "./types/item-list";
import { renderItemListBlock } from "./blocks/item-list";
import { Age } from "./types/age";
import { Abundance } from "./types/abundance";
import { renderItemTable } from "./blocks/item-table";
import { newBase62Id } from "./generators/base-62-id";
import { renderClassBlock } from "./blocks/class-block";
import { Class } from "./types/class.svelte";

export default class Shadowdark extends Plugin {
	settings!: ShadowdarkSettings;
	fileItems = new Map<string, { source: string; items: Item[] }>();
	fileClasses = new Map<string, { source: string; items: Class[] }>();

	get items(): Record<string, Item> {
		return Object.fromEntries(
			[...this.fileItems.values()]
				.flatMap(({ items }) => items)
				.map((item) => [item.id, item]),
		);
	}

	get classes(): Record<string, Class> {
		return Object.fromEntries(
			[...this.fileClasses.values()]
				.flatMap(({ items }) => items)
				.map((clas) => [clas.id, clas]),
		);
	}

	async onload(): Promise<void> {
		await this.loadSettings();

		await Promise.all(
			this.app.vault.getMarkdownFiles().map((file) => this.updateCache(file)),
		);

		this.registerEvent(
			this.app.vault.on("modify", (file) => {
				if (file instanceof TFile && file.extension === "md") {
					void this.updateCache(file);
				}
			}),
		);

		this.registerEvent(
			this.app.vault.on("create", (file) => {
				if (file instanceof TFile && file.extension === "md") {
					void this.updateCache(file);
				}
			}),
		);

		this.registerEvent(
			this.app.vault.on("delete", (file) => {
				this.removeCache(file);
			}),
		);

		this.registerEvent(
			this.app.vault.on("rename", (file, oldPath) => {
				this.fileItems.delete(oldPath);
				this.fileClasses.delete(oldPath);

				if (file instanceof TFile && file.extension === "md") {
					void this.updateCache(file);
				}
			}),
		);

		this.registerMarkdownPostProcessor((el, ctx) => {
			const section = ctx.getSectionInfo(el);
			if (!section) return;

			const marker = "^shadowdark-item-set";

			if (!section.text.split(/\r?\n/).some((line) => line.trim() === marker)) {
				return;
			}

			const table = el.querySelector("table");
			if (!table) return;

			renderItemTable(this.app, section.text, table, ctx);
		});

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-npc",
			(source, el, ctx) => {
				renderNpcBlock(this, source, el, ctx);
			},
		);

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-class",
			(source, el, ctx) => {
				renderClassBlock(this, source, el, ctx);
			},
		);

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-item-list",
			(source, el, ctx) => {
				renderItemListBlock(this, source, el, ctx);
			},
		);

		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				if (!(file instanceof TFolder)) return;

				menu.addItem((item) => {
					item
						.setTitle("New Item Set")
						.setIcon("dices")
						.onClick(async () => {
							const base = `${file.path}/Item Set`;
							let path = `${base}.md`;
							let i = 2;

							while (this.app.vault.getAbstractFileByPath(path)) {
								path = `${base} ${i++}.md`;
							}

							const newFile = await this.app.vault.create(
								path,
								`| Id         | Name         | Description         | Items Per Slot | Stack Size | Free To Carry | Cost | Abundance |
| ---------- | ------------ | ------------------- | -------------- | ---------- | ------------- | ---- | --------- |
| ${newBase62Id("", 10)} | Example item | Example description | 1             | 1         | 0             | 1gp  | Common    |
^shadowdark-item-set`,
							);

							await this.app.workspace
								.getLeaf(false)
								.openFile(newFile, { state: { mode: "preview" } });
						});
				});

				menu.addItem((item) => {
					item
						.setTitle("New Class")
						.setIcon("dices")
						.onClick(async () => {
							const base = `${file.path}/Class`;
							let path = `${base}.md`;
							let i = 2;

							while (this.app.vault.getAbstractFileByPath(path)) {
								path = `${base} ${i++}.md`;
							}

							const clas = new Class({
								id: newBase62Id("", 10),
								name: "New Class",
								description: "Example Class",
								hitPoints: { count: 1, sides: 6, modifier: 0 },
							});

							const newFile = await this.app.vault.create(path, clas.marshal());

							await this.app.workspace
								.getLeaf(false)
								.openFile(newFile, { state: { mode: "preview" } });
						});
				});

				menu.addItem((item) => {
					item
						.setTitle("Random NPC")
						.setIcon("dices")
						.onClick(async () => {
							const character = Npc.random({
								classes: Object.values(this.classes),
							});

							const name =
								typeof character === "object" &&
								character !== null &&
								"name" in character &&
								typeof character.name === "string"
									? character.name
									: "Character";

							const safeName = name.replace(/[\\/:*?"<>|]/g, "-");
							const path = `${file.path}/${safeName}.md`;

							const characterFile = await this.app.vault.create(
								path,
								character.marshal(),
							);

							await this.app.workspace
								.getLeaf(false)
								.openFile(characterFile, { state: { mode: "preview" } });
						});
				});

				menu.addItem((item) => {
					item
						.setTitle("Random Shop")
						.setIcon("dices")
						.onClick(async () => {
							const npc = Npc.random({
								classes: Object.values(this.classes),
								ages: [
									Age.YOUNG_ADULT,
									Age.ADULT,
									Age.MIDDLE_AGED,
									Age.ELDERLY,
								],
							});
							const shopName = `${npc.name}'s Little Shop`;
							const safeName = shopName.replace(/[\\/:*?"<>|]/g, "-");
							const path = `${file.path}/${safeName}.md`;
							const itemCount = Math.floor(Math.random() * 4) + 8;
							const uniqueItems = new Map<
								string,
								{ id: string; quantity: number }
							>();

							while (uniqueItems.size < itemCount) {
								const stackRanges = {
									[Abundance.SCARCE]: { min: 1, max: 1 },
									[Abundance.COMMON]: { min: 1, max: 2 },
									[Abundance.ABUNDANT]: { min: 2, max: 3 },
								};

								const item = getRandomItem(Object.values(this.items));
								if (uniqueItems.has(item.id)) continue;

								const { min, max } = stackRanges[item.abundance];

								uniqueItems.set(item.id, {
									id: item.id,
									quantity:
										(Math.floor(Math.random() * (max - min + 1)) + min) *
										item.stackSize,
								});
							}

							const shopFile = await this.app.vault.create(
								path,
								`${npc.marshal()}\n\n${marshalItemList({
									title: "Inventory",
									items: [...uniqueItems.values()],
								})}`,
							);

							await this.app.workspace
								.getLeaf(false)
								.openFile(shopFile, { state: { mode: "preview" } });
						});
				});
			}),
		);
	}

	onunload(): void {
		document
			.querySelectorAll('style[id^="svelte-"]')
			.forEach((el) => el.remove());
	}

	private async updateCache(file: TFile): Promise<void> {
		const content = await this.app.vault.cachedRead(file);
		const lines = content.split(/\r?\n/);
		const tables: string[] = [];

		for (let i = 0; i < lines.length; i++) {
			if (lines[i]?.trim() !== "^shadowdark-item-set") continue;

			let end = i - 1;
			while (end >= 0 && !lines[end]?.trim()) end--;

			let start = end;
			while (start >= 0 && lines[start]?.trim().startsWith("|")) start--;

			const table = lines.slice(start + 1, end + 1).join("\n");
			if (table) tables.push(table);
		}

		const itemSource = tables.join("\n\n");

		if (this.fileItems.get(file.path)?.source !== itemSource) {
			if (itemSource) {
				this.fileItems.set(file.path, {
					source: itemSource,
					items: tables.flatMap((table) => Item.unmarshalList(table)),
				});
			} else {
				this.fileItems.delete(file.path);
			}
		}

		const blocks = [
			...content.matchAll(
				/^(`{3,}|~{3,})shadowdark-class[^\S\r\n]*\r?\n([\s\S]*?)\r?\n\1[^\S\r\n]*$/gm,
			),
		].map((match) => match[2]!.trim());

		const classSource = blocks.join("\n\n");

		if (this.fileClasses.get(file.path)?.source !== classSource) {
			if (classSource) {
				this.fileClasses.set(file.path, {
					source: classSource,
					items: blocks.map((block) => Class.unmarshal(block)),
				});
			} else {
				this.fileClasses.delete(file.path);
			}
		}
	}

	private removeCache(file: TAbstractFile): void {
		this.fileItems.delete(file.path);
		this.fileClasses.delete(file.path);

		if (!(file instanceof TFolder)) return;

		const prefix = `${file.path}/`;

		for (const path of this.fileItems.keys()) {
			if (path.startsWith(prefix)) this.fileItems.delete(path);
		}

		for (const path of this.fileClasses.keys()) {
			if (path.startsWith(prefix)) this.fileClasses.delete(path);
		}
	}

	private async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<ShadowdarkSettings>,
		);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
