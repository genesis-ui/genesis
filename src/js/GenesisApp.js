import {Genesis as App} from './Application/Genesis';
import {ConfigService} from "./Services/ConfigService";
import {ExampleServiceProvider} from "./Providers/ExampleServiceProvider";

/**
 * @returns {Genesis}
 */
export function gns() {
    return App.getInstance();
}

/**
 * @param {string} key
 * @returns {*}
 */
export function config(key) {
    return new ConfigService().get(key);
}

/**
 * @param {string} name
 * @param {?string} key
 * @returns {*}
 */
export function configObj(name, key = null) {
    return new ConfigService().getObj(name, key);
}

/**
 * @param {string} key
 * @param {*} defaultValue
 * @returns {string|number|boolean|null}
 */
export function env(key, defaultValue = null) {
    return gns().env(key) ?? defaultValue
}

export {
    App,
    ExampleServiceProvider,
}