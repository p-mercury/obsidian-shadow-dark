import { Plugin, TFolder } from "obsidian";

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

export default class Shadowdark extends Plugin {
	settings!: ShadowdarkSettings;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-pc",
			(source, el, ctx) => {
				renderPcBlock(this.app, source, el, ctx);
			},
		);

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-npc",
			(source, el, ctx) => {
				renderNpcBlock(this.app, source, el, ctx);
			},
		);

		this.registerMarkdownCodeBlockProcessor(
			"shadowdark-item-list",
			(source, el, ctx) => {
				renderItemListBlock(this.app, source, el, ctx);
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

							await this.app.workspace.getLeaf(false).openFile(characterFile);
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
							const uniqueItems = new Map();
							while (uniqueItems.size < itemCount) {
								const STACK_RANGES = {
									[Abundance.SCARCE]: { min: 1, max: 1 },
									[Abundance.COMMON]: { min: 1, max: 2 },
									[Abundance.ABUNDANT]: { min: 2, max: 3 },
								};

								const item = getRandomItem();
								if (uniqueItems.has(item.name)) continue;
								const { min, max } = STACK_RANGES[item.abundance];

								uniqueItems.set(item.name, {
									...item,
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

		await this.app.workspace.getLeaf(false).openFile(characterFile);
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
