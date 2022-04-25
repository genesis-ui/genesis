export class RouteNotFoundException extends Error {
    name = 'RouteNotFoundException';
    path;

    constructor(message, path) {
        super(message);

        this.path = path;
    }
}