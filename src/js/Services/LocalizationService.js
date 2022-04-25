import {Enum} from "../Abstract/Enum";

/**
 * @property {string} LANGUAGE
 * @property {string} LANGUAGE
 * @property {string} LANGUAGE
 */
class LocaleType {
}

Enum.create(LocaleType, {
    LANGUAGE: 'language',
    DATE: 'date',
    NUMBER: 'number',
});

/**
 * @property {?string} #languageLocale
 * @property {?string} #dateLocale
 * @property {?string} #numberLocale
 */
export class LocalizationService {
    static LocaleType() {
        return LocaleType;
    }

    /** @type {?string} **/
    static #languageLocale = null;

    /** @type {?string} **/
    static #dateLocale = null;

    /** @type {?string} **/
    static #numberLocale = null;

    /**
     * @param {LocaleType} localeType
     * @param {string} locale
     * @returns void
     */
    setLocale(localeType, locale) {
        switch (localeType) {
            case LocaleType.DATE:
                LocalizationService.#dateLocale = locale;
                break;
            case LocaleType.LANGUAGE:
                LocalizationService.#languageLocale = locale;
                break;
            case LocaleType.NUMBER:
                LocalizationService.#numberLocale = locale;
                break;
        }
    }

    /**
     * @param {LocaleType} localeType
     * @param {?string} defaultLocale
     * @returns {string|null}
     */
    getLocale(localeType, defaultLocale = null) {
        switch (localeType) {
            case LocaleType.DATE:
                return LocalizationService.#dateLocale ?? defaultLocale;
            case LocaleType.LANGUAGE:
                return LocalizationService.#languageLocale ?? defaultLocale;
            case LocaleType.NUMBER:
                return LocalizationService.#numberLocale ?? defaultLocale;
        }
    }

}