import { HTMLInstance, IDom } from "../types";
interface IUpdateElementOptions {
    removedElements?: never[];
    checkPassed?: (oldEl: Element, newEl: Element) => boolean;
}
export declare function DomDiff(A: HTMLInstance | IDom, B: HTMLInstance | IDom, options?: IUpdateElementOptions): void;
export {};
