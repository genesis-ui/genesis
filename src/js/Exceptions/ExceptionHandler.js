import {AbstractHandler} from "./AbstractHandler";
import {AbstractException} from "./AbstractException";
import {gns} from "../GenesisApp";

export class ExceptionHandler extends AbstractHandler {
    map = {
        'RouteNotFoundException': this.#notFound,
        'RuntimeException': this.#runtime,
        'BindingException': this.#runtime,
        'BindingResolutionException': this.#runtime,
        'MethodNotImplementedException': this.#runtime,
        'OperationNotAllowedException': this.#runtime,
    };

    handle(exception) {
        let fn;

        if (!(exception instanceof AbstractException) || !(fn = this.map?.[exception?.getName() ?? 'unknown'])) {
            this.#unknown(exception)
        }

        fn(exception);
    }

    #notFound(exception) {
        gns().make('app::renderer').renderComponent((
            <>
                <h1>
                    404 - Not Found
                </h1>

                <p>
                    The resource you are looking for does not exist.
                </p>
            </>
        ));

        if (exception?.path) {
            window.location.pathname = exception.path;
        }
    }

    /**
     *
     * @param {RuntimeException} exception
     */
    #runtime(exception) {
        gns().make('app::renderer').renderComponent((
            <>
                <h1>
                    Application Error
                </h1>

                <p>
                    A fatal error has prevented the application from running correctly.
                </p>
            </>
        ));

        console.error(exception);
    }

    #unknown(exception) {
        gns().make('app::renderer').renderComponent((
            <>
                <h1>
                    Unknown Error
                </h1>

                <p>
                    A unknown error has prevented the application from running correctly.
                </p>
            </>
        ));

        console.error(exception);
    }
}