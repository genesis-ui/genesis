import {AbstractException} from "./AbstractException";

export class UnhandledException extends AbstractException {
    originalException;

    constructor(message, originalException) {
        super(message);
        this.originalException = originalException;
    }

    getName() {
        return 'UnhandledException';
    }
}