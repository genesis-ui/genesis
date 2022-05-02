import {get} from "../GenesisApp";

export class Renderer {
    #root;

    constructor(root) {
        this.#root = root;
    }

    render(request) {
        this.#root.render(get().make('app::view-kernel').handle(request).getComponent());
    }

    renderComponent(componentOrJSX) {
        this.#root.render(componentOrJSX);
    }
}