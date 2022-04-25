import {ExampleController} from "../js/View/Controllers/ExampleController";

/**
 * @param {Routes} routes
 * @returns {Routes}
 */
export default function (routes) {
    routes.add('/', [ExampleController, 'welcome']);

    return routes;
}