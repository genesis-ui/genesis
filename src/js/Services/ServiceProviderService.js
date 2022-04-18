/**
 * @property {AbstractServiceProvider[]} #serviceProviders
 */
import {AbstractServiceProvider} from "../Providers/AbstractServiceProvider";
import {RuntimeException} from "../Exceptions/RuntimeException";

export class ServiceProviderService {
    /** @type {AbstractServiceProvider[]} **/
    static #serviceProviders = [];
    /** @type {string[]} **/
    static #dynamicProvidersUrls = [];

    /**
     * @param {AbstractServiceProvider|AbstractServiceProvider[]} serviceProviders
     * @returns void
     */
    register(serviceProviders) {
        if (!Array.isArray(serviceProviders)) {
            serviceProviders = [serviceProviders];
        }

        for (const serviceProvider of serviceProviders) {
            if (!(serviceProvider instanceof AbstractServiceProvider)) {
                throw new RuntimeException('[GenesisUI] Service-Provider must be an instance of "AbstractServiceProvider"');
            }

            ServiceProviderService.#serviceProviders.push(serviceProvider);
        }
    }

    /**
     * @returns {AbstractServiceProvider[]}
     */
    get() {
        return ServiceProviderService.#serviceProviders;
    }

    /**
     * @returns {string[]}
     */
    getDynamicProvidersUrls() {
        return ServiceProviderService.#dynamicProvidersUrls;
    }
}