import {get} from "../GenesisApp";
import {Router} from './Router';

export class Goto {
    /**
     * @returns {Router}
     */
    static #getRouter() {
        return get().make('app::router');
    }

    static route(name, parameters = {}, query = {}) {
        /** @type {Router} **/
        const router = this.#getRouter();

        const path = router.toRoute(name, parameters);

        const request = router.route(path, query);

        this.#handle(request);
    }

    static url(url) {
        const request = this.#getRouter().routeUrl(url);

        this.#handle(request);
    }

    static path(path, query) {
        const request = this.#getRouter().route(path, query);

        this.#handle(request);
    }

    static #handle(request) {
        get().make('app::renderer').render(request);
    }

    static history(state) {
        const path = state.path;
        const queryParams = state.queryParams;

        const request = this.#getRouter().route(path, queryParams);

        request.setIsHistory(true);

        this.#handle(request);
    }
}