export class RouteService {
    /** @type {function[]} */
    static #callbacks = [];

    /**
     * @param {function} callback
     * @returns void
     */
    registerCallback(callback) {
        RouteService.#callbacks.push(callback);
    }

    /**
     * @returns {Function[]}
     */
    getCallbacks() {
        return RouteService.#callbacks;
    }
}