export class Enum {
    /**
     * @param {Object|function} staticObject
     * @param {Object.<string, string>} enums
     */
    static create(staticObject, enums) {
        for (const [name, backendValue] of Object.entries(enums)) {
            Object.defineProperty(staticObject, name.toString(), {
                value: backendValue,
                writable: false,
                enumerable: true,
                configurable: false,
            });
        }
    }

    static from() {

    }
}