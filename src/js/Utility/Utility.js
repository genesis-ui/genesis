export class Utility {
    static merge(obj1, obj2) {
        if (obj1) {
            for (const key of Object.keys(obj2)) {
                if (!obj1.hasOwnProperty(key) || typeof obj2[key] !== 'object') {
                    obj1[key] = obj2[key];
                } else {
                    this.merge(obj1[key], obj2[key]);
                }
            }
        }

        return obj1;
    }
}