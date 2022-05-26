import {AbstractController} from "./AbstractController";
import {Welcome} from "../UI/Example/Pages/Welcome";
import {Response} from "../Responses/Response";
import {CookieConsentService} from "../../Services/CookieConsentService";

export class ExampleController extends AbstractController {
    static mapRoutes() {
        return {
            '/welcome': 'welcome',
            '/tests': 'tests',
            '/subdomain': 'subdomain',
            '/cookieconsent': 'cookieConsent'
        };
    }

    /**
     * @param {Request} request
     * @returns {Response}
     */
    welcome(request) {
        return new Response(<Welcome/>);
    }

    /**
     * @param {Request} request
     * @returns {Response}
     */
    tests(request) {
        return new Response(
            <div>
                <a href="#" onClick={() => Genesis.Goto.route('example.welcome')}>Click</a>
            </div>
        );
    }

    /**
     * @param {Request} request
     * @returns {Response}
     */
    subdomain(request) {
        return new Response(
            <div>
                This route only works on the 'test.latus.local' subdomain
            </div>
        );
    }

    cookieConsent(request) {
        const consentService = new CookieConsentService();

        if (consentService.hasUserGivenConsent('example')) {
            return new Response().abort(() => {
                alert('You have to consent to cookies!');
            });
        }

        return new Response(
            <div>
                You have consented to cookies!
            </div>
        );
    }
}