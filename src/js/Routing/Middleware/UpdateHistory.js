import {AbstractMiddleware} from "./AbstractMiddleware";

export class UpdateHistory extends AbstractMiddleware {

    handle(request, next) {

        const path = request.route().getPath();
        const url = request.getUrl();
        const queryParams = request.queryParams();

        const state = {
            path: path,
            queryParams: queryParams,
        };
        
        if (!request.isHistory()) {
            history.pushState(state, null, url);
        }

        return next(request);
    }
}