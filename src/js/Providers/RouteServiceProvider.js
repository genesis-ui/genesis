import {AbstractServiceProvider} from "./AbstractServiceProvider";
import {Router} from "../Routing/Router";
import {Kernel} from "../View/Kernel";
import {UpdateHistory} from "../Routing/Middleware/UpdateHistory";
import {ExceptionHandler} from "../Exceptions/ExceptionHandler";

export class RouteServiceProvider extends AbstractServiceProvider {

    boot() {
        this._app.bindSingleton('app::router', () => {
            return new Router();
        });

        this._app.bindInstance('app::view-kernel', new Kernel([UpdateHistory]));

        this.#bindExceptionHandler();
    }

    #bindExceptionHandler() {
        const exceptionBindable = () => {
            return new ExceptionHandler();
        };

        this._app.bind('handler::RouteNotFoundException', exceptionBindable);
        this._app.bind('handler::RuntimeException', exceptionBindable);
        this._app.bind('handler::BindingException', exceptionBindable);
        this._app.bind('handler::BindingResolutionException', exceptionBindable);
        this._app.bind('handler::MethodNotImplementedException', exceptionBindable);
        this._app.bind('handler::OperationNotAllowedException', exceptionBindable);
    }

    register() {
    }
}