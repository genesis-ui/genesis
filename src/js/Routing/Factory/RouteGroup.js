import {Routes} from "./Routes";
import {RuntimeException} from "../../Exceptions/RuntimeException";

export class RouteGroup {
    /** @type {(string|AbstractMiddleware)[]} **/
    #middleware;
    /** @type {?string} **/
    #prefix;
    /** @type {?function} **/
    #callback;

    /**
     * @param {AbstractMiddleware|string|(AbstractMiddleware|string)[]} middleware
     * @param {?string} prefix
     * @param {?function} callback
     */
    constructor({middleware = [], prefix = null, callback = null}) {
        this.#middleware = middleware;
        this.#prefix = prefix;
        this.#callback = callback;
    }

    /**
     * @param {AbstractMiddleware|string|(AbstractMiddleware|string)[]} middleware
     * @returns void
     */
    middleware(middleware) {
        if (!Array.isArray(middleware)) {
            middleware = [middleware];
        }

        this.#middleware = this.#middleware.concat(middleware);
    }

    /**
     * @param {string} prefix
     * @returns {RouteGroup}
     */
    prefix(prefix) {
        this.#prefix = prefix;

        return this;
    }

    /**
     * @param {function} callback
     * @returns void
     */
    group(callback) {
        this.#callback = callback;
    }

    /**
     * @returns {*[]}
     */
    build() {
        let routes = [];

        if (!this.#callback) {
            return routes;
        }

        const prefix = this.#prefix ?? '';
        const middleware = this.#middleware;

        let routesObj = new Routes();

        routesObj = this.#callback(routesObj);

        if (!routesObj instanceof Routes) {
            throw new RuntimeException('[GenesisUI] Routes callbacks must return an instance of "Routes"');
        }

        for (const groupRoute of routesObj.build()) {
            routes.push({
                path: prefix + groupRoute.path,
                middleware: middleware.concat(groupRoute.middleware),
                action: groupRoute.action,
            });
        }

        return routes;
    }
}