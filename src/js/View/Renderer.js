import {get} from "../GenesisApp";
import {AbortResponse} from "./Responses/AbortResponse";

export class Renderer {
    #root;

    constructor(root) {
        this.#root = root;
    }

    render(request) {
        const response = get().make('app::view-kernel').handle(request);

        if (response instanceof AbortResponse) {
            response.callback(request);

            return;
        }

        this.#root.render(response.getComponent());
    }

    renderComponent(componentOrJSX) {
        this.#root.render(componentOrJSX);
    }
}