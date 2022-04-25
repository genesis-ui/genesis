import {OperationNotAllowedException} from "../Exceptions/OperationNotAllowedException";
import {RouteNotFoundException} from "../Exceptions/RouteNotFoundException";
import {match} from "path-to-regexp";
import {Route} from "./Route";
import {Request} from "./Request";
import {Genesis} from "../Application/Genesis";

export class Router {
    /** @type {Object.<string, function|AbstractMiddleware>} **/
    #middleware = {};
    /** @type {Object.<string, string>} **/
    #middlewareAliases = {};
    /** @type {?Array.<{path: string,middleware: Array,action:function|Array}>} **/
    #routes = null;

    /**
     * @param {?Array.<{path: string,middleware: Array,action:function|Array}>} routes
     * @throws OperationNotAllowedException
     */
    register(routes) {
        if (this.#routes !== null) {
            throw new OperationNotAllowedException('[GenesisUI] Cannot register routes on router: Routes already registered');
        }

        this.#routes = routes;
    }

    /**
     * @param {string} name
     * @param {AbstractMiddleware} middleware
     * @returns {Router}
     */
    registerMiddleware(name, middleware) {
        this.#middleware[name] = middleware;

        return this;
    }

    /**
     * @param {string} alias
     * @param {string} name
     * @returns {Router}
     */
    aliasMiddleware(alias, name) {
        this.#middlewareAliases[alias] = name;

        return this;
    }

    /**
     * @param nameOrAlias
     * @returns {Function|AbstractMiddleware|null}
     */
    middleware(nameOrAlias) {
        return this.#middleware?.[nameOrAlias] ?? (this.#middlewareAliases?.[nameOrAlias] ? this.#middleware?.[this.#middlewareAliases[nameOrAlias]] : null);
    }

    /**
     * @param {string} path
     * @returns {{route: Route, middleware: Array}|null}
     */
    match(path) {
        for (const routeObj of this.#routes) {
            const matchFn = match(routeObj.path, {decode: decodeURIComponent});

            const params = matchFn(path);

            if (params !== false) {
                return {
                    route: new Route(path, routeObj.action, params.params, routeObj?.name),
                    middleware: routeObj.middleware
                };
            }
        }

        return null;
    }

    /**
     * @param {string} url
     * @returns {Request}
     */
    routeUrl(url) {
        const urlObj = new URL(url);
        const path = urlObj.pathname;

        return this.route(path, Object.fromEntries(urlObj.searchParams));
    }

    /**
     * @param {string} path
     * @param {?Object.<string, ?string,number,boolean>} query
     * @returns {Request}
     */
    route(path, query = null) {
        const kernel = Genesis.getInstance().make('app::view-kernel');

        kernel.flush();

        const routeObj = this.match(path);

        if (!routeObj) {
            throw new RouteNotFoundException('[GenesisUI] Route not found: A route could not be matched by the given path', path);
        }

        kernel.attachRequestMiddleware(routeObj.middleware);

        return new Request(routeObj.route, query);
    }
}