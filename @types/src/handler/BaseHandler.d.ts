import { IBaseHandler, IEventMachine, IKeyValue } from "../types";
export declare class BaseHandler implements IBaseHandler {
    context: IEventMachine;
    options: IKeyValue;
    constructor(context: IEventMachine, options?: IKeyValue);
    initialize(): void;
    load(): void;
    refresh(): void;
    render(): void;
    getRef(id: string): any;
    run(): void;
    destroy(): void;
}
