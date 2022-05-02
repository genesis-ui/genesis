import {AbstractException} from "./AbstractException";

export class BindingResolutionException extends AbstractException {
    message;
    bindableName;
    name = 'BindingResolutionException';

    constructor(message, bindableName) {
        super(message);

        this.bindableName = bindableName;
    }

    getName() {
        return this.name;
    }
}