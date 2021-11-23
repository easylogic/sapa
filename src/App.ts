import { BaseStore } from "./BaseStore";
import { Dom } from "./functions/Dom";
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
export const start = (ElementClass: UIElementConstructor, opt: IStartOptions = {}): UIElement => {

  const $container = Dom.create(opt?.container || document.body);

  const app = new ElementClass(opt, {
    ...opt,
    store: opt.store || new BaseStore()
  });

  app.render($container);

  return app as UIElement; 
};