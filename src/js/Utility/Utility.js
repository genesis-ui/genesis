export class Utility {
    static merge(firstObject, secondObject) {
        if (firstObject && secondObject) {
            for (const key of Object.keys(secondObject)) {
                const firstObjectEntry = firstObject?.[key] ?? null;
                const secondObjectEntry = secondObject[key];

                if (!firstObjectEntry) {
                    firstObject[key] = secondObjectEntry;
                } else if (typeof firstObjectEntry === 'object' && typeof secondObjectEntry === 'object') {
                    firstObject[key] = this.merge(firstObjectEntry, secondObjectEntry);
                }
            }

            return firstObject;
        }

        return firstObject ?? secondObject ?? null;
    }
}