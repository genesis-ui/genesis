import {AbstractException} from "./AbstractException";

export class OperationNotAllowedException extends AbstractException {
    name = 'OperationNotAllowedException';

    constructor(message) {
        super(message);
    }

    getName() {
        return this.name;
    }
}