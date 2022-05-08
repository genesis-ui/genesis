import {get} from "../../GenesisApp";
import {Router} from "../../GenesisApp";

export class RedirectResponse {
    #redirectsToPath;
    #routeNameOrPath;
    #parameters;

    constructor(routeNameOrPath, redirectsToPath = false, parameters = {}) {
        this.#routeNameOrPath = routeNameOrPath;
        this.#redirectsToPath = redirectsToPath;
        this.#parameters = parameters;
    }

    getRouteNameOrPath() {
        return this.#routeNameOrPath;
    }

    redirectsToPath() {
        return this.#redirectsToPath;
    }

    getParameters() {
        return this.#parameters;
    }

    request() {
        /** @type {Router} **/
        const router = get().make('app::router');

        if (this.#redirectsToPath) {
            return router.route(this.#routeNameOrPath);
        }

        return router.route(router.toRoute(this.#routeNameOrPath, this.#parameters));
    }
}