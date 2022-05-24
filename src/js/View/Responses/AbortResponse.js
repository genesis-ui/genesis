export class AbortResponse {
    #callback;

    constructor(callback) {
        this.#callback = callback;
    }

    callback(request) {
        this.#callback(request);
    }
}