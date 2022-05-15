import {AbstractServiceProvider} from "./AbstractServiceProvider";
import app from "../../config/app";
import cookies from "../../config/cookies";

export class ConfigServiceProvider extends AbstractServiceProvider {

    boot() {
    }

    register() {
        this.loadConfig('app', app);
        this.loadConfig('cookies', cookies);
    }
}