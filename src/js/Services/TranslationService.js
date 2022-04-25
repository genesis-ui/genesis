export class TranslationService {
    /** @type {{}} **/
    static #translations = {};

    /**
     * @param {string} locale
     * @param {string} group
     * @param {string} key
     * @param {string} value
     * @returns {TranslationService}
     */
    add(locale, group, key, value) {
        this.#ensureObjectsExist(locale, group);

        TranslationService.#translations[locale][group][key] = value;

        return this;
    }

    /**
     * @param {string} locale
     * @param {string} group
     * @returns void
     */
    #ensureObjectsExist(locale, group) {
        if (!TranslationService.#translations?.[locale]) {
            TranslationService.#translations[locale] = {};
        }

        if (!TranslationService.#translations[locale]?.[group]) {
            TranslationService.#translations[locale][group] = {};
        }
    }

    /**
     * @param {string} locale
     * @param {string} group
     * @param {string} key
     * @returns {string}
     */
    trans(locale, group, key) {
        return TranslationService.#translations?.[locale]?.[group]?.[key] ?? group + '::' + key;
    }

    /**
     * @param {string} query
     * @param {string} locale
     * @returns {?string}
     */
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