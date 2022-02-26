
import { isNumber, isObject } from "../functions/func";
import { BIND_CHECK_FUNCTION, BIND_CHECK_DEFAULT_FUNCTION } from "../Event";
import { BaseHandler } from "./BaseHandler";
import { IBindHandlerData, IDom, IKeyValue } from "../types";
import { MagicMethodResult } from '../functions/MagicMethod';

const convertToPx = (key: string, value: any) => {

  if (isNumber(value)) {
    switch (key) {
      case 'width':
      case 'height':
      case 'top':
      case 'left':
      case 'right':
      case 'bottom':
        return value + 'px';
    }

  }

  return value;
}

/**
 * 
 * @param {Dom} $element 
 * @param {string} key 
 * @param {any} value 
 */
const applyElementAttribute = ($element: IDom, key: string | IKeyValue, value?: string | string[] | object | IKeyValue | Function) => {

  if (key === 'cssText') {
    /**
     * cssText: 'position:absolute'
     */
    ($element as IDom).cssText(value);
    return;
  } else if (key === "style") {
    /**
     * style: { key: value }
     */
    if (typeof (value) !== 'string') {

      const css = {}
      Object.entries(value as IKeyValue).forEach(([key, value]) => {
        css[key] = convertToPx(key, value);
      })


      $element.css(value);
    }

    return;
  } else if (key === "class") {
    //  "class" : [ 'className', 'className' ] 
    //  "class" : { key: true, key: false } 
    //  "class" : 'string-class' 

    if (Array.isArray(value)) {
      $element.addClass(...(value)?.filter(Boolean));
    } else if (isObject(value)) {
      const keys = Object.keys(value as IKeyValue);
      for (var i = 0, len = keys.length; i < len; i++) {
        const className = keys[i];
        const hasClass = (value as IKeyValue)[className];

        $element.toggleClass(className, hasClass);
      }
    } else {
      $element.htmlEl.className = value;
    }

    return;
  } else if (key === 'callback') {
    if (typeof value === 'function') {
      value();
      return;
    }
  }

  if (typeof value === 'undefined') {
    $element.removeAttr(key);
  } else {
    if ($element.el.nodeName === "TEXTAREA" && key === "value") {
      $element.text(value);
    } else if (key === 'text' || key === 'textContent') {
      $element.text(value);
    } else if (key === 'innerHTML' || key === 'html') {
      $element.html(value);
    } else if (key === 'htmlDiff') {
      $element.updateDiff(value);
    } else if (key === 'svgDiff') {
      $element.updateSVGDiff(value);
    } else if (key === 'value') {
      $element.val(value);
    } else {
      $element.attr(key, value);
    }
  }
};

export class BindHandler extends BaseHandler {
  _bindMethods: MagicMethodResult[] | undefined;

  load(...args: string[]) {
    this.bindData(...args);
  }

  // 어떻게 실행하는게 좋을까? 
  // this.runHandle('bind', ...);
  bindData(...args: string[]) {
    if (!this._bindMethods) {
      this._bindMethods = this.context.filterProps('bind');
    }
    /**
     * BIND 를 해보자.
     * 이시점에 하는게 맞는지는 모르겠지만 일단은 해보자.
     * BIND 는 특정 element 에 html 이 아닌 데이타를 업데이트하기 위한 간단한 로직이다.
     */
    const bindList = this._bindMethods?.filter(it => {
      if (!args.length) return true;

      return args.indexOf(it.args[0]) > -1
    })

    bindList?.forEach(async (it) => {
      const bindMethod = this.context[it.originalMethod];

      let refObject = null;

      it.pipes.forEach(pipe => {
        if(pipe.type === 'keyword') {
          refObject = this.getRef(`${pipe.value}`);
        }
      })


      let refCallback = BIND_CHECK_DEFAULT_FUNCTION;

      if (typeof (refObject) === 'string' && refObject !== '') {
        refCallback = BIND_CHECK_FUNCTION(refObject);
      } else if (typeof refObject === 'function') {
        refCallback = refObject;
      }

      const elName = it.args[0];
      let $element = this.context.refs[elName];

      // isBindCheck 는 binding 하기 전에 변화된 지점을 찾아서 업데이트를 제한한다.
      const isBindCheck = typeof (refCallback) === 'function' && refCallback.call(this.context);
      if ($element && isBindCheck) {
        const results = (await bindMethod.call(this.context, ...args)) as IBindHandlerData;

        if (!results) return;

        const keys = Object.keys(results);
        for (var elementKeyIndex = 0, len = keys.length; elementKeyIndex < len; elementKeyIndex++) {
          const key = keys[elementKeyIndex];
          const value = results[key];

          applyElementAttribute($element, key, value);
        }
      }
    });
  }

  destroy() {
    this._bindMethods = undefined
  }


}