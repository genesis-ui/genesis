import {BindingResolutionException} from "../../Exceptions/BindingResolutionException";

export class Resolvable {
    #bindableNameOrClassOrFunction;
    #parameterNames;

    /**
     * @param {string|Class|function|CallableFunction} bindableNameOrClassOrFunction
     * @param {string[]} parameterNames
     */
    constructor(bindableNameOrClassOrFunction, parameterNames = []) {
        this.#bindableNameOrClassOrFunction = bindableNameOrClassOrFunction;
        this.#parameterNames = parameterNames;
    }

    /**
     * @param {Genesis} app
     * @param {Object.<string, *>} parameters
     */
    make(app, parameters = {}) {
        let instance;

        const allowedParameters = Object.entries(parameters).filter(([key, value]) => {
            return this.#parameterNames.includes(key);
        });

        try {
            instance = app.make(this.#bindableNameOrClassOrFunction, allowedParameters);
        } catch (exception) {
            if (!exception instanceof BindingResolutionException || typeof this.#bindableNameOrClassOrFunction === 'string') {
                throw exception;
            }

            try {
                instance = new instance();
            } catch (exception) {
                throw new BindingResolutionException('[GenesisUI] Could not resolve a bindable or instance from "' + instance + '"');
            }
        }

        return instance;
    }
}