export declare const MAGIC_METHOD_REG: RegExp;
export declare const MAGIC_METHOD = "@magic:";
export declare const SPLITTER = "|";
export declare const FUNC_REGEXP: RegExp;
export declare const FUNC_START_CHARACTER = "(";
export declare const FUNC_END_CHARACTER = ")";
export interface PipeParam {
    type: string;
    value?: string;
    args?: string[];
    func?: string;
}
export interface PipeObject {
    [key: string]: PipeParam[];
}
export interface MagicMethodResult {
    originalMethod: string;
    method: string;
    args: string[];
    pipes: PipeParam[];
    keys: PipeObject;
}
export default class MagicMethod {
    static make(str: string, ...args: string[]): string;
    static check(str: string): boolean;
    static parse(str: string): MagicMethodResult | undefined;
    static parsePipe(it: string): PipeParam;
}
