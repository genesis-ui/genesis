export class BindingException extends Error {
    message;
    bindableName;
    name = 'BindingException';

    constructor(message, bindableName) {
        super(message);

        this.bindableName = bindableName;
    }
}