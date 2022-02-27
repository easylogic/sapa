import { BaseHandler } from "./BaseHandler";
import { MagicMethodResult } from '../functions/MagicMethod';
export declare class BindHandler extends BaseHandler {
    _bindMethods: MagicMethodResult[] | undefined;
    load(...args: string[]): void;
    /**
     *
     * dom element 에 지정된 bind 를 바로 실행하는 방법
     *
     * ```js
     * <div ref="$list" bind="${variable(() => {
     *    style: {
     *      'background-color': 'red',
     *      'color': 'white'
     *    }
     * })}" />
     * ```
     *
     * @param {string} refName
     */
    bindLocalValue(refName?: string): Promise<void>;
    bindData(...args: string[]): void;
    destroy(): void;
}
