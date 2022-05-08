import {Routes} from "./Routes";
import {RuntimeException} from "../../Exceptions/RuntimeException";

export class RouteGroup {
    /** @type {(string|AbstractMiddleware)[]} **/
    #middleware;
    /** @type {?string} **/
    #prefix;
    /** @type {?function} **/
    #callback;
    /** @type {?string[]} **/
    #domain;

    /**
     * @param {AbstractMiddleware|string|(AbstractMiddleware|string)[]} middleware
     * @param {?string} prefix
     * @param {?function} callback
     */
    constructor({middleware = [], prefix = null, callback = null}) {
        this.#middleware = Array.isArray(middleware) ? middleware : [middleware];
        this.#prefix = prefix;
        this.#callback = callback;
        this.#domain = null;
    }

    /**
     * @param {AbstractMiddleware|string|(AbstractMiddleware|string)[]} middleware
     * @returns {RouteGroup}
     */
    middleware(middleware) {
        if (!Array.isArray(middleware)) {
            middleware = [middleware];
        }

        this.#middleware.push(...middleware);

        return this;
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
     * @param {string|string[]} domain
     * @returns {RouteGroup}
     */
    domain(domain) {
        if (!Array.isArray(domain)) {
            this.#domain = [domain];

            return this;
        }

        this.#domain = domain;

        return this;
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
            middleware.push(...groupRoute.middleware);
            
            routes.push({
                path: prefix + groupRoute.path,
                middleware: middleware,
                action: groupRoute.action,
                name: groupRoute?.name ?? null,
                domain: this.#domain ?? groupRoute?.domain
            });
        }

        return routes;
    }
}