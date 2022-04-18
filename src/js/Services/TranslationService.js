export class TranslationService {
    static #translations = {};

    add(locale, group, key, value) {
        this.#ensureObjectsExist(locale, group);

        TranslationService.#translations[locale][group][key] = value;

        return this;
    }

    #ensureObjectsExist(locale, group) {
        if (!TranslationService.#translations?.[locale]) {
            TranslationService.#translations[locale] = {};
        }

        if (!TranslationService.#translations[locale]?.[group]) {
            TranslationService.#translations[locale][group] = {};
        }
    }

    trans(locale, group, key) {
        return TranslationService.#translations?.[locale]?.[group]?.[key] ?? group + '::' + key;
    }

    search(query, locale) {
        const queryParts = query.split('::');

        if (queryParts.length !== 2) {
            return null;
        }

        const group = queryParts[0];
        const key = queryParts[1];

        const items = TranslationService.#translations?.[locale]?.[group];

        if (!items) {
            return null;
        }

        let results = {};

        for (const [itemKey, value] of Object.entries(items)) {
            if (itemKey.indexOf(key) !== -1) {
                results[itemKey] = value;
            }
        }

        return results.length > 0 ? results : null;
    }
}