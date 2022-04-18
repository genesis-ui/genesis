import {AbstractClass} from "../Abstract/AbstractClass";

const namespace = 'GenesisUI::Listeners';

export class AbstractListener extends AbstractClass {
    constructor() {
        super(namespace + '::AbstractListener');
    }

    /**
     * @abstract
     * @param {Event|CustomEvent} event
     */
    handle(event) {
        this._notImplemented('handle');
    }
}