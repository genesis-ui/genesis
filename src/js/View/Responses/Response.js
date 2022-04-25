export class Response {
    /** @type {React.Component} **/
    #component;

    /**
     * @param {React.Component} component
     */
    constructor(component) {
        this.#component = component;
    }

    /**
     * @returns {React.Component}
     */
    getComponent() {
        return this.#component;
    }
}