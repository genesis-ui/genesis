import {CookieService} from "./CookieService";

export class CookieConsentService {
    #getCookieService() {
        return new CookieService();
    }

    #createCookieName(groupName) {
        return 'genesis.opted-in.' + groupName;
    }

    hasUserGivenConsent(groupName) {
        const cookieName = this.#createCookieName(groupName);

        return this.#getCookieService().exists(cookieName);
    }

    userConsents(groupName) {
        const cookieName = this.#createCookieName(groupName);

        this.#getCookieService().put(cookieName, 1)
    }

    userRevokesConsent(groupName) {
        const cookieName = this.#createCookieName(groupName);

        this.#getCookieService().delete(cookieName);
    }
}