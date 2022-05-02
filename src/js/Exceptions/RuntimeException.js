import {AbstractException} from "./AbstractException";

export class RuntimeException extends AbstractException {
    name = 'RuntimeException';

    constructor(message) {
        super(message);
    }

    getName() {
        return this.name;
    }
}