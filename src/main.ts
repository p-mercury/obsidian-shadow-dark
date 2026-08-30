import { Plugin, TFolder } from "obsidian";
import { DEFAULT_SETTINGS, ShadowdarkSettings } from "./settings";
import { CharacterModal } from "./modals/character-modal";
import { Background, type Character } from "./types";
import { Ancestry } from "./types/ancestry";

export default class Shadowdark extends Plugin {
	settings!: ShadowdarkSettings;

	async onload() {
		await this.loadSettings();

		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				// Only show when right-clicking a folder.
				if (!(file instanceof TFolder)) {
					return;
				}

				menu.addItem((item) => {
					item
						.setTitle("New character")
						.setIcon("user-plus")
						.onClick(() => {
							const character: Character = {
								name: "Thorin",
								background: Background.MINSTREL,
								ancestry: Ancestry.GOBLIN,

								hitPoints: 10,

								stats: {
									strength: 1,
									dexterity: 2,
									constitution: 3,
									intelligence: 4,
									wisdom: 5,
									charisma: 6,
								},
							};

							new CharacterModal(this.app, character).open();
						});
				});
			}),
		);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<ShadowdarkSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
