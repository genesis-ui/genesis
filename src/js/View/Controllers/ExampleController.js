import {AbstractController} from "./AbstractController";
import {Welcome} from "../UI/Example/Pages/Welcome";
import {Response} from "../Responses/Response";

export class ExampleController extends AbstractController {
    static mapRoutes() {
        return {
            'welcome': 'welcome'
        };
    }

    /**
     * @param {Request} request
     * @returns {Response}
     */
    welcome(request) {
        return new Response(<Welcome/>);
    }
}