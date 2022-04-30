import {get} from "../GenesisApp";

export class Goto {
    static route(name, parameters = {}, query = {}) {
        /** @type {Router} **/
        const router = get().make('app::router');

        const path = router.toRoute(name, parameters);

        const request = router.route(path, query);

        this.#handle(request);
    }

    static url(url) {
        const request = get().make('app::router').routeUrl(url);

        this.#handle(request);
    }

    static path(path, query) {
        const request = get().make('app::router').route(path, query);

        this.#handle(request);
    }

    static #handle(request) {
        get().make('app::renderer').render(request);
    }

    static history(state) {
        const path = state.path;
        const queryParams = state.queryParams;

        const request = get().make('app::router').route(path, queryParams);

        request.setIsHistory(true);

        this.#handle(request);
    }
}