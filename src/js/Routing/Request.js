export class Request {
    /** @type {Route} **/
    #route
    /** @type {Object.<string, ?string|number|boolean>} **/
    #query;

    /**
     * @param {Route} route
     * @param query
     */
    constructor(route, query) {
        this.#route = route;
        this.#query = query;
    }

    /**
     * @returns {Route}
     */
    route() {
        return this.#route;
    }

    /**
     * @param {string} key
     * @returns {?string|number|boolean}
     */
    query(key) {
        return this.#query?.[key];
    }

    /**
     * @param name
     * @returns {?string|number|boolean}
     */
    param(name) {
        return this.#route.param(name);
    }
}