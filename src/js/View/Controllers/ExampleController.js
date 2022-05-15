import {AbstractController} from "./AbstractController";
import {Welcome} from "../UI/Example/Pages/Welcome";
import {Response} from "../Responses/Response";

export class ExampleController extends AbstractController {
    static mapRoutes() {
        return {
            '/welcome': 'welcome',
            '/tests': 'tests',
            '/subdomain': 'subdomain'
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
}