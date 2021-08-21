
import { DomElement, HTMLInstance, IDom, IKeyValue } from "../types";
import { DomDiff } from "./DomDiff";

/**
 * Dom 유틸리티 
 * 
 */ 
export class Dom implements IDom {
  el: HTMLInstance;
  _initContext: any;
  constructor(tag: DomElement, className: string = '', attr: IKeyValue = {}) {
    if (typeof tag !== 'string') {
      this.el = tag;
    } else {
      var el = document.createElement(tag);

      if (className) {
        el.className = className;
      }
 
      for (var k in attr) {
        el.setAttribute(k, attr[k]);
      }

      this.el = el;
    }
  }

  static create (tag: DomElement, className: string = '', attr: IKeyValue = {}) {
    return new Dom(tag, className, attr);
  }
 
  /**
   * @param {any} htmlString
   */
  static createByHTML (htmlString: any) {
    var div = Dom.create('div')
    var list = (div.html(htmlString) as Dom).children();

    if (list.length) {
      return Dom.create(list[0].el);
    }

    return null; 
  }

  static getScrollTop() {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }

  static getScrollLeft() {
    return Math.max(
      window.pageXOffset,
      document.documentElement.scrollLeft,
      document.body.scrollLeft
    );
  }

  static parse(html: string) {
    var parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }

  static body () {
    return Dom.create(document.body)
  }

  get htmlEl (): HTMLElement {
    return this.el as HTMLElement;
  }
  
  get inputEl (): HTMLInputElement {
    return this.el as HTMLInputElement
  }
  get svgEl (): SVGElement {
    return this.el as SVGElement;
  }

  setAttr (obj: IKeyValue) {
    Object.keys(obj).forEach(key => {
      this.attr(key, obj[key])
    })
    return this;  
  }

  setAttrNS (obj: IKeyValue, namespace = 'http://www.w3.org/2000/svg') {
    Object.keys(obj).forEach(key => {
      this.attrNS(key, obj[key], namespace)
    })
    return this;  
  }  

  setProp (obj: IKeyValue) {
    Object.keys(obj).forEach(key => {
      // 동일한 값을 갱신하지 않는다. 
      if (this.htmlEl[key] != obj[key]) {
        this.htmlEl[key] = obj[key];
      }
    })
    return this;  
  }

  /**
   * data-xxx 속성을 관리한다. 
   * 
   * @param {string} key 
   * @param {any} value 
   */
  data (key: string, value: any) {
    if (arguments.length === 1) {
      return this.attr('data-' + key);
    } else if (arguments.length === 2) {
      return this.attr('data-' + key, value);
    }

    //TODO:  data 속성을 모두 {[key]: value} 형태로 리턴하기 

    return this; 
  }

  /**
   * Dom attribute 얻기 또는 설정 
   * 
   * get ->  Dom.create(targetElement).attr('key');
   * set -> Dom.create(targetElement).attr('key', value);
   * 
   * @param {string} key 
   * @param {[string]} value 
   */
  attr(key: string, value?: undefined) {
    if (arguments.length == 1) {
      return this.htmlEl.getAttribute(key);
    }

    // 동일한 속성 값이 있다면 변경하지 않는다. 
    if (this.htmlEl.getAttribute(key) != value) {
      this.htmlEl.setAttribute(key, `${value}`);
    }

    return this;
  }

  /**
   * @param {any} key
   * @param {any} value
   */
  attrNS(key: string, value: any, namespace = 'http://www.w3.org/2000/svg') {
    if (arguments.length == 1) {
      return this.svgEl.getAttributeNS(namespace, key);
    }

    // 동일한 속성 값이 있다면 변경하지 않는다. 
    if (this.svgEl.getAttributeNS(namespace, key) != value) {
      this.svgEl.setAttributeNS(namespace, key, value);
    }

    return this;
  }  

  /**
   * @param {any} keyField
   */
  attrKeyValue(keyField: any): IKeyValue {
    return {
      [`${this.htmlEl.getAttribute(keyField)}`]: this.val()
    }
  }

  attrs(...args: string[]) {
    return args.map(key => {
      return this.htmlEl.getAttribute(key);
    });
  }

  /**
   * @param {any[]} args
   */
  styles(...args: any[]) {
    return args.map(key => {
      return this.htmlEl.style[key];
    });
  }  

  /**
   * @param {string} key
   */
  removeAttr(key: string) {
    this.htmlEl.removeAttribute(key);

    return this;
  }

  /**
   * @param {any} key
   */
  removeStyle(key: any) {
    this.htmlEl.style.removeProperty(key);
    return this;
  }

  /**
   * @param {{ el: any; }} checkElement
   */
  is(checkElement: { el: any; }) {
    return this.htmlEl === (checkElement.el || checkElement);
  }

  /**
   * @param {string} tag
   */
  isTag(tag: string) {
    return this.htmlEl.tagName.toLowerCase() === tag.toLowerCase()
  }

  /**
   * @param {any} cls
   */
  closest(cls: any) {
    var temp: Dom = this;
    var checkCls = false;

    while (!(checkCls = temp.hasClass(cls))) {
      if (temp.el.parentNode) {
        temp = Dom.create(temp.el.parentNode as HTMLElement);
      } else {
        return null;
      }
    }

    if (checkCls) {
      return temp;
    }

    return null;
  }

  path(): Dom[] {

    if (!this.htmlEl) return [];

    const $parentNode = this.parent(); 

    if ($parentNode) {
      return [...$parentNode.path(), this]
    } else {
      return [this]
    }


  }

  parent() {
    return Dom.create(this.htmlEl.parentNode as HTMLElement);
  }

  hasParent () {
    return !!this.htmlEl.parentNode
  }

  /**
   * @param {any[]} args
   */
  removeClass(...args: any[]) {
    this.htmlEl.classList.remove(...args);
    return this;
  }

  /**
   * @param {any} cls
   */
  hasClass(cls: any) {
    if (!this.htmlEl.classList) return false;
    return this.htmlEl.classList.contains(cls);
  }

  /**
   * @param {any[]} args
   */
  addClass(...args: any[]) {
    this.htmlEl.classList.add(...args);

    return this;
  }

  /**
   * @param {any} cls
   */
  onlyOneClass(cls: any) {
    var parent = this.parent();

    parent.children().forEach(it => {
      it.removeClass(cls);
    })

    this.addClass(cls);
  }

  /**
   * @param {string} cls
   * @param {any} isForce
   */
  toggleClass(cls: string, isForce: any) {
    this.htmlEl.classList.toggle(cls, isForce);
    return this; 
  }

  /**
   * @param {string} html
   */
  html(html: string) {
    if (typeof html === 'undefined') {
      return this.htmlEl.innerHTML;
    }

    if (typeof html === 'string') {
      this.htmlEl.innerHTML = html;
    } else {
      this.empty().append(html);
    }

    return this;
  }

  /**
   * @param {any} fragment
   */
  htmlDiff(fragment: HTMLInstance) {
    DomDiff(this, fragment);
  }
  /**
   * @param {any} html
   */
  updateDiff (html: string, rootElement:string = 'div') {
    DomDiff(this, Dom.create(rootElement).html(html) as Dom)
  }

  /**
   * @param {any} html
   */
  updateSVGDiff (html: any, rootElement = 'div') {
    DomDiff(this, (Dom.create(rootElement).html(`<svg>${html}</svg>`) as Dom).firstChild.firstChild)
  }  

  /**
   * @param {any} selector
   */
  find(selector: any) {
    return this.htmlEl.querySelector(selector);
  }

  /**
   * @param {any} selector
   */
  $(selector: any) {
    var node = this.find(selector);
    return node ? Dom.create(node) : null;
  }

  /**
   * @param {any} selector
   */
  findAll(selector: string) {
    return Array.from(this.htmlEl.querySelectorAll(selector));
  }

  $$(selector: string) {
    var arr = this.findAll(selector);
    return arr.map(node => Dom.create(node as HTMLElement));
  }

  empty() {
    while (this.htmlEl.firstChild) this.htmlEl.removeChild(this.htmlEl.firstChild);
    return this;
  }


  append(el: string | HTMLInstance | Dom) {
    if (typeof el === 'string') {
      this.htmlEl.appendChild(document.createTextNode(el));
    } else {
      this.htmlEl.appendChild((el as Dom).el || el);
    }

    return this;
  }

  prepend(el: string| HTMLInstance | Dom) {
    if (typeof el === 'string') {
      this.htmlEl.prepend(document.createTextNode(el));
    } else {
      this.htmlEl.prepend((el as Dom).el || el);
    }

    return this;    
  }

  prependHTML(html: string) {
    var $dom = Dom.create("div").html(html);

    this.prepend(($dom as Dom).createChildrenFragment());

    return $dom;
  }

  appendHTML(html: string) {
    var $dom = Dom.create("div").html(html);

    this.append(($dom as Dom).createChildrenFragment());

    return $dom;
  }

  /**
   * create document fragment with children dom
   */
  createChildrenFragment() {
    const list = this.children();

    var fragment = document.createDocumentFragment();
    list.forEach($el => fragment.appendChild($el.el));

    return fragment;
  }

  /**
   * @param {{ el: any; }} target
   */
  appendTo(target: { el: any; }) {
    var t = target.el ? target.el : target;

    t.appendChild(this.htmlEl);

    return this;
  }

  remove() {
    if (this.htmlEl.parentNode) {
      this.htmlEl.parentNode.removeChild(this.htmlEl);
    }

    return this;
  }

  /**
   * @param {{ el: any; }} el
   */
  removeChild(el: { el: any; }) {
    this.htmlEl.removeChild(el.el || el);
    return this; 
  }

  /**
   * 
   * @param {string} value 
   * @returns {string} 파라미터가 없을 때  textContent 를 리턴한다. 
   */
  text(value?: string | Dom | undefined) {
    if (typeof value === 'undefined') {
      return this.htmlEl.textContent;
    } else {
      var tempText: string = value as string;

      if (value instanceof Dom) {
        tempText = value.text() as string;
      }

      // 값의 변경 사항이 없으면 업데이트 하지 않는다. 
      if (this.htmlEl.textContent !== tempText) {
        this.htmlEl.textContent = tempText;
      }

      return this;
    }
  }

  /**
   *
   * $el.css`
   *  border-color: yellow;
   * `
   *
   * @param {*} key
   * @param {*} value
   */

  css(key: string | ArrayLike<unknown> | IKeyValue, value?: string | undefined) {
    const el = this.htmlEl  as HTMLElement;
    if (typeof key === 'string' && typeof value !== 'undefined') {
      if (key.indexOf('--') === 0 &&  typeof value !== 'undefined' ) {
        el.style.setProperty(key, value);
      } else {
        el.style[key] = value;
      }
    } else if (typeof key !== 'undefined') {
      if (typeof key === 'string') {
        return getComputedStyle(el)[key];  
      } else {
        Object.entries(key).forEach(([localKey, value]) => {
          if (localKey.indexOf('--') === 0 && typeof value !== 'undefined' ) {
            el.style.setProperty(localKey, value);
          } else {
            el.style[localKey] = value;
          }          
        })
      }
    }

    return this;
  }

  getComputedStyle (...list: string[]) {
    var css = getComputedStyle(this.htmlEl);

    var obj = {}
    list.forEach(it => {
      obj[it] = css[it]
    })

    return obj; 
  }

  /**
   * @param {any[]} list
   */
  getStyleList(...list: string[]) {
    const el = this.htmlEl; 
    var style = {};

    var len = el.style.length;
    for (var i = 0; i < len; i++) {
      var key = el.style[i];

      style[key] = el.style[key];
    }

    list.forEach(key => {
      style[key] = this.css(key);
    });

    return style;
  }

  /**
   * @param {any} value
   */
  cssText(value: any): string|Dom {
    const el = this.htmlEl;
    if (typeof value === 'undefined') {
      return el.style.cssText;
    }

    return this;
  }

  cssFloat(key: string) {
    return parseFloat(this.css(key));
  }

  cssInt(key: any) {
    return parseInt(this.css(key));
  }

  /**
   * @param {string} key
   * @param {number} value
   */
  px(key: string, value: number) {
    return this.css(key, `${value}px`);
  }

  rect() {
    return this.htmlEl.getBoundingClientRect();
  }

  bbox () {
    return (this.el as SVGSVGElement).getBBox();
  }

  isSVG () {
    return this.htmlEl.tagName.toUpperCase() === 'SVG';
  }

  offsetRect() {
    const el = this.htmlEl;
    if (this.isSVG()) {
      const parentBox = this.parent().rect();
      const box = this.rect();

      return {
        x: box.x - parentBox.x,
        y: box.y - parentBox.y,
        top: box.x - parentBox.x,
        left: box.y - parentBox.y,
        width: box.width,
        height: box.height
      }
    }

    return {
      x: el.offsetLeft,
      y: el.offsetTop,
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }

  offset() {
    var rect = this.rect();

    var scrollTop = Dom.getScrollTop();
    var scrollLeft = Dom.getScrollLeft();

    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }

  offsetLeft() {
    return this.offset().left;
  }

  offsetTop() {
    return this.offset().top;
  }

  position() {
    if (this.htmlEl.style.top) {
      return {
        top: parseFloat(this.css("top")),
        left: parseFloat(this.css("left"))
      };
    } else {
      return this.rect();
    }
  }

  size() {
    return [this.width(), this.height()];
  }

  width() {
    return this.htmlEl.offsetWidth || this.rect().width;
  }

  contentWidth() {
    return (
      this.width() -
      this.cssFloat("padding-left") -
      this.cssFloat("padding-right")
    );
  }

  height() {
    return this.htmlEl.offsetHeight || this.rect().height;
  }

  contentHeight() {
    return (
      this.height() -
      this.cssFloat("padding-top") -
      this.cssFloat("padding-bottom")
    );
  }

  /**
   * @param {{ val: () => any; } | undefined} [value]
   */
  val(value?: Dom | string) {
    if (typeof value === 'undefined') {
      return this.inputEl.value;
    } else if (typeof value !== 'undefined') {
      var tempValue = value;

      if (value instanceof Dom) {
        tempValue = value.val() as string;
      } else {
        this.inputEl.value = tempValue as string;
      }


    }

    return this;
  }

  matches (selector: string): Dom | null {
    if (this.htmlEl) {

      if (!this.htmlEl.matches) return null;

      if (this.htmlEl.matches(selector)) {
        return this;
      }
      return this.parent().matches(selector);
    }

    return null;
}  


  get value() {
    return this.inputEl.value;
  }

  get files() {
    return this.inputEl.files ? Array.from(this.inputEl.files) : [];
  }

  show(displayType = "block") {
    this.htmlEl.style.display = displayType != "none" ? displayType : "block"

    return this; 
  }

  hide() {
    this.htmlEl.style.display = 'none';

    return this; 
  }

  isHide () {
    return this.htmlEl.style.display  === "none"
  }

  isShow () {
    return !this.isHide();
  }

  /**
   * @param {any} isForce
   */
  toggle(isForce: any) {
    var currentHide = this.isHide();

    if (arguments.length == 1) {
      if (isForce) {
        return this.show();
      } else {
        return this.hide();
      }
    } else {
      if (currentHide) {
        return this.show();
      } else {
        return this.hide();
      }
    }
  }

  scrollIntoView () {
    this.htmlEl.scrollIntoView()
  }

  /**
   * @param {any} dt
   */
  addScrollLeft (dt: any) {
    this.htmlEl.scrollLeft += dt; 
    return this; 
  }

  /**
   * @param {any} dt
   */
  addScrollTop (dt: any) {
    this.htmlEl.scrollTop += dt; 
    return this; 
  }  

  /**
   * @param {any} scrollTop
   */
  setScrollTop(scrollTop: any) {
    this.htmlEl.scrollTop = scrollTop;
    return this;
  }

  /**
   * @param {any} scrollLeft
   */
  setScrollLeft(scrollLeft: any) {
    this.htmlEl.scrollLeft = scrollLeft;
    return this;
  }

  scrollTop() {
    if (this.htmlEl === document.body) {
      return Dom.getScrollTop();
    }

    return this.htmlEl.scrollTop;
  }

  scrollLeft() {
    if (this.htmlEl === document.body) {
      return Dom.getScrollLeft();
    }

    return this.htmlEl.scrollLeft;
  }

  scrollHeight() {
    return this.htmlEl.scrollHeight;
  }

  scrollWidth() {
    return this.htmlEl.scrollWidth;
  }  

  /**
   * @param {any} eventName
   * @param {any} callback
   * @param {any} opt1
   * @param {any} opt2
   */
  on(eventName: keyof HTMLElementEventMap, callback: (...arg: any[]) => any, opt1: any) {
    this.htmlEl.addEventListener(eventName, callback, opt1);

    return this;
  }

  off(eventName: keyof HTMLElementEventMap, callback: (...arg: any[]) => any) {
    this.htmlEl.removeEventListener(eventName, callback);

    return this;
  }

  getElement() {
    return this.htmlEl;
  }

  /**
   * @param {any} tag
   */
  createChild(tag: any, className = '', attrs = {}, css = {}) {
    let $element = Dom.create(tag, className, attrs);
    $element.css(css);

    this.append($element);

    return $element;
  }

  get firstChild() {
    return Dom.create(this.htmlEl.firstElementChild as HTMLElement);
  }

  children() {
    var element = this.htmlEl.firstElementChild;

    if (!element) {
      return [];
    }

    var results = [];

    do {
      results.push(Dom.create(element as HTMLElement));
      element = element.nextElementSibling;
    } while (element);

    return results;
  }

  childLength() {
    return this.htmlEl.children.length;
  }

  /**
   * @param {{ el: any; }} newElement
   */
  replace(newElement: { el: any; }) {

    if (this.htmlEl.parentNode) {
      this.htmlEl.parentNode.replaceChild(newElement.el || newElement, this.htmlEl);
    }

    return this;
  }

  /**
   * @param {{ el: any; }} oldElement
   * @param {{ el: any; }} newElement
   */
  replaceChild(oldElement: { el: any; }, newElement: { el: any; }) {
    this.htmlEl.replaceChild(newElement.el || newElement, oldElement.el || oldElement);

    return this;
  }  

  checked(isChecked = false) {
    if (arguments.length == 0) {
      return !!this.inputEl.checked;
    }

    this.inputEl.checked = !!isChecked;

    return this;
  }


  click () {
    this.htmlEl.click();

    return this; 
  }  

  focus() {
    this.htmlEl.focus();

    return this;
  }

  select() {
    // contenteditable 의 경우 selection api 를 사용해서 select() 를 수행한다.
    if (this.attr('contenteditable') === 'true') {
      var range = document.createRange();
      range.selectNodeContents(this.htmlEl);
      var sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    } else {
      this.inputEl.select();
    }

    return this;
  }

  blur() {
    this.htmlEl.blur();

    return this;
  }
}
