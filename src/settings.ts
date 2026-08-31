import { App, PluginSettingTab, Setting } from "obsidian";
import Shadowdark from "./main";

export interface ShadowdarkSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: ShadowdarkSettings = {
	mySetting: "default",
};

export class SettingTab extends PluginSettingTab {
	plugin: Shadowdark;

	constructor(app: App, plugin: Shadowdark) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Settings #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
