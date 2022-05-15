import {Utility} from "../Utility/Utility";

export class ConfigService {
    static #config = {};
    static #keyedConfig = {};

    add(name, config) {
        if (ConfigService.#config?.[name] === null) {
            ConfigService.#config[name] = {};
        }

        ConfigService.#config[name] = Utility.merge(ConfigService.#config[name], config);

        for (const [key, value] of Object.entries(ConfigService.#config[name])) {
            ConfigService.#keyedConfig[name + '.' + key] = value;
        }
    }

    get(key) {
        return ConfigService.#keyedConfig?.[key];
    }

    getObj(name, key = null) {
        if (ConfigService?.#config[name] === null) {
            return null;
        }

        if (!key) {
            return ConfigService.#config[name];
        }

        const configDomain = ConfigService.#config[name];

        const keyParts = key.split('.');

        let currentItem = configDomain?.[keyParts[0]];

        for (let i = 0; i <= keyParts.length; i++) {
            if (!currentItem) {
                return null;
            }

            currentItem = currentItem?.[keyParts[i]];

            if (i === keyParts.length - 1) {
                return currentItem;
            }
        }
    }
}