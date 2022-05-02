import {AbstractClass} from "../Abstract/AbstractClass";

const namespace = 'GenesisUI::Exceptions';

export class AbstractHandler extends AbstractClass {
    constructor() {
        super(namespace + '::AbstractHandler');
    }

    /**
     * @param {Error} exception
     * @abstract
     */
    handle(exception) {
        this._notImplemented('handle');
    }
}