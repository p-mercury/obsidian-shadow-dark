import { Plugin, TAbstractFile, TFile, TFolder } from "obsidian";
import { Item } from "./types/item.svelte";
import { DEFAULT_SETTINGS, type ShadowdarkSettings } from "./settings";
import { getRandomPc } from "./generators/random-pc";
import { renderPcBlock } from "./blocks/pc-block";
import { renderNpcBlock } from "./blocks/npc-block";
import { marshalPc } from "./types/pc";
import { Npc } from "./types/npc.svelte";
import { getRandomItem } from "./generators/random-item";
import { marshalItemList } from "./types/item-list";
import { renderItemListBlock } from "./blocks/item-list";
import { Age } from "./types/age";
import { Abundance } from "./types/abundance";
import { renderItemTable } from "./blocks/item-table";

export default class Shadowdark extends Plugin {
	settings!: ShadowdarkSettings;
	fileItems = new Map<string, { source: string; items: Item[] }>();

	get items(): Record<string, Item> {
		return Object.fromEntries(
			[...this.fileItems.values()]
				.flatMap(({ items }) => items)
				.map((item) => [item.id, item]),
		);
	}

	async onload(): Promise<void> {
		await this.loadSettings();

		await Promise.all(
			this.app.vault
				.getMarkdownFiles()
				.map((file) => this.updateItemCache(file)),
		);

		this.registerEvent(
			this.app.vault.on("modify", (file) => {
				if (file instanceof TFile && file.extension === "md") {
					void this.updateItemCache(file);
				}
			}),
		);

		this.registerEvent(
			this.app.vault.on("create", (file) => {
				if (file instanceof TFile && file.extension === "md") {
					void this.updateItemCache(file);
				}
			}),
		);

		this.registerEvent(
			this.app.vault.on("delete", (file) => {
				this.removeItemCache(file);
			}),
		);

		this.registerEvent(
			this.app.vault.on("rename", (file, oldPath) => {
				this.fileItems.delete(oldPath);

				if (file instanceof TFile && file.extension === "md") {
					void this.updateItemCache(file);
				}
			}),
		);

		this.registerMarkdownPostProcessor((el, ctx) => {
			const section = ctx.getSectionInfo(el);
			if (!section) {
				return;
			}

			const marker = "^shadowdark-items";
			if (!section.text.split(/\r?\n/).some((line) => line.trim() === marker)) {
				return;
			}

			const table = el.querySelector("table");
			if (!table) {
				return;
			}

			renderItemTable(this.app, section.text, table, ctx);
		});

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-pc",
			(source, el, ctx) => {
				renderPcBlock(this.app, source, el, ctx);
			},
		);

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-npc",
			(source, el, ctx) => {
				renderNpcBlock(this, source, el, ctx);
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
						.setTitle("Random PC")
						.setIcon("dices")
						.onClick(() => {
							void this.createCharacterFile(file, getRandomPc(), marshalPc);
						});
				});

				menu.addItem((item) => {
					item
						.setTitle("Random NPC")
						.setIcon("dices")
						.onClick(async () => {
							const character = Npc.random();

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
								const STACK_RANGES = {
									[Abundance.SCARCE]: { min: 1, max: 1 },
									[Abundance.COMMON]: { min: 1, max: 2 },
									[Abundance.ABUNDANT]: { min: 2, max: 3 },
								};

								const item = getRandomItem(Object.values(this.items));
								if (uniqueItems.has(item.id)) continue;
								const { min, max } = STACK_RANGES[item.abundance];

								uniqueItems.set(item.id, {
									id: item.id,
									quantity:
										(Math.floor(Math.random() * (max - min + 1)) + min) *
										item.stackSize,
								});
							}
							const items = [...uniqueItems.values()];

							const shopFile = await this.app.vault.create(
								path,
								npc.marshal() +
									"\n\n" +
									marshalItemList({ title: "Inventory", items }),
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

	private async createCharacterFile<T>(
		folder: TFolder,
		character: T,
		marshal: (character: T) => string,
	): Promise<void> {
		const name =
			typeof character === "object" &&
			character !== null &&
			"name" in character &&
			typeof character.name === "string"
				? character.name
				: "Character";

		const safeName = name.replace(/[\\/:*?"<>|]/g, "-");
		const path = `${folder.path}/${safeName}.md`;

		const characterFile = await this.app.vault.create(path, marshal(character));

		await this.app.workspace
			.getLeaf(false)
			.openFile(characterFile, { state: { mode: "preview" } });
	}

	private async updateItemCache(file: TFile): Promise<void> {
		const content = await this.app.vault.cachedRead(file);
		const lines = content.split(/\r?\n/);
		const tables: string[] = [];

		for (let i = 0; i < lines.length; i++) {
			if (lines[i]?.trim() !== "^shadowdark-items") continue;

			let end = i - 1;
			while (end >= 0 && !lines[end]?.trim()) end--;

			let start = end;
			while (start >= 0 && lines[start]?.trim().startsWith("|")) {
				start--;
			}

			const table = lines.slice(start + 1, end + 1).join("\n");
			if (table) tables.push(table);
		}

		const source = tables.join("\n\n");

		// The marked tables did not change.
		if (this.fileItems.get(file.path)?.source === source) {
			return;
		}

		if (!source) {
			this.fileItems.delete(file.path);
			return;
		}

		const items = (
			await Promise.all(tables.map((table) => Item.unmarshalList(table)))
		).flat();

		this.fileItems.set(file.path, { source, items });
	}

	private removeItemCache(file: TAbstractFile): void {
		this.fileItems.delete(file.path);

		if (file instanceof TFolder) {
			const prefix = `${file.path}/`;

			for (const path of this.fileItems.keys()) {
				if (path.startsWith(prefix)) {
					this.fileItems.delete(path);
				}
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
