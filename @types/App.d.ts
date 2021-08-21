import { IStartOptions, UIElementConstructor } from "./types";
import { UIElement } from "./UIElement";
/**
 * UIElement 렌더링 하기
 *
 * @param {IUIElement} ElementClass
 * @param {Object} opt
 * @param {string|HTMLElement} opt.container  렌더링 될 객체
 * @returns {UIElement}
 */
export declare const start: (ElementClass: UIElementConstructor, opt?: IStartOptions) => UIElement;
