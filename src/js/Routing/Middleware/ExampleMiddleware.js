import {AbstractMiddleware} from "./AbstractMiddleware";
import {Response} from "../../GenesisApp";

export class ExampleMiddleware extends AbstractMiddleware {

    handle(request, next) {
        console.log('Middleware works!');

        if (request.route().getName() !== 'example.tests') {
            return new Response().redirect('example.tests');
        }

        return next(request);
    }

}