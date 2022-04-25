import {Container} from "./Container/Container";
import {RuntimeException} from "../Exceptions/RuntimeException";
import {AbstractServiceProvider} from "../Providers/AbstractServiceProvider";
import {ServiceProviderService} from "../Services/ServiceProviderService";
import {OperationNotAllowedException} from "../Exceptions/OperationNotAllowedException";
import {Bootstrapper} from "./Bootstrapper";
import {createRoot} from "react-dom/client";
import {Env} from "../Models/Env";

export class Genesis {
    /** @type {string} **/
    static VERSION = 'v0.0.1';
    /** @type {number} **/
    static REACT_VERSION = 18;

    /** @type {Genesis} **/
    static #instance;

    /** @type {boolean} **/
    #wasInitialized = false;

    /** @type {Container} **/
    #container;

    /** @type {Env} **/
    #env;

    /** @type {string} **/
    #rootElementId;

    /**
     * @param {{}} env
     */
    constructor(env) {
        this.#container = new Container();
        this.#env = new Env(env);

        this.bindInstance('app::env', this.#env);
    }

    /**
     * @returns {Genesis}
     */
    static getInstance() {
        return this.#instance;
    }

    /**
     * @param {string} key
     * @returns {string|number|boolean|null}
     */
    env(key) {
        return this.#env.get(key);
    }

    /**
     * @returns {string}
     */
    getRootElementId() {
        return this.#rootElementId;
    }

    /**
     * @param {AbstractServiceProvider|AbstractServiceProvider[]} serviceProviders
     * @returns void
     * @throws OperationNotAllowedException|RuntimeException
     */
    register(serviceProviders = null) {
        if (this.#wasInitialized) {
            throw new OperationNotAllowedException('[GenesisUI] Operation not allowed: Cannot register service-providers after instance was initialized');
        }

        if (!serviceProviders) {
            return;
        }

        const serviceProviderService = new ServiceProviderService();

        if (!Array.isArray(serviceProviders)) {
            serviceProviders = [serviceProviders];
        }

        serviceProviderService.register(serviceProviders);
    }

    /**
     * @param {string} name
     * @param {function} bindable
     * @returns void
     */
    bind(name, bindable) {
        this.#container.bind(name, bindable);
    }

    /**
     * @param {string} name
     * @param {function} bindable
     * @returns void
     */
    bindSingleton(name, bindable) {
        this.#container.bindSingleton(name, bindable);
    }

    /**
     * @param {string} name
     * @param {*} instance
     * @returns void
     */
    bindInstance(name, instance) {
        this.#container.bindInstance(name, instance);
    }

    /**
     *
     * @param {string} boundName
     * @param {*[]} parameters
     * @returns {Object|function|*}
     * @throws BindingResolutionException
     */
    make(boundName, parameters = []) {
        return this.#container.resolve(boundName, this, parameters);
    }

    /**
     * @returns {Promise.<Object.<string, string|number>, Error>}
     * @throws OperationNotAllowedException
     */
    init() {
        return new Promise(function (resolve, reject) {
            if (!this.#wasInitialized) {
                this.#wasInitialized = true;

                resolve(new Bootstrapper(this).bootstrap());
                return;
            }

            reject(new OperationNotAllowedException('[GenesisUI] Instance already initialized'));
        }.bind(this));
    }

    /**
     * @param {string} elementId
     * @returns void
     * @throws OperationNotAllowedException
     */
    handle(elementId) {
        if (!this.#wasInitialized) {
            throw new OperationNotAllowedException('[GenesisUI] Builder must be initialized before rendering');
        }

        this.#rootElementId = elementId;

        Genesis.#instance = this;

        const root = createRoot(document.getElementById(elementId));

        /**
         * @type {Router}
         */
        const router = this.make('app::router');

        const request = router.routeUrl(window.location.href);

        root.render(this.make('app::view-kernel').handle(request).getComponent());

        document.dispatchEvent(new Event('gui.done'));
    }
}