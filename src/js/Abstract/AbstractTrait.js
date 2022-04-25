import {AbstractClass} from "./AbstractClass";

const namespace = 'GenesisUI::Abstract';

/**
 * @property {Class} _staticObject
 */
export class AbstractTrait extends AbstractClass {
    /** @type {Class} **/
    _staticObject;

    /**
     * @param {Class} staticObject
     */
    constructor(staticObject) {
        super(namespace + '::AbstractTrait');

        this._staticObject = staticObject;

        this.define();
    }

    /**
     * @returns void
     */
    define() {
        this._notImplemented('define');
    }
}