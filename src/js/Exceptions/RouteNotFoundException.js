import {AbstractException} from "./AbstractException";

export class RouteNotFoundException extends AbstractException {
    name = 'RouteNotFoundException';
    path;

    constructor(message, path) {
        super(message);

        this.path = path;
    }

    getName() {
        return this.name;
    }
}