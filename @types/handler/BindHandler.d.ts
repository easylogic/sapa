import { BaseHandler } from "./BaseHandler";
export declare class BindHandler extends BaseHandler {
    _bindMethods: string[] | undefined;
    load(...args: string[]): void;
    bindData(...args: string[]): void;
    destroy(): void;
}
