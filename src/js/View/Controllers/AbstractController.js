import {AbstractClass} from "../../Abstract/AbstractClass";

const namespace = 'GenesisUI::View::Controllers';

export class AbstractController extends AbstractClass {
    /**
     * @abstract
     * @static
     * @returns {Object.<string, string>}
     */
    static mapRoutes() {
        this._notImplemented(namespace + '::AbstractController');
    }
}