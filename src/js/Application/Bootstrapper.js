import {ServiceProviderService} from "../Services/ServiceProviderService";
import {TranslationServiceProvider} from "../Providers/TranslationServiceProvider";

export class Bootstrapper {
    /** @type {Genesis} **/
    #app;
    /** @type {AbstractServiceProvider[]}**/
    #providerInstances = [];

    /**
     * @param {Genesis} app
     */
    constructor(app) {
        this.#app = app;
    }

    /**
     * @type {AbstractServiceProvider[]}
     */
    #baseProviders = [
         TranslationServiceProvider
    ];

    /**
     * @param {AbstractServiceProvider[]} providers
     * @returns {number}
     */
    #providersBoot(providers) {
        let providerCount = 0;

        for (let provider of providers) {
            /** @type {AbstractServiceProvider} **/
            const providerInstance = new provider(this.#app);

            providerInstance.boot();

            this.#providerInstances.push(providerInstance);

            providerCount++;
        }

        return providerCount;
    }

    /**
     * @returns void
     */
    #providersRegister() {
        for (const providerInstance of this.#providerInstances) {

            providerInstance.register();
        }
    }

    bootstrap() {
        let providerCount = this.#providersBoot(this.#baseProviders) + this.#providersBoot(new ServiceProviderService().get());

        this.#providersRegister();

        this.#providerInstances = [];

        return providerCount;
    }
}