import {AbstractServiceProvider} from "./AbstractServiceProvider";
import example from "../../routes/example";

export class ExampleServiceProvider extends AbstractServiceProvider {

    boot() {
    }

    register() {
        this.loadRoutes(example);
    }
}