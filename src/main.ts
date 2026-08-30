import { Plugin, TFolder } from "obsidian";

import { DEFAULT_SETTINGS, type ShadowdarkSettings } from "./settings";
import { CharacterModal } from "./modals/character-modal";
import { getRandomNpc } from "./generators/random-npc";
import { getRandomPc } from "./generators/random-pc";

import { renderPcBlock } from "./blocks/pc-block";
import { renderNpcBlock } from "./blocks/npc-block";
import { marshalPc } from "./types/pc";
import { marshalNpc } from "./types/npc";
import { getRandomItem } from "./generators/random-item";
import { marshalItemList } from "./types/item-list";
import { renderItemListBlock } from "./blocks/item-list";

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
						.setTitle("New PC")
						.setIcon("user-plus")
						.onClick(() => {
							new CharacterModal(this.app, getRandomPc()).open();
						});
				});

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
						.onClick(() => {
							void this.createCharacterFile(file, getRandomNpc(), marshalNpc);
						});
				});

				menu.addItem((item) => {
					item
						.setTitle("Random Shop")
						.setIcon("dices")
						.onClick(async () => {
							const npc = getRandomNpc();
							const shopName = `${npc.name}'s Little Shop`;

							const safeName = shopName.replace(/[\\/:*?"<>|]/g, "-");
							const path = `${file.path}/${safeName}.md`;

							const items = Array.from(
								{ length: Math.floor(Math.random() * 6) + 5 },
								() => getRandomItem(),
							);

							const shopFile = await this.app.vault.create(
								path,
								marshalNpc(npc) +
									"\n\n" +
									marshalItemList({ title: "Inventory", items }),
							);
							await this.app.workspace.getLeaf(false).openFile(shopFile);
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
