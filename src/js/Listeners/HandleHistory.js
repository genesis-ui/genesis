import {AbstractListener} from "./AbstractListener";
import {Goto} from "../Routing/Goto";

export class HandleHistory extends AbstractListener {

    handle(event) {
        event.preventDefault();

        const state = event?.state ?? {
            path: '/',
            queryParams: {}
        };

        Goto.history(state);
    }
}