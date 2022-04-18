export class Traits {
    /**
     * @param {Class} staticObject
     * @param {Class[]} traits
     */
    static use(staticObject, traits) {
        for (const trait of traits) {
            new trait(staticObject);
        }
    }
}