import {AbstractClass} from "../Abstract/AbstractClass";
import {TranslationService} from "../Services/TranslationService";
import {RouteService} from "../Services/RouteService";

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
     * @returns this
     */
    addListener(event, listener) {

        document.addEventListener('gui.done', () => {
            addEventListener(event, (originalEvent) => {
                new listener().handle(originalEvent);
            });
        });

        return this;
    }

    /**
     * @param {Object.<group.<string>, Object.<key.<string>, value.<string>>>} translations
     * @param {string} locale
     * @returns this
     */
    addTranslations(translations, locale) {
        const translationService = new TranslationService();

        for (const [group, items] of Object.entries(translations)) {
            for (const [key, value] of Object.entries(items)) {
                translationService.add(locale, group, key, value);
            }
        }

        return this;
    }

    /**
     * @param {callback} routes
     * @returns this
     */
    loadRoutes(routes) {
        const routeService = new RouteService();

        routeService.registerCallback(routes);

        return this;
    }

    /**
     * @param {string|function} middleware
     * @returns this
     */
    attachGlobalMiddleware(middleware) {
        this._app.make('app::view-kernel').attachGlobalMiddleware(middleware);

        return this;
    }
}