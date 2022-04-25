export class Route {
    /** @type {string} **/
    #path;
    /** @type {function} **/
    #action;
    /** @type {Object.<string, ?string|number|boolean>} **/
    #params;
    /** @type {?string} **/
    #name;

    /**
     * @param {string} path
     * @param {function} action
     * @param {Object.<string, ?string|number|boolean>} params
     * @param {?string} name
     */
    constructor(path, action, params = {}, name = null) {
        this.#path = path;
        this.#action = action;
        this.#params = params;
        this.#name = name;
    }

    /**
     * @returns {string}
     */
    getPath() {
        return this.#path;
    }

    /**
     * @returns {Function}
     */
    getAction() {
        return this.#action;
    }

    /**
     * @returns {Object<string, ?string|number|boolean>}
     */
    getParams() {
        return this.#params;
    }

    /**
     * @param name
     * @returns {?string|number|boolean}
     */
    param(name) {
        return this.#params?.[name];
    }

    /**
     * @returns {?string}
     */
    getName() {
        return this.#name;
    }
}