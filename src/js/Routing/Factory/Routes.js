import {RouteFactory} from "./RouteFactory";
import {RouteGroup} from "./RouteGroup";
import {RouteController} from "./RouteController";

export class Routes {
    /** @type {number} **/
    #idIncrement = 0;

    /**
     * @type {Object.<number, RouteFactory|RouteGroup|RouteController>}
     */
    #factoriesAndGroups = {};

    /**
     * @returns {number}
     */
    #incrementId() {
        this.#idIncrement++;

        return this.#idIncrement;
    }

    /**
     * @param {string} prefix
     * @returns {RouteGroup}
     */
    prefix(prefix) {
        const id = this.#incrementId();

        this.#factoriesAndGroups[id] = new RouteGroup({
            prefix: prefix,
        });

        return this.#factoriesAndGroups[id];
    }

    /**
     * @param {string} route
     * @param {function|Array} action
     * @returns {RouteFactory}
     */
    action(route, action) {
        const id = this.#incrementId();

        this.#factoriesAndGroups[id] = new RouteFactory(id, action, route);

        return this.#factoriesAndGroups[id];
    }

    /**
     * @param {?string} route
     * @param {?function|?Array} action
     * @returns {RouteFactory}
     */
    add(route = null, action = null) {
        const id = this.#incrementId();

        this.#factoriesAndGroups[id] = new RouteFactory(id, action, route);

        return this.#factoriesAndGroups[id];
    }

    /**
     * @param {AbstractMiddleware|string|(AbstractMiddleware|string)[]} middleware
     * @returns {RouteGroup}
     */
    middleware(middleware) {
        const id = this.#incrementId();

        this.#factoriesAndGroups[id] = new RouteGroup({
            middleware: middleware,
        });

        return this.#factoriesAndGroups[id];
    }

    /**
     * @param {AbstractController.static} controller
     * @returns {RouteFactory|RouteGroup|RouteController}
     */
    controller(controller) {
        const id = this.#incrementId();

        this.#factoriesAndGroups[id] = new RouteController({
            controller: controller
        });

        return this.#factoriesAndGroups[id];
    }

    /**
     * @returns {Object<number, RouteFactory|RouteGroup|RouteController>}
     */
    #getFactoriesAndGroups() {
        return this.#factoriesAndGroups;
    }

    /**
     * @returns {Array.<{path: string,middleware: Array,action:function|Array}>}
     */
    build() {
        let routes = [];

        for (const [id, factoryOrGroup] of Object.entries(this.#factoriesAndGroups)) {
            const builtRoutes = factoryOrGroup.build();

            if (Array.isArray(builtRoutes)) {
                routes.push(...builtRoutes);

                continue;
            }

            routes.push(builtRoutes);
        }

        return routes;
    }
}