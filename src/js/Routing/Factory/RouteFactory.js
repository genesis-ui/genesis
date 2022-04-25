export class RouteFactory {
    /** @type {?string} **/
    #route = null;
    /** @type {(string|AbstractMiddleware)[]} **/
    #middleware = [];
    /** @type {Array|function} **/
    #action = null;
    /** @type {number} **/
    #id;

    /**
     * @param {number} id
     * @param {?Array|function} action
     * @param {?string} route
     */
    constructor(id, action = null, route = null) {
        this.#id = id;
        this.#route = route;
        this.#action = action;
    }

    /**
     * @param {string} route
     * @returns {RouteFactory}
     */
    route(route) {
        this.#route = route;

        return this;
    }

    /**
     * @param {Array|function} action
     * @returns {RouteFactory}
     */
    action(action) {
        this.#action = action;

        return this;
    }

    /**
     * @param {AbstractMiddleware|string|(AbstractMiddleware|string)[]} middleware
     * @returns {RouteFactory}
     */
    middleware(middleware) {
        if (Array.isArray(middleware)) {
            this.#middleware.push(...middleware);

            return this;
        }

        this.#middleware.push(middleware);

        return this;
    }

    /**
     * @returns {{path: ?string, action: (Array|Function), middleware: (string|AbstractMiddleware)[]}}
     */
    build() {
        return {
            path: this.#route,
            action: this.#action,
            middleware: this.#middleware,
        };
    }
}