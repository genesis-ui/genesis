import {AbstractClass} from "./Abstract/AbstractClass";
import {AbstractTrait} from "./Abstract/AbstractTrait";
import {Enum} from "./Abstract/Enum";
import {Traits} from "./Abstract/Traits";
import {Container} from "./Application/Container/Container";
import {Resolvable} from "./Application/Container/Resolvable";
import {Bootstrapper} from "./Application/Bootstrapper";
import {Genesis} from "./Application/Genesis";
import ReactVersion from "./Compliance/ReactVersion";
import {AbstractException} from "./Exceptions/AbstractException";
import {AbstractHandler} from "./Exceptions/AbstractHandler";
import {BindingException} from "./Exceptions/BindingException";
import {BindingResolutionException} from "./Exceptions/BindingResolutionException";
import {ExceptionHandler} from "./Exceptions/ExceptionHandler";
import {MethodNotImplementedException} from "./Exceptions/MethodNotImplementedException";
import {OperationNotAllowedException} from "./Exceptions/OperationNotAllowedException";
import {RouteNotFoundException} from "./Exceptions/RouteNotFoundException";
import {RuntimeException} from "./Exceptions/RuntimeException";
import {UnhandledException} from "./Exceptions/UnhandledException";
import {AbstractListener} from "./Listeners/AbstractListener";
import {HandleHistory} from "./Listeners/HandleHistory";
import {Classname} from "./Models/Classname";
import {Env} from "./Models/Env";
import {RouteController} from "./Routing/Factory/RouteController";
import {RouteFactory} from "./Routing/Factory/RouteFactory";
import {RouteGroup} from "./Routing/Factory/RouteGroup";
import {Routes} from "./Routing/Factory/Routes";
import {AbstractMiddleware} from "./Routing/Middleware/AbstractMiddleware";
import {ExampleMiddleware} from "./Routing/Middleware/ExampleMiddleware";
import {UpdateHistory} from "./Routing/Middleware/UpdateHistory";
import {Goto} from "./Routing/Goto";
import {Route} from "./Routing/Route";
import {Router} from "./Routing/Router";
import {Request} from "./Routing/Request";
import {AbstractServiceProvider} from "./Providers/AbstractServiceProvider";
import {ConfigServiceProvider} from "./Providers/ConfigServiceProvider";
import {EventServiceProvider} from "./Providers/EventServiceProvider";
import {ExampleServiceProvider} from "./GenesisApp";
import {RouteServiceProvider} from "./Providers/RouteServiceProvider";
import {TranslationServiceProvider} from "./Providers/TranslationServiceProvider";
import {ConfigService} from "./Services/ConfigService";
import {CookieConsentService} from "./Services/CookieConsentService";
import {CookieService} from "./Services/CookieService";
import {LocalizationService} from "./Services/LocalizationService";
import {RouteService} from "./Services/RouteService";
import {ServiceProviderService} from "./Services/ServiceProviderService";
import {TranslationService} from "./Services/TranslationService";
import {Utility} from "./Utility/Utility";
import {AbstractController} from "./View/Controllers/AbstractController";
import {ExampleController} from "./View/Controllers/ExampleController";
import {AbortResponse} from "./View/Responses/AbortResponse";
import {RedirectResponse} from "./View/Responses/RedirectResponse";
import {Response} from "./View/Responses/Response";
import {Welcome} from "./View/UI/Example/Pages/Welcome";
import {Layout} from "./View/UI/Example/Layout";
import {Kernel} from "./View/Kernel";
import {Renderer} from "./View/Renderer";
import {gns, config, configObj, env} from "./GenesisApp";

const Abstract = {
    AbstractClass,
    AbstractTrait,
    Enum,
    Traits,
};

const Application = {
    Container: {
        Container,
        Resolvable,
    },
    Bootstrapper,
    Genesis,
};

const Compliance = {
    ReactVersion,
};

const Exceptions = {
    AbstractException,
    AbstractHandler,
    BindingException,
    BindingResolutionException,
    ExceptionHandler,
    MethodNotImplementedException,
    OperationNotAllowedException,
    RouteNotFoundException,
    RuntimeException,
    UnhandledException,
};

const Listeners = {
    AbstractListener,
    HandleHistory,
};

const Models = {
    Classname,
    Env,
};

const Providers = {
    AbstractServiceProvider,
    ConfigServiceProvider,
    EventServiceProvider,
    ExampleServiceProvider,
    RouteServiceProvider,
    TranslationServiceProvider,
};

const Routing = {
    Factory: {
        RouteController,
        RouteFactory,
        RouteGroup,
        Routes,
    },
    Middleware: {
        AbstractMiddleware,
        ExampleMiddleware,
        UpdateHistory,
    },
    Goto,
    Request,
    Route,
    Router,
};

const Services = {
    ConfigService,
    CookieConsentService,
    CookieService,
    LocalizationService,
    RouteService,
    ServiceProviderService,
    TranslationService,
};

/**
 * @type {{Controllers: {ExampleController: ExampleController, AbstractController: AbstractController}, UI: {Example: {Pages: {Welcome: Welcome}, Layout: Layout}}, Renderer: Renderer, Kernel: Kernel, Responses: {Response: Response, AbortResponse: AbortResponse, RedirectResponse: RedirectResponse}}}
 */
const View = {
    Controllers: {
        AbstractController,
        ExampleController,
    },
    Responses: {
        AbortResponse,
        RedirectResponse,
        Response
    },
    UI: {
        Example: {
            Pages: {
                Welcome,
            },
            Layout,
        },
    },
    Kernel,
    Renderer,
};

/**
 * Genesis namespace
 * @namespace
 * @type {{Services: {CookieService: CookieService, ConfigService: ConfigService, LocalizationService: LocalizationService, TranslationService: TranslationService, ServiceProviderService: ServiceProviderService, RouteService: RouteService, CookieConsentService: CookieConsentService}, Listeners: {HandleHistory: HandleHistory, AbstractListener: AbstractListener}, Utility: Utility, Compliance: {ReactVersion: ({is_present: boolean}|{is_present: boolean, major: *|number, minor: string, versions: string[], raw: string, hash: string})}, Abstract: {Enum: Enum, AbstractClass: AbstractClass, AbstractTrait: AbstractTrait, Traits: Traits}, Exceptions: {ExceptionHandler: ExceptionHandler, UnhandledException: UnhandledException, RuntimeException: RuntimeException, MethodNotImplementedException: MethodNotImplementedException, AbstractException: AbstractException, BindingResolutionException: BindingResolutionException, RouteNotFoundException: RouteNotFoundException, OperationNotAllowedException: OperationNotAllowedException, AbstractHandler: AbstractHandler, BindingException: BindingException}, Routing: {Goto: Goto, Request: Request, Factory: {RouteGroup: RouteGroup, Routes: Routes, RouteController: RouteController, RouteFactory: RouteFactory}, Router: Router, Middleware: {AbstractMiddleware: AbstractMiddleware, ExampleMiddleware: ExampleMiddleware, UpdateHistory: UpdateHistory}, Route: Route}, Models: {Classname: Classname, Env: Env}, Providers: {TranslationServiceProvider: TranslationServiceProvider, AbstractServiceProvider: AbstractServiceProvider, EventServiceProvider: EventServiceProvider, RouteServiceProvider: RouteServiceProvider, ExampleServiceProvider: ExampleServiceProvider, ConfigServiceProvider: ConfigServiceProvider}, Application: {Bootstrapper: Bootstrapper, Container: {Container: Container, Resolvable: Resolvable}, Genesis: Genesis}, View: {Controllers: {ExampleController: ExampleController, AbstractController: AbstractController}, UI: {Example: {Pages: {Welcome: Welcome}, Layout: Layout}}, Renderer: Renderer, Kernel: Kernel, Responses: {Response: Response, AbortResponse: AbortResponse, RedirectResponse: RedirectResponse}}}}
 */
export const Genesis = {
    Abstract,
    Application,
    Compliance,
    Exceptions,
    Listeners,
    Models,
    Providers,
    Routing,
    Services,
    View,
    Utility,
};

export {
    gns,
    config,
    configObj,
    env,
};