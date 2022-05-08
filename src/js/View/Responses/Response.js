import {ReactElement} from "react";
import {RedirectResponse} from "./RedirectResponse";

export class Response {
    /** @type {React.Component|ReactElement} **/
    #component;

    /**
     * @param {React.Component|?ReactElement} component
     */
    constructor(component = null) {
        this.#component = component;
    }

    /**
     * @returns {React.Component|ReactElement}
     */
    getComponent() {
        return this.#component;
    }

    redirectPath(path) {
        return new RedirectResponse(path, true);
    }

    redirect(routeName, parameters = {}) {
        return new RedirectResponse(routeName, false, parameters);
    }
}