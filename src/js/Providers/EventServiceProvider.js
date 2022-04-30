import {AbstractServiceProvider} from "./AbstractServiceProvider";
import {HandleHistory} from "../Listeners/HandleHistory";

export class EventServiceProvider extends AbstractServiceProvider {

    boot() {
    }

    register() {
        this.addListener('popstate', HandleHistory);
    }
}