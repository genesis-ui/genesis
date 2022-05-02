import {MethodNotImplementedException} from "./MethodNotImplementedException";

const namespace = 'GenesisUI::Exceptions';

export class AbstractException extends Error {
    #baseClass = namespace + '::AbstractException';

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
     * @returns {string}
     * @abstract
     */
    getName() {
        this._notImplemented();
    }
}