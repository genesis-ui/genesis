import {app} from "../GenesisApp";
import {Router} from './Router';

export class Goto {
    /**
     * @returns {Router}
     */
    static #getRouter() {
        return app().make('app::router');
    }

    static route(name, parameters = {}, query = {}) {
        /** @type {Router} **/
        const router = this.#getRouter();

        const path = router.toRoute(name, parameters);

        app().catchHandle(() => {
            const request = router.route(path, query);

            this.#handle(request);
        }, true);
    }

    static url(url) {
        app().catchHandle(() => {
            const request = this.#getRouter().routeUrl(url);

            this.#handle(request);
        }, true);
    }

    static path(path, query) {
        app().catchHandle(() => {
            const request = this.#getRouter().route(path, query);

            this.#handle(request);
        }, true);
    }

    static #handle(request) {
        app().make('app::renderer').render(request);
    }

    static history(state) {
        const path = state.path;
        const queryParams = state.queryParams;

        app().catchHandle(() => {
            const request = this.#getRouter().route(path, queryParams);

            request.setIsHistory(true);

            this.#handle(request);
        }, true);
    }
}