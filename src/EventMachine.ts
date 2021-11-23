import {
  CHECK_SAPARATOR,
  CHECK_LOAD_PATTERN,
  LOAD_SAPARATOR,
  DOMDIFF,
  getRef,
  MAGIC_METHOD,
} from "./Event";

import {
  isFunction,
  html,
  keyEach,
  collectProps,
  isString
} from "./functions/func";

import {DomEventHandler} from "./handler/DomEventHandler";
import {BindHandler} from "./handler/BindHandler";
import { retriveElement } from "./functions/registElement";
import { uuid, uuidShort } from "./functions/uuid";
import { Dom } from "./functions/Dom";
import { IBaseHandler, IDom, IEventMachine, IKeyValue } from "./types";


const REFERENCE_PROPERTY = "ref";
const TEMP_DIV = Dom.create("div");
const QUERY_PROPERTY = `[${REFERENCE_PROPERTY}]`;
const REF_CLASS = 'refclass';
const REF_CLASS_PROPERTY = `[${REF_CLASS}]`
const VARIABLE_SAPARATOR = "__ref__variable:";


export class EventMachine implements IEventMachine {
  /**
   * local state
   */
  state: any;
  prevState: any;

  children: any; 
  // _bindings: never[];
  id: string;
  __tempVariables: Map<string, any>;
  handlers: (BindHandler | DomEventHandler)[];
  _loadMethods: any;
  __cachedMethodList: any;
  constructor(opt: Object | IEventMachine, props: IKeyValue) {
    this.state = {};
    this.prevState = {};
    this.refs = {};
    this.children = {};
    // this._bindings = [];
    this.id = uuid();    
    this.__tempVariables = new Map();
    this.handlers = this.initializeHandler()

    this.initializeProperty(opt, props);

    this.initComponents();
  }
  private _$store: any;
  public get $store(): any {
    return this._$store;
  }
  public set $store(value: any) {
    this._$store = value;
  }
  el: any;
  $el: any;
  $root: any;
  refs: any;
  opt!: IKeyValue;
  parent!: IEventMachine;
  props!: IKeyValue;
  source!: string;
  sourceName!: string;
  childComponents!: IKeyValue;



  /**
   * UIElement instance 에 필요한 기본 속성 설정 
   */
  initializeProperty (opt: any, props = {}) {

    this.opt = opt || {};
    this.parent = this.opt as IEventMachine;
    this.props = props;
    this.source = uuid();
    this.sourceName = this.constructor.name;  



  }

  initComponents() {
    this.childComponents = this.components() 
  }

  initializeHandler () {
    return [
      new BindHandler(this as any),
      new DomEventHandler(this as any)
    ]
  }

  /**
   * state 를 초기화 한것을 리턴한다. 
   * 
   * @protected
   * @returns {Object} 
   */
  initState() {
    return {};
  }

  /**
   * state 를 변경한다. 
   * 
   * @param {Object} state  새로운 state 
   * @param {Boolean} isLoad  다시 로드 할 것인지 체크 , true 면 state 변경후 다시 로드 
   */
  setState(state = {}, isLoad = true) {
    this.prevState = this.state;
    this.state = Object.assign({}, this.state, state );
    if (isLoad) {
      this.load();
    }
  }

  /**
   * state 에 있는 key 필드의 값을 토글한다. 
   * Boolean 형태의 값만 동작한다. 
   * 
   * @param {string} key 
   * @param {Boolean} isLoad 
   */
  toggleState(key: string | number, isLoad = true) {
    this.setState({
      [key]: !(this.state[key])
    }, isLoad)
  }

  /**
   * props 를 넘길 때 해당 참조를 그대로 넘기기 위한 함수 
   * 
   * @param {any} value
   * @returns {string} 참조 id 생성 
   */ 
  variable(value: any) {
    const id = `${VARIABLE_SAPARATOR}${uuidShort()}`;

    this.__tempVariables.set(id, value);

    return id;
  }

  /**
   * 참조 id 를 가지고 있는 variable 을 복구한다. 
   */ 
  recoverVariable(id: string) {
    if (isString(id) === false) {
      return id;
    }

    let value = id;

    if (this.__tempVariables.has(id)) {
      value = this.__tempVariables.get(id);

      this.__tempVariables.delete(id);
    }

    return value;
  }

  /**
   * 객체를 다시 그릴 때 사용한다. 
   * 
   * @param {*} props 
   * @protected
   */
  _reload(props: any, $container?: IDom) {

    if ($container) {
      this.render($container);
    }

    this.props = props;
    this.state = {}; 
    this.setState(this.initState(), false);
    this.refresh();
  }

  /**
   * template 을 렌더링 한다. 
   * 
   * @param {Dom|undefined} $container  컴포넌트가 그려질 대상 
   */
  render($container: IDom) {
    this.$el = this.parseTemplate(
      html`
        ${this.template()}
      `
    );
    this.refs.$el = this.$el;

    if ($container) {
      $container.append(this.$el);
    }

    // LOAD 로 정의된 것들을 수행한다. 
    this.load();

    // render 이후에 실행될 콜백을 정의한다. 
    this.afterRender();
  }

  initialize() {
    this.state = this.initState();
  }

  /**
   * render 이후에 실행될 함수 
   * dom 이 실제로 생성된 이후에 수행할 작업들을 정의한다. 
   * 
   * @protected
   */
  afterRender() {}

  /**
   * 하위에 연결될 객체들을 정의한다 
   * 
   * @protected
   * @returns {Object}
   */
  components() {
    return {};
  }

  /**
   * ref 이름을 가진 Component 를 가지고 온다. 
   * 
   * @param  {any[]} args 
   * @returns {EventMachine}
   */
  getRef(...args: string[]) {
    const key = args.join('')
    return this.refs[key];
  }

  /**
   * template() 함수의 결과물을 파싱해서 dom element 를 생성한다. 
   * 
   * @param {string} html 
   * @param {Boolean} [isLoad=false] 
   */
  parseTemplate(html: string, isLoad: boolean | undefined = false) {
    //FIXME: html string, element 형태 모두 array 로 받을 수 있도록 해보자. 
    if (Array.isArray(html)) {
      html = html.join('');
    }

    html = html.trim();
    const list = (TEMP_DIV.html(html) as IDom).children();
    /////////////////////////////////

    for(var i = 0, len = list.length; i < len; i++) {
      const $el = list[i];

      var ref = $el.attr(REFERENCE_PROPERTY)
      if (ref) {
        this.refs[ref] = $el;
      }

      var refs = $el.$$(QUERY_PROPERTY);
      var temp = {} 

      for(var refsIndex = 0, refsLen = refs.length; refsIndex < refsLen; refsIndex++) {
        const $dom = refs[refsIndex];

        const name = $dom.attr(REFERENCE_PROPERTY);
        if (temp[name]) {
          console.warn(`${ref} is duplicated. - ${this.sourceName}`, this)
        } else {
          temp[name] = true; 
        }

        this.refs[name] = $dom;             
      }
    }

    if (!isLoad && list.length) {
      return list[0];
    }

    return Dom.create(TEMP_DIV.createChildrenFragment());
  }

  parseProperty ($dom: IDom) {
    let props = {};

    // parse properties 
    for(var t of $dom.htmlEl.attributes) {
      props[t.nodeName] = this.recoverVariable(t.nodeValue);
    }

    if (props['props']) {
      props = {
        ...props,
        ...getRef(props['props'])
      }
    }

    $dom.$$('property').forEach(($p: { attrs: (arg0: string, arg1: string, arg2: string) => [any, any, any]; text: () => any; }) => {
      const [name, value, valueType] = $p.attrs('name', 'value', 'valueType')

      let realValue = value || $p.text();

      if (valueType === 'json') {          
        realValue = JSON.parse(realValue);
      }
    
      props[name] = realValue; 
    })

    return props;
  }

  getEventMachineComponent (refClassName: string) {
    var EventMachineComponent = retriveElement(refClassName) || this.childComponents[refClassName];

    return EventMachineComponent;
  }

  parseComponent() {
    const $el = this.$el;

    if (!$el) return;

    let targets = $el.$$(REF_CLASS_PROPERTY);

    targets.forEach(($dom: IDom) => {

      const EventMachineComponent = this.getEventMachineComponent($dom.attr(REF_CLASS))

      if (EventMachineComponent) {
        let props = this.parseProperty($dom);
  
        // create component 
        let refName = $dom.attr(REFERENCE_PROPERTY);
        var instance = null; 
  
        // 동일한 refName 의 EventMachine 이 존재하면  해당 컴포넌트는 다시 그려진다. 
        // 루트 element 는 변경되지 않는다. 
        if (this.children[refName]) {
          instance = this.children[refName] 
          instance._reload(props);
        } else {
          // 기존의 refName 이 존재하지 않으면 Component 를 생성해서 element 를 교체한다. 
          instance = new EventMachineComponent(this, props);
  
          this.children[refName || instance.id] = instance;
  
          instance.render();
        }
        

        if (instance.renderTarget) {
          instance.$el?.appendTo(instance.renderTarget);
          $dom.remove();
        } else {
          $dom.replace(instance.$el);     
        }

      } else {
        $dom.remove();
      }
 
  
    })

    keyEach(this.children, (key, obj) => {
      if (obj && obj.clean()) {
        delete this.children[key]
      }
    })
  }

  clean () {
    if (this.$el && !this.$el.hasParent()) {

      keyEach(this.children, (key, child) => {
        child.clean();
      })

      this.destroy();  

      this.$el = null;
      return true; 
    }
  }

  /**
   * refresh 는 load 함수들을 실행한다. 
   */
  refresh() {
    this.load()
  }

  _afterLoad () {

    this.runHandlers('initialize');

    this.bindData();

    this.parseComponent();
  }

  async load(...args: string[]) {
    if (!this._loadMethods) {
      this._loadMethods = this.filterProps(CHECK_LOAD_PATTERN);
    }

    // loop 가 비동기라 await 로 대기를 시켜줘야 나머지 html 업데이트에 대한 순서를 맞출 수 있다. 
    const localLoadMethods = this._loadMethods.filter((callbackName: string) => {
        const elName = callbackName.split(LOAD_SAPARATOR)[1]
                                  .split(CHECK_SAPARATOR)
                                  .map((it: string) => it.trim())[0];
        if (!args.length) return true; 
        return args.indexOf(elName) > -1
      })



    await localLoadMethods.forEach(async (callbackName: string) => {
      let methodName = callbackName.split(LOAD_SAPARATOR)[1];
      var [elName, ...checker] = methodName.split(CHECK_SAPARATOR).map((it: string) => it.trim())

      checker = checker.map((it: string) => it.trim())
      
      const isDomDiff = Boolean(checker.filter((it: string) => DOMDIFF.includes(it)).length);

      if (this.refs[elName]) {        
        var newTemplate = await this[callbackName].call(this, ...args);

        if (Array.isArray(newTemplate)) {
          newTemplate = newTemplate.join('');
        }

        // create fragment 
        const fragment = this.parseTemplate(html`${newTemplate}`, true);
        if (isDomDiff) {
          this.refs[elName].htmlDiff(fragment);
        } else {
          this.refs[elName].html(fragment);
        }

      }
    });

    this._afterLoad();

  }

  runHandlers(func = 'run', ...args: any[]) {
    this.handlers.forEach((h: IBaseHandler) => h[func](...args));
  }

  bindData (...args: string[]) {
    this.runHandlers('load', ...args);
  }

  /**
   * 템플릿 지정 
   * 
   * 템플릿을 null 로 지정하면 자동으로 DocumentFragment 을 생성한다.
   * 화면에는 보이지 않지만 document, window 처럼 다른 영역의 이벤트로 정의하거나 subscribe 형태로 가져올 수 있다.
   * 
   */ 
  template(): string|string[]|DocumentFragment|null {
    return null;
  }

  eachChildren(callback: Function) {
    if (!isFunction(callback)) return;

    keyEach(this.children, (_, Component) => {
      callback(Component);
    });
  }

  rerender () {
    var $parent = this.$el.parent();
    this.destroy();
    this.render($parent);  
  }

  /**
   * 자원을 해제한다.
   * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다.
   * 
   */
  destroy() {
    this.eachChildren((childComponent: IEventMachine) => {
      childComponent.destroy();
    });

    this.runHandlers('destroy');
    if (this.$el) {
      this.$el.remove();
    }

    this.$el = null; 
    this.refs = {} 
    this.children = {} 
  }

  /**
   * property 수집하기
   * 상위 클래스의 모든 property 를 수집해서 리턴한다.
   * 
   * @returns {string[]} 나의 상위 모든 메소드를 수집해서 리턴한다. 
   */
  collectProps() {

    if (!this.__cachedMethodList){
      this.__cachedMethodList = collectProps(this, (name: string | string[]) => {
        return name.indexOf(MAGIC_METHOD) === 0; 
      });
    }

    return this.__cachedMethodList;
  }

  filterProps(pattern: RegExp) {
    return this.collectProps().filter((key: string) => {
      return key.match(pattern);
    });
  }

  /* magic check method  */

  self(e: any) {
    return e && e.$dt && e.$dt.is(e.target);
  }
  isAltKey(e: any) {
    return e.altKey;
  }
  isCtrlKey(e: any) {
    return e.ctrlKey;
  }
  isShiftKey(e: any) {
    return e.shiftKey;
  }
  isMetaKey(e: any) {
    return e.metaKey || e.key == 'Meta' || e.code.indexOf('Meta') > -1 ;
  }
  isMouseLeftButton(e: any) {
    return e.buttons === 1;     // 1 is left button 
  }

  isMouseRightButton(e: any) {
    return e.buttons === 2;     // 2 is right button 
  }  

  hasMouse(e: any) { 
    return e.pointerType === 'mouse';
  }

  hasTouch(e: any) {
    return e.pointerType === 'touch';
  }

  hasPen(e: any) {
    return e.pointerType === 'pen';
  }  

  /** before check method */

  /* after check method */

  preventDefault(e: any) {
    e.preventDefault();
    return true;
  }

  stopPropagation(e: any) {
    e.stopPropagation();
    return true;
  }
}
