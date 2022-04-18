import {Genesis as App} from './Application/Genesis';
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

const Abstract = {
    Class: AbstractClass,
    Trait: AbstractTrait,
    Traits: Traits,
    Enum: Enum,
    ServiceProvider: AbstractServiceProvider,
    Listener: AbstractListener,
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

export {
    App,
    Abstract,
    Model,
    Resolvable,
    Compliance,
    Exception
};