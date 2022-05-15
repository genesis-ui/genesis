import {RuntimeException} from "../Exceptions/RuntimeException";
import {AbstractMiddleware} from "../Routing/Middleware/AbstractMiddleware";
import {Response} from "./Responses/Response";
import {Request} from "../Routing/Request";
import {RedirectResponse} from "./Responses/RedirectResponse";
import {app} from "../GenesisApp";

export class Kernel {
    /** @type {Array} **/
    #globalMiddleware;
    /** @type {(string|AbstractMiddleware)[]} **/
    #requestMiddleware = [];

    /**
     * @param {(string|AbstractMiddleware)[]} middleware
     */
    constructor(middleware = []) {
        this.#globalMiddleware = middleware;
    }

    /**
     * @param {string|AbstractMiddleware|(string|AbstractMiddleware)[]} middleware
     * @returns void
     */
    attachGlobalMiddleware(middleware) {
        if (Array.isArray(middleware)) {
            this.#globalMiddleware.push(...middleware);

            return;
        }

        this.#globalMiddleware.push(middleware);
    }

    /**
     * @param {string|AbstractMiddleware|(string|AbstractMiddleware)[]} middleware
     * @returns void
     */
    attachRequestMiddleware(middleware) {
        if (Array.isArray(middleware)) {
            this.#requestMiddleware.push(...middleware);

            return;
        }

        this.#requestMiddleware.push(middleware);
    }

    /**
     * @param {Request} request
     * @returns {Response}
     */
    handle(request) {
        const router = app().make('app::router');

        let middlewareArray = [...this.#globalMiddleware];

        middlewareArray.push(...this.#requestMiddleware);

        let action = request.route().getAction();

        if (Array.isArray(action)) {
            try {
                const actionInstance = new action[0]();

                action = actionInstance[action[1]];
            } catch (exception) {
                throw new RuntimeException('[GenesisUI] Middleware must be either an Array.[Controller.static, methodName] or a function');
            }
        }

        if (middlewareArray.length === 0) {
            return action(request);
        }

        const response = this.#fetchResponse(middlewareArray, router, action, request);

        if (response instanceof Response) {
            return response;
        } else if (response instanceof RedirectResponse) {
            return this.handle(response.request());
        }

        throw new RuntimeException('[GenesisUI] Could not render app: No response');
    }

    #fetchResponse(middlewareArray, router, action, request) {
        const nextCallback = (index) => {
            return (request) => {
                if (request instanceof Response || request instanceof RedirectResponse) {
                    return request;
                }

                const nextAction = middlewareArray?.[index + 1];

                if (nextAction) {
                    return this.#buildMiddleware(middlewareArray[index], router).handle(request, nextCallback(index + 1));
                }

                return this.#buildMiddleware(middlewareArray[index], router).handle(request, action);
            };
        };

        return nextCallback(0)(request);
    }

    /**
     * @param {AbstractMiddleware} middleware
     * @param {Router} router
     * @returns {AbstractMiddleware}
     */
    #buildMiddleware(middleware, router) {
        let middlewareStatic, middlewareInstance;

        if (typeof middleware === 'string') {
            middlewareStatic = router.middleware(middleware);
        } else {
            middlewareStatic = middleware;
        }

        try {
            middlewareInstance = new middlewareStatic();
            if (!(middlewareInstance instanceof AbstractMiddleware)) {
                throw new Error();
            }
        } catch (exception) {
            throw new RuntimeException('[GenesisUI] Unable to handle request: Invalid middleware');
        }

        return middlewareInstance;
    }

    /**
     * @returns void
     */
    flush() {
        this.#requestMiddleware = [];
    }
}