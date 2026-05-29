import { App, PluginSettingTab, Setting } from 'obsidian';
import HelloWorldPlugin from './main';

export interface BlogPublishSettings {
    storageAccountName: string;
}

export const DEFAULT_SETTINGS: BlogPublishSettings = {
    storageAccountName: 'default',
};

export class SampleSettingTab extends PluginSettingTab {
    plugin: HelloWorldPlugin;

    constructor(app: App, plugin: HelloWorldPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Storage Account Name')
            .setDesc("Name of the storage account to upload posts to.")
            .addText((text) =>
                text
                    .setPlaceholder('Enter your secret')
                    .setValue(this.plugin.settings.storageAccountName)
                    .onChange(async (value) => {
                        this.plugin.settings.storageAccountName = value;
                        await this.plugin.saveSettings();
                    }),
            );
    }
}
