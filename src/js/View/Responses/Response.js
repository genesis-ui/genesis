import {ReactElement} from "react";

export class Response {
    /** @type {React.Component|ReactElement} **/
    #component;

    /**
     * @param {React.Component|ReactElement} component
     */
    constructor(component) {
        this.#component = component;
    }

    /**
     * @returns {React.Component|ReactElement}
     */
    getComponent() {
        return this.#component;
    }
}