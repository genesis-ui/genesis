export class Classname {
    /** @type {(string|null)[]} **/
    #classnameItems;

    /**
     * @param {(string|null)[]} classnameItems
     */
    constructor(classnameItems) {
        this.#classnameItems = classnameItems;
    }

    /**
     * @returns {string}
     */
    combine() {
        let classnames = '';

        for (let classname of this.#classnameItems) {
            if (!classname) {
                continue;
            }

            if (typeof classname === 'string') {
                classname = classname.split(' ');
            }

            classnames += classname.join(' ') + ' ';
        }

        return classnames;
    }
}