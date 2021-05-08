import Mediator from "./mediator/mediator";
declare class BaseComponent {
    protected mediator: Mediator | null;
    constructor(mediator?: Mediator | null);
    setMediator(mediator: Mediator): void;
}
export { BaseComponent };
