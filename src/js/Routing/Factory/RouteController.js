export class RouteController {
    #middleware;
    /** @type {?string} **/
    #prefix;
    /** @type {AbstractController.static} **/
    #controller;
    /** @type {?string[]} **/
    #only;
    /** @type {?Object.<string, string>} **/
    #mappedRoutes = null;
    /** @type {?string} **/
    #name;
    /** @type {?string[]} **/
    #domain;

    /**
     * @param {AbstractMiddleware|string|(AbstractMiddleware|string)[]} middleware
     * @param {?string} prefix
     * @param {?string[]} only
     * @param {AbstractController.static} controller
     */
    constructor({controller, middleware = [], prefix = null, only = null}) {
        this.#middleware = middleware;
        this.#prefix = prefix;
        this.#only = only;
        this.#controller = controller;
        this.#name = null;
        this.#domain = null;
    }

    /**
     * @param {AbstractMiddleware|string|(AbstractMiddleware|string)[]} middleware
     * @returns {RouteController}
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
     * @returns {RouteController}
     */
    prefix(prefix) {
        this.#prefix = prefix;

        return this;
    }

    /**
     * @param {string[]} only
     * @returns {RouteController}
     */
    only(only) {
        this.#only = only;

        return this;
    }

    /**
     * @param {Object.<string, string>} mappedRoutes
     * @returns {RouteController}
     */
    mapRoutes(mappedRoutes) {
        this.#mappedRoutes = mappedRoutes;

        return this;
    }

    /**
     * @param {string} name
     * @returns {RouteController}
     */
    name(name) {
        this.#name = name;

        return this;
    }

    /**
     * @param {string|string[]} domain
     * @returns {RouteController}
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

        const prefix = this.#prefix ?? '';
        const middleware = this.#middleware;
        const only = this.#only;
        const mappedRoutes = this.#mappedRoutes ?? this.#controller.mapRoutes();

        for (const [path, method] of Object.entries(mappedRoutes)) {
            if (!only || only.includes(method)) {
                routes.push({
                    path: prefix + path,
                    middleware: middleware,
                    action: [this.#controller, method],
                    name: this.#name ? this.#name + '.' + method : null,
                    domain: this.#domain,
                });
            }
        }

        return routes;
    }
}