export class Classname {
    #classnameItems;

    constructor(classnameItems) {
        this.#classnameItems = classnameItems;
    }

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