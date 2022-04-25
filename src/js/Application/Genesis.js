import {Container} from "./Container/Container";
import {RuntimeException} from "../Exceptions/RuntimeException";
import {AbstractServiceProvider} from "../Providers/AbstractServiceProvider";
import {ServiceProviderService} from "../Services/ServiceProviderService";
import {OperationNotAllowedException} from "../Exceptions/OperationNotAllowedException";
import {Bootstrapper} from "./Bootstrapper";
import {createRoot} from "react-dom/client";

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

    /** @type {string} **/
    #rootElementId;

    constructor() {
        this.#container = new Container();
    }

    /**
     * @returns {Genesis}
     */
    static getInstance() {
        return this.#instance;
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

        let validProviders = [];

        for (const serviceProvider of serviceProviders) {
            if (serviceProvider instanceof AbstractServiceProvider) {
                validProviders.push(serviceProvider);
                continue;
            }

            throw new RuntimeException('[GenesisUI] Invalid service-provider');
        }

        serviceProviderService.register(validProviders);
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
     * @returns {Object|function|*}
     * @throws BindingResolutionException
     */
    make(boundName) {
        return this.#container.resolve(boundName, this);
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
     * @returns void
     */
    render(elementId) {
        if (!this.#wasInitialized) {
            throw new OperationNotAllowedException('[GenesisUI] Builder must be initialized before rendering');
        }

        this.#rootElementId = elementId;

        Genesis.#instance = this;

        const root = createRoot(document.getElementById(elementId));

        /**
         * @todo Implement routing
         */
        root.render();

        document.dispatchEvent(new Event('gui.done'));
    }
}