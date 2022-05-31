import {gns} from "../GenesisApp";
import {Router} from './Router';

export class Goto {
    /**
     * @returns {Router}
     */
    static #getRouter() {
        return gns().make('app::router');
    }

    static route(name, parameters = {}, query = {}) {
        /** @type {Router} **/
        const router = this.#getRouter();

        const path = router.toRoute(name, parameters);

        gns().catchHandle(() => {
            const request = router.route(path, query);

            this.#handle(request);
        }, true);
    }

    static url(url) {
        gns().catchHandle(() => {
            const request = this.#getRouter().routeUrl(url);

            this.#handle(request);
        }, true);
    }

    static path(path, query) {
        gns().catchHandle(() => {
            const request = this.#getRouter().route(path, query);

            this.#handle(request);
        }, true);
    }

    static #handle(request) {
        gns().make('app::renderer').render(request);
    }

    static history(state) {
        const path = state.path;
        const queryParams = state.queryParams;

        gns().catchHandle(() => {
            const request = this.#getRouter().route(path, queryParams);

            request.setIsHistory(true);

            this.#handle(request);
        }, true);
    }
}