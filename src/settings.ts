import { App, PluginSettingTab } from "obsidian";
import Shadowdark from "./main";

export interface ShadowdarkSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: ShadowdarkSettings = {
	mySetting: "default",
};

export class SettingTab extends PluginSettingTab {
	constructor(app: App, plugin: Shadowdark) {
		super(app, plugin);
	}

	getSettingDefinitions() {
		return [
			{
				name: "Settings #1",
				desc: "It's a secret",
				control: {
					type: "text" as const,
					key: "mySetting",
					placeholder: "Enter your secret",
				},
			},
		];
	}
}
