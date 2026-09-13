import { Menu, Plugin, TAbstractFile, TFile, TFolder } from "obsidian";
import { Item } from "./types/item.svelte";
import { DEFAULT_SETTINGS, type ShadowdarkSettings } from "./settings";
import { renderNpcBlock } from "./blocks/npc";
import { Npc } from "./types/npc.svelte";
import { getRandomItem } from "./generators/random-item";
import { marshalItemList } from "./types/item-list";
import { renderItemListBlock } from "./blocks/item-list";
import { Age } from "./types/age";
import { Abundance } from "./types/abundance";
import { renderItemSet } from "./blocks/item-set";
import { newBase62Id } from "./generators/base-62-id";
import { renderClassBlock } from "./blocks/class";
import { Class } from "./types/class.svelte";
import { Monster } from "./types/monster.svelte";
import { renderEncoutnerTableBlock } from "./blocks/encounter-table";
import { renderMonsterBlock } from "./blocks/monster";
import { renderMonsterInstanceBlock } from "./blocks/monster-instance";
import { Level } from "./types/level";
import { Alignment } from "./types/alignment";
import { Range } from "./types/range";
import { marshalEncounterTable } from "./types/encounter-table";

export default class Shadowdark extends Plugin {
	settings!: ShadowdarkSettings;
	fileItems = new Map<string, { source: string; items: Item[] }>();
	fileClasses = new Map<string, { source: string; items: Class[] }>();
	fileMonsters = new Map<string, { source: string; items: Monster[] }>();

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

	get monsters(): Record<string, Monster> {
		return Object.fromEntries(
			[...this.fileMonsters.values()]
				.flatMap(({ items }) => items)
				.map((monster) => [monster.id, monster]),
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
				this.fileMonsters.delete(oldPath);
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

			renderItemSet(section.text, table, ctx);
		});

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-encounter-table",
			(source, el, ctx) => {
				renderEncoutnerTableBlock(this, source, el, ctx);
			},
		);

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

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-monster",
			(source, el, ctx) => {
				renderMonsterBlock(this, source, el, ctx);
			},
		);

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-monster-instance",
			(source, el, ctx) => {
				renderMonsterInstanceBlock(this, source, el, ctx);
			},
		);

		this.registerEvent(
			this.app.workspace.on("editor-menu", (menu, editor) => {
				menu.addItem((item) => {
					item.setTitle("Shadowdark").setIcon("dices");

					const submenu = (
						item as unknown as { setSubmenu(): Menu }
					).setSubmenu();

					submenu.addItem((item) => {
						item
							.setTitle("Insert Encounter Table")
							.setIcon("table")
							.setSection("insert")
							.onClick(() => {
								editor.replaceSelection(
									marshalEncounterTable({
										title: "New encounter table",
										die: 6,
										encounters: [
											{
												range: { min: 1, max: 3 },
												title: "Something happens",
												description: "Something very interesting happens",
											},
											{
												range: { min: 4, max: 6 },
												title: "Nothin happens",
											},
										],
									}),
								);
							});
					});
				});
			}),
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

							const newFile = await this.app.vault.create(
								path,
								new Class({
									id: newBase62Id("", 10),
									name: "New Class",
									description: "Example Class",
									hitPoints: { count: 1, sides: 6, modifier: 0 },
								}).marshal(),
							);

							await this.app.workspace
								.getLeaf(false)
								.openFile(newFile, { state: { mode: "preview" } });
						});
				});

				menu.addItem((item) => {
					item
						.setTitle("New Monster")
						.setIcon("dices")
						.onClick(async () => {
							const base = `${file.path}/Monster`;
							let path = `${base}.md`;
							let i = 2;

							while (this.app.vault.getAbstractFileByPath(path)) {
								path = `${base} ${i++}.md`;
							}

							const newFile = await this.app.vault.create(
								path,
								new Monster({
									id: newBase62Id("", 10),
									name: "New Monster",
									description: "Example Monster",
									level: Level.ZERO,
									alignment: Alignment.CHAOTIC,
									movement: Range.NEAR,
									hitPoints: { count: 1, sides: 4, modifier: 1 },
									armorClass: 10,
									actions: ["Some sample attack"],
									attributes: [
										{ name: "Some attribute", description: "Some description" },
									],
									stats: {
										strength: 0,
										dexterity: 0,
										constitution: 0,
										intelligence: 0,
										wisdom: 0,
										charisma: 0,
									},
								}).marshal(),
							);

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
					items: tables.flatMap((table) => Item.unmarshalSet(table)),
				});
			} else {
				this.fileItems.delete(file.path);
			}
		}

		const classBlocks = [
			...content.matchAll(
				/^(`{3,}|~{3,})shadowdark-class[^\S\r\n]*\r?\n([\s\S]*?)\r?\n\1[^\S\r\n]*$/gm,
			),
		].map((match) => match[2]!.trim());

		const classSource = classBlocks.join("\n\n");

		if (this.fileClasses.get(file.path)?.source !== classSource) {
			if (classSource) {
				this.fileClasses.set(file.path, {
					source: classSource,
					items: classBlocks.map((block) => Class.unmarshal(block)),
				});
			} else {
				this.fileClasses.delete(file.path);
			}
		}

		const monsterBlocks = [
			...content.matchAll(
				/^(`{3,}|~{3,})shadowdark-monster[^\S\r\n]*\r?\n([\s\S]*?)\r?\n\1[^\S\r\n]*$/gm,
			),
		].map((match) => match[2]!.trim());

		const monsterSource = monsterBlocks.join("\n\n");

		if (this.fileMonsters.get(file.path)?.source !== monsterSource) {
			if (monsterSource) {
				this.fileMonsters.set(file.path, {
					source: monsterSource,
					items: monsterBlocks.map((block) => Monster.unmarshal(block)),
				});
			} else {
				this.fileMonsters.delete(file.path);
			}
		}
	}

	private removeCache(file: TAbstractFile): void {
		this.fileItems.delete(file.path);
		this.fileClasses.delete(file.path);
		this.fileMonsters.delete(file.path);

		if (!(file instanceof TFolder)) return;

		const prefix = `${file.path}/`;

		for (const path of this.fileItems.keys()) {
			if (path.startsWith(prefix)) {
				this.fileItems.delete(path);
			}
		}

		for (const path of this.fileClasses.keys()) {
			if (path.startsWith(prefix)) {
				this.fileClasses.delete(path);
			}
		}

		for (const path of this.fileMonsters.keys()) {
			if (path.startsWith(prefix)) {
				this.fileMonsters.delete(path);
			}
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
