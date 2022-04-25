import {MethodNotImplementedException} from "../Exceptions/MethodNotImplementedException";

/**
 * @property {string} #baseClass
 */
export class AbstractClass {
    /** @type string **/
    #baseClass;

    /**
     * @param {string} baseClass
     */
    constructor(baseClass) {
        this.#baseClass = baseClass;
    }

    /**
     * @param method
     * @param baseClass
     * @private
     */
    _notImplemented(method, baseClass = null) {
        baseClass = baseClass ?? this.#baseClass;

        throw new MethodNotImplementedException(
            'Class "' + this.constructor.name + '" must implement abstract method "' + method + '" of class "' + baseClass + '"',
            baseClass,
            this.constructor.name,
            method
        );
    }

    /**
     * @param method
     * @param baseClass
     * @static
     * @private
     */
    static _notImplemented(method, baseClass) {
        new this()._notImplemented(method, baseClass);
    }
}