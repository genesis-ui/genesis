/**
 * @property {AbstractServiceProvider[]} #serviceProviders
 */
import {AbstractServiceProvider} from "../Providers/AbstractServiceProvider";
import {RuntimeException} from "../Exceptions/RuntimeException";

export class ServiceProviderService {
    /** @type {AbstractServiceProvider[]} **/
    static #serviceProviders = [];

    /**
     * @param {AbstractServiceProvider|AbstractServiceProvider[]} serviceProviders
     * @returns void
     */
    register(serviceProviders) {
        if (!Array.isArray(serviceProviders)) {
            serviceProviders = [serviceProviders];
        }

        for (const serviceProvider of serviceProviders) {
            let serviceProviderInstance;

            try {
                serviceProviderInstance = new serviceProvider();
                if (!(serviceProviderInstance instanceof AbstractServiceProvider)) {
                    throw new Error();
                }
            } catch (exception) {
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
}