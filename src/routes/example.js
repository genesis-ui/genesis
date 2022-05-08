import {ExampleController} from "../js/View/Controllers/ExampleController";
import {ExampleMiddleware} from "../js/Routing/Middleware/ExampleMiddleware";

/**
 * @param {Routes} routes
 * @returns {Routes}
 */
export default function (routes) {
    routes.middleware(ExampleMiddleware).group((routes) => {

        routes.add('/', [ExampleController, 'welcome']);

        routes.controller(ExampleController).name('example');

        return routes;
    })

    return routes;
}