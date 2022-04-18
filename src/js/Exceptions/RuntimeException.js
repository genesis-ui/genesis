export class RuntimeException extends Error {
    name = 'RuntimeException';

    constructor(message) {
        super(message);
    }
}