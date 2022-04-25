import {BindingException} from "../../Exceptions/BindingException";
import {BindingResolutionException} from "../../Exceptions/BindingResolutionException";

export class Container {
    /** @type {Object.<number, *>} **/
    static #boundInstances = {};
    /** @type {Object.<number, *>} **/
    static #boundSingletons = {};
    /** @type {Object.<number, *>} **/
    static #bound = {};

    /**
     * @param {string} name
     * @returns {Container}
     */
    clear(name) {
        if (Container.#bound[name]) {
            delete Container.#bound[name];
        }

        if (Container.#boundSingletons[name]) {
            delete Container.#boundSingletons[name];
        }

        if (Container.#boundInstances[name]) {
            delete Container.#boundInstances[name];
        }

        return this;
    }

    /**
     * @param {string} name
     * @param {Genesis} app
     * @param {string[]} parameters
     * @returns {*}
     */
    resolve(name, app, parameters = []) {
        if (Container.#bound[name]) {
            return Container.#bound[name](app, ...parameters);
        }

        if (Container.#boundSingletons[name]) {
            const instance = Container.#boundSingletons[name](app, ...parameters);

            this.clear(name);

            this.bindInstance(name, instance);

            return this.resolve(name, app);
        }

        if (Container.#boundInstances[name]) {
            return Container.#boundInstances[name];
        }

        throw new BindingResolutionException('[GenesisUI] Could not resolve a bindable or instance from "' + name + '"');
    }

    /**
     * @param {string} name
     * @param {*} bindable
     * @returns {Container}
     */
    bind(name, bindable) {
        if (typeof bindable !== 'function') {
            throw new BindingException('[GenesisUI] Could not bind: Bindable must be wrapped by a "function"', name);
        }

        this.clear(name);

        Container.#bound[name] = bindable;

        return this;
    }

    /**
     * @param {string} name
     * @param {*} bindable
     * @returns {Container}
     */
    bindSingleton(name, bindable) {
        if (typeof bindable !== 'function') {
            throw new BindingException('[GenesisUI] Could not bind singleton: Bindable must be wrapped by a "function"', name);
        }

        this.clear(name);

        Container.#boundSingletons[name] = bindable;

        return this;
    }

    /**
     * @param {string} name
     * @param {*} instance
     * @returns {Container}
     */
    bindInstance(name, instance) {
        this.clear(name);

        Container.#boundInstances[name] = instance;

        return this;
    }
}