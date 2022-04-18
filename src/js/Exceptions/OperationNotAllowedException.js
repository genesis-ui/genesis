export class OperationNotAllowedException extends Error {
    name = 'OperationNotAllowedException';

    constructor(message) {
        super(message);
    }
}