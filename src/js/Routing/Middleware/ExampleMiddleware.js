import {AbstractMiddleware} from "./AbstractMiddleware";

export class ExampleMiddleware extends AbstractMiddleware {

    handle(request, next) {
        console.log('Middleware works!');

        return next(request);
    }

}