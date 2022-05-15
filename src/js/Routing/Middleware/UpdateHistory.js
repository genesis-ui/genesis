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

        if (!history?.state) {
            history.replaceState(state, '', url);
        } else if (!request.isHistory()) {
            history.pushState(state, '', url);
        }

        return next(request);
    }
}