import {ServiceProviderService} from "../Services/ServiceProviderService";
import {TranslationServiceProvider} from "../Providers/TranslationServiceProvider";
import {RouteServiceProvider} from "../Providers/RouteServiceProvider";
import {Routes} from "../Routing/Factory/Routes";
import {RouteService} from "../Services/RouteService";
import {RuntimeException} from "../Exceptions/RuntimeException";

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
        TranslationServiceProvider, RouteServiceProvider,
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

    /**
     * @returns void
     */
    #routesRegister() {
        const routeService = new RouteService();

        const callbacks = routeService.getCallbacks();

        let routes = [];

        for (const callback of callbacks) {
            let routesObj = new Routes();

            routesObj = callback(routesObj);

            if (!routesObj instanceof Routes) {
                throw new RuntimeException('[GenesisUI] Routes callbacks must return an instance of "Routes"');
            }

            routes.push(...routesObj.build());
        }

        this.#app.make('app::router').register(routes);
    }

    /**
     * @returns {number}
     */
    bootstrap() {
        let providerCount = this.#providersBoot(this.#baseProviders) + this.#providersBoot(new ServiceProviderService().get());

        this.#providersRegister();

        this.#routesRegister();

        this.#providerInstances = [];

        return providerCount;
    }
}