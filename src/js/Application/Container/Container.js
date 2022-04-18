import {BindingException} from "../../Exceptions/BindingException";
import {BindingResolutionException} from "../../Exceptions/BindingResolutionException";

export class Container {
    static #boundInstances = {};
    static #boundSingletons = {};
    static #bound = {};

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

    resolve(name, app, parameters = []) {
        if (Container.#bound[name]) {
            return Container.#bound[name](app, ...parameters);
        }

        if (Container.#boundSingletons[name]) {
            const instance = Container.#boundSingletons[name](app, ...parameters);

            this.clear(name);

            this.bindInstance(name, instance);

            return this.resolve(name);
        }

        if (Container.#boundInstances[name]) {
            return Container.#boundInstances[name];
        }

        throw new BindingResolutionException('[GenesisUI] Could not resolve a bindable or instance from "' + name + '"');
    }

    bind(name, bindable) {
        if (typeof bindable !== 'function') {
            throw new BindingException('[GenesisUI] Could not bind: Bindable must be wrapped by a "function"', name);
        }

        this.clear(name);

        Container.#bound[name] = bindable;

        return this;
    }

    bindSingleton(name, bindable) {
        if (typeof bindable !== 'function') {
            throw new BindingException('[GenesisUI] Could not bind singleton: Bindable must be wrapped by a "function"', name);
        }

        this.clear(name);

        Container.#boundSingletons[name] = bindable;

        return this;
    }

    bindInstance(name, instance) {
        this.clear(name);

        Container.#boundInstances[name] = instance;

        return this;
    }
}