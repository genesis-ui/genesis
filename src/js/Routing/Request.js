export class Request {
    /** @type {Route} **/
    #route
    /** @type {Object.<string, ?string|number|boolean>} **/
    #query;
    /** @type {?string} **/
    #hash;
    /** @type {boolean} **/
    #isHistory = false;

    /**
     * @param {Route} route
     * @param query
     * @param {?string} hash
     */
    constructor(route, query, hash = null) {
        this.#route = route;
        this.#query = query;
        this.#hash = hash;
    }

    setIsHistory(isHistory) {
        this.#isHistory = isHistory;
    }

    isHistory() {
        return this.#isHistory;
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

    queryParams() {
        return this.#query;
    }

    /**
     * @param name
     * @returns {?string|number|boolean}
     */
    param(name) {
        return this.#route.param(name);
    }

    /**
     * @returns {?string}
     */
    hash() {
        return this.#hash;
    }

    /**
     * @returns {string}
     */
    getUrl() {
        const url = this.route().toURL();

        for (const [queryKey, queryValue] of Object.entries(this.queryParams())) {
            url.searchParams.set(queryKey, queryValue);
        }

        return url.toString();
    }
}