import {OperationNotAllowedException} from "../Exceptions/OperationNotAllowedException";
import {RouteNotFoundException} from "../Exceptions/RouteNotFoundException";
import {compile, match} from "path-to-regexp";
import {Route} from "./Route";
import {Request} from "./Request";
import {app} from "../GenesisApp";

export class Router {
    /** @type {Object.<string, function|AbstractMiddleware>} **/
    #middleware = {};
    /** @type {Object.<string, string>} **/
    #middlewareAliases = {};
    /** @type {?Array.<{path: string,middleware: Array,action:function|Array,name:?string,domain:?string[]}>} **/
    #routes = null;

    /**
     * @param {?Array.<{path: string,middleware: Array,action:function|Array,name:?string,domain:?string[]}>} routes
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

            if (params !== false && (!routeObj.domain || routeObj.domain.includes(window.location.hostname))) {
                return {
                    route: new Route(path, routeObj.action, params.params, routeObj?.name),
                    middleware: routeObj.middleware
                };
            }
        }

        return null;
    }

    toRoute(name, parameters = {}) {
        const routes = this.#routes.filter((item) => {
            return (item?.name && item.name === name);
        });

        const route = routes.length > 0 ? routes[0] : null;

        if (!route) {
            return null;
        }

        const toPath = compile(route.path, {encode: encodeURIComponent});

        return toPath(parameters);
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
        const kernel = app().make('app::view-kernel');

        kernel.flush();

        const routeObj = this.match(path);

        if (!routeObj) {
            throw new RouteNotFoundException('[GenesisUI] Route not found: A route could not be matched by the given path', path);
        }

        kernel.attachRequestMiddleware(routeObj.middleware);

        return new Request(routeObj.route, query);
    }
}