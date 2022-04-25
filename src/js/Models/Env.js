export class Env {
    /** @type {Object.<string, string|number|boolean>} **/
    #properties = {};

    /**
     * @param {Object.<string, string|number|boolean>} env
     */
    constructor(env) {
        this.#properties = env;
    }

    /**
     * @param {string} key
     * @returns {string|number|boolean}
     */
    get(key) {
        return this.#properties?.[key];
    }
}