import { BaseStore } from "./BaseStore";
import { Dom } from "./functions/Dom";


/**
 * UIElement 렌더링 하기 
 * 
 * @param {UIElement} ElementClass
 * @param {Object} opt 
 * @param {string|HTMLElement} opt.container  렌더링 될 객체 
 * @returns {UIElement}
 */ 
export const start = (ElementClass, opt = {}) => {

  const $container = Dom.create(opt.container || document.body);

  const app = new ElementClass(opt, {
    ...opt,
    store: opt.store || new BaseStore()
  });

  app.render($container);

  return app; 
};