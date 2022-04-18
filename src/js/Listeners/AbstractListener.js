import {AbstractClass} from "../Abstract/AbstractClass";

const namespace = 'GenesisUI::Listeners';

export class AbstractListener extends AbstractClass {
    constructor() {
        super(namespace + '::AbstractListener');
    }

    /**
     * @abstract
     * @param {Event|CustomEvent} event
     * @param {string} rootElementId
     */
    handle(event, rootElementId) {
        this._notImplemented('handle');
    }
}