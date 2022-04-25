import {Genesis} from "../Application/Genesis";
import {RuntimeException} from "../Exceptions/RuntimeException";
import {AbstractMiddleware} from "../Routing/Middleware/AbstractMiddleware";
import {Response} from "./Responses/Response";
import {Request} from "../Routing/Request";

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
        const router = Genesis.getInstance().make('app::router');

        const middlewareArray = this.#globalMiddleware.concat(this.#requestMiddleware);

        let i = 0;
        const middlewareCount = middlewareArray.length;

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

        for (const middlewareStaticOrString of middlewareArray) {
            if (!(request instanceof Request)) {
                throw new RuntimeException('[GenesisUI] Middleware may only return instances of "Request"');
            }

            const middleware = this.#buildMiddleware(middlewareStaticOrString, router);
            let next;

            if (i < middlewareCount) {
                next = middlewareArray[i + 1].handle;
            } else {
                next = action;
            }

            request = this.#runMiddleware(middleware, next, request);

            if (request instanceof Response) {
                return request;
            }

            i++;
        }

        throw new RuntimeException('[GenesisUI] Could not render app: No response');
    }

    /**
     * @param {AbstractMiddleware} middleware
     * @param {function} next
     * @param {Request} request
     * @returns {*}
     */
    #runMiddleware(middleware, next, request) {
        return middleware.handle(request, next);
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