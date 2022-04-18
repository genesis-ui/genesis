export class BindingResolutionException extends Error {
    message;
    bindableName;
    name = 'BindingResolutionException';

    constructor(message, bindableName) {
        super(message);

        this.bindableName = bindableName;
    }
}