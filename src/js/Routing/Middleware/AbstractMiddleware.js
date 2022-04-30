import {AbstractClass} from "../../Abstract/AbstractClass";

const namespace = 'GenesisUI::Routing::Middleware';

export class AbstractMiddleware extends AbstractClass {
    constructor() {
        super(namespace + '::AbstractMiddleware');
    }

    /**
     * @param {Request} request
     * @param {function} next
     * @returns {Request|Response}
     * @abstract
     */
    handle(request, next) {
        this._notImplemented('handle');
    }
}