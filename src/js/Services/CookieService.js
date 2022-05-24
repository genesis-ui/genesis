import {config} from "../GenesisApp";
import {OperationNotAllowedException} from "../Exceptions/OperationNotAllowedException";

export class CookieService {
    #getDecodedStrings() {
        return decodeURIComponent(document.cookie).split(';');
    }

    #split(string) {
        const [name, ...parts] = string.split('=');
        const value = parts.join('=');

        return [name, value];
    }

    all() {
        let cookies = {};

        for (const string of this.#getDecodedStrings()) {
            let cookieArray = this.#split(string);
            cookies[cookieArray[0].replace(' ', '')] = cookieArray[1];
        }

        return cookies;
    }

    get(name) {
        const value = this.all()?.[name] ?? null;

        return value !== null ? decodeURIComponent(value) : null;
    }

    put(name, value, expiresAt) {
        if (this.exists('genesis.opted-in') || config('cookies.requireOptIn') === false) {
            let dateString = expiresAt.toUTCString();

            let cookieString = (name + '=' + encodeURIComponent(value) + '; expires=' + dateString + '; path=/;');

            if (config('cookies.secure')) {
                cookieString += ' secure';
            }

            document.cookie = cookieString;

            return;
        }

        throw new OperationNotAllowedException('[GenesisUI] ');
    }

    delete(name) {
        let cookieString = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        if (config('cookies.secure')) {
            cookieString += ' secure';
        }

        document.cookie = cookieString;
    }

    exists(name) {
        return this.get(name) !== null;
    }
}