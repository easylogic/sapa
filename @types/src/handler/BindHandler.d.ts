import { BaseHandler } from "./BaseHandler";
import { MagicMethodResult } from '../functions/MagicMethod';
export declare class BindHandler extends BaseHandler {
    _bindMethods: MagicMethodResult[] | undefined;
    load(...args: string[]): void;
    bindData(...args: string[]): void;
    destroy(): void;
}
