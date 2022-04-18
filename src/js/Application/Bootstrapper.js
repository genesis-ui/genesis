import {ServiceProviderService} from "../Services/ServiceProviderService";
import {TranslationServiceProvider} from "../Providers/TranslationServiceProvider";

export class Bootstrapper {
    /** @type {Genesis} **/
    #app;
    /** @type {AbstractServiceProvider[]}**/
    #providerInstances = [];

    constructor(app) {
        this.#app = app;
    }

    #baseProviders = [
         TranslationServiceProvider
    ];

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