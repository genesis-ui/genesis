import {AbstractClass} from "../Abstract/AbstractClass";
import {TranslationService} from "../Services/TranslationService";

const namespace = 'GenesisUI::Providers';

/**
 * @extends AbstractClass
 */
export class AbstractServiceProvider extends AbstractClass {
    /** @type {Genesis} **/
    _app;

    /**
     * @param {Genesis} app
     */
    constructor(app) {
        super(namespace + '::AbstractServiceProvider');

        this._app = app;
    }

    /**
     * @abstract
     * @returns void
     */
    boot() {
        this._notImplemented('boot');
    }

    /**
     * @abstract
     * @returns void
     */
    register() {
        this._notImplemented('register');
    }

    /**
     * @param {string} event
     * @param {Class<AbstractListener>} listener
     * @param {boolean} registerAsGlobal
     * @returns this
     */
    addListener(event, listener, registerAsGlobal = false) {

        document.addEventListener('gui.done', (doneEvent) => {

                document.addEventListener(event, (originalEvent) => {
                    new listener().handle(originalEvent);
                })
        });

        return this;
    }

    /**
     * @param {Object.<group.<string>, Object.<key.<string>, value.<string>>>} translations
     * @param {string} locale
     */
    addTranslations(translations, locale) {
        const translationService = new TranslationService();

        for (const [group, items] of Object.entries(translations)) {
            for (const [key, value] of Object.entries(items)) {
                translationService.add(locale, group, key, value);
            }
        }
    }
}