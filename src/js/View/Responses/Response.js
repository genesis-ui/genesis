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

    redirectPath(path, queryParams = {}) {
        return new RedirectResponse(path, true, queryParams);
    }

    redirect(routeName, parameters = {}) {
        return new RedirectResponse(routeName, false, parameters);
    }
}