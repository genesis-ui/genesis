import {Genesis, Genesis as App} from './Application/Genesis';
import {AbstractClass} from "./Abstract/AbstractClass";
import {Traits} from "./Abstract/Traits";
import {Enum} from "./Abstract/Enum";
import {AbstractServiceProvider} from "./Providers/AbstractServiceProvider";
import {Classname} from "./Models/Classname";
import {AbstractListener} from "./Listeners/AbstractListener";
import {AbstractTrait} from "./Abstract/AbstractTrait";
import ReactVersion from "./Compliance/ReactVersion";
import {BindingException} from "./Exceptions/BindingException";
import {BindingResolutionException} from "./Exceptions/BindingResolutionException";
import {MethodNotImplementedException} from "./Exceptions/MethodNotImplementedException";
import {OperationNotAllowedException} from "./Exceptions/OperationNotAllowedException";
import {RuntimeException} from "./Exceptions/RuntimeException";
import {Resolvable} from "./Application/Container/Resolvable";
import {Router} from "./Routing/Router";
import {AbstractController} from "./View/Controllers/AbstractController";
import {ExampleServiceProvider} from "./Providers/ExampleServiceProvider";
import {AbstractMiddleware} from "./Routing/Middleware/AbstractMiddleware";
import {TranslationService} from "./Services/TranslationService";
import {Goto} from "./Routing/Goto";
import {Response} from "./View/Responses/Response";
import {AbstractHandler} from "./Exceptions/AbstractHandler";
import {AbstractException} from "./Exceptions/AbstractException";
import {ConfigService} from "./Services/ConfigService";
import {RedirectResponse} from "./View/Responses/RedirectResponse";
import {CookieService} from "./Services/CookieService";

const Abstract = {
    Class: AbstractClass,
    Trait: AbstractTrait,
    Traits: Traits,
    Enum: Enum,
    ServiceProvider: AbstractServiceProvider,
    Listener: AbstractListener,
    Controller: AbstractController,
    Middleware: AbstractMiddleware,
    ExceptionHandler: AbstractHandler,
    Exception: AbstractException,
};

const Service = {
    Translation: TranslationService,
    Config: ConfigService,
    Cookie: CookieService,
};

const Model = {
    Classname: Classname,
};

const Compliance = {
    React: ReactVersion,
}

const Exception = {
    BindingException: BindingException,
    BindingResolutionException: BindingResolutionException,
    MethodNotImplementedException: MethodNotImplementedException,
    OperationNotAllowedException: OperationNotAllowedException,
    RuntimeException: RuntimeException,
}

/**
 * @deprecated
 * @returns {Genesis}
 */
function get() {
    return app();
}

/**
 * @returns {Genesis}
 */
function app() {
    return Genesis.getInstance();
}

function config(key) {
    return new ConfigService().get(key);
}

function configObj(name, key = null) {
    return new ConfigService().getObj(name, key);
}

function env(key, defaultValue = null) {
    return app().env(key) ?? defaultValue
}

export {
    App,
    Abstract,
    Model,
    Resolvable,
    Compliance,
    Exception,
    Router,
    ExampleServiceProvider,
    get,
    app,
    Goto,
    Service,
    Response,
    RedirectResponse,
    config,
    configObj,
    env,
};