import {AbstractException} from "./AbstractException";

export class BindingException extends AbstractException {
    message;
    bindableName;
    name = 'BindingException';

    constructor(message, bindableName) {
        super(message);

        this.bindableName = bindableName;
    }

    getName() {
        return this.name;
    }
}