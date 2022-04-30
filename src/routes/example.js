import {ExampleController} from "../js/View/Controllers/ExampleController";

/**
 * @param {Routes} routes
 * @returns {Routes}
 */
export default function (routes) {
    routes.add('/', [ExampleController, 'welcome']).name('example');
    routes.add('/tests/:prop1', [ExampleController, 'tests']).name('tests');

    return routes;
}