export class MethodNotImplementedException extends Error {
    baseClassName;
    extendingClassName;
    methodName;
    name = 'MethodNotImplementedException';

    constructor(message, baseClass, extendingClass, method) {
        super(message);

        this.baseClassName = baseClass;
        this.extendingClassName = extendingClass;
        this.methodName = method;
    }

    getName() {
        return this.name;
    }
}