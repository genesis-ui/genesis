import {AbstractHandler} from "./AbstractHandler";
import {AbstractException} from "./AbstractException";
import {get} from "../GenesisApp";

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

        if (!(exception instanceof AbstractException) || !(fn = this.map?.exception.getName())) {
            this.#unknown(exception)
        }

        fn(exception);
    }

    /**
     * @returns {Renderer}
     */
    #getRenderer() {
        return get().make('app::renderer');
    }

    #notFound() {
        this.#getRenderer().renderComponent((
            <>
                <h1>
                    404 - Not Found
                </h1>

                <p>
                    The resource you are looking for does not exist.
                </p>
            </>
        ));
    }

    /**
     *
     * @param {RuntimeException} exception
     */
    #runtime(exception) {
        this.#getRenderer().renderComponent((
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
        this.#getRenderer().renderComponent((
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