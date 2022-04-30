import {AbstractController} from "./AbstractController";
import {Welcome} from "../UI/Example/Pages/Welcome";
import {Response} from "../Responses/Response";

export class ExampleController extends AbstractController {
    static mapRoutes() {
        return {
            'welcome': 'welcome',
            'tests': 'tests'
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
                <a href="#" onClick={() => Genesis.Goto.route('example')}>Click</a>
            </div>
        );
    }
}