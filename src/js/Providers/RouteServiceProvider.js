import {AbstractServiceProvider} from "./AbstractServiceProvider";
import {Router} from "../Routing/Router";
import {Kernel} from "../View/Kernel";

export class RouteServiceProvider extends AbstractServiceProvider {

    boot() {
        this._app.bindSingleton('app::router', () => {
            return new Router();
        });

        this._app.bindInstance('app::view-kernel', new Kernel());
    }

    register() {
    }
}