import {
  isFunction,
  keyEach,
  collectProps,
  isObject
} from "./functions/func";

import {DomEventHandler} from "./handler/DomEventHandler";
import {BindHandler} from "./handler/BindHandler";
import { retriveElement, spreadVariable, getVariable, hasVariable } from "./functions/registElement";
import { uuid } from "./functions/uuid";
import { Dom } from "./functions/Dom";
import { IBaseHandler, IDom, IEventMachine, IKeyValue } from "./types";
import CallbackHandler from './handler/CallbackHandler';
import MagicMethod, { MagicMethodResult } from "./functions/MagicMethod";


const REFERENCE_PROPERTY = "ref";
const TEMP_DIV = Dom.create("div");
const QUERY_PROPERTY = `[${REFERENCE_PROPERTY}]`;
const REF_CLASS = 'refclass';
const REF_CLASS_PROPERTY = `[${REF_CLASS}]`


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
  handlers: (BindHandler | DomEventHandler | CallbackHandler)[];
  _loadMethods: MagicMethodResult[] | undefined;
  __cachedMethodList: any;
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
  private _localTimestamp: number;

  constructor(opt: Object | IEventMachine, props: IKeyValue) {
    this.state = {};
    this.prevState = {};
    this.refs = {};
    this.children = {};
    this._localTimestamp = 0;    
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


  get _timestamp() {
    return this._localTimestamp++;
  }

  /**
   * for svelte variable 
   */
  get target() {
    return this.$el?.el;
  }

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
      new DomEventHandler(this as any),
      new CallbackHandler(this as any),
    ]
  }

  /**
   * state 를 초기화 한것을 리턴한다. 
   * 
   * @protected
   * @returns {Object} 
   */
  initState(): object {
    return {};
  }

  /**
   * state 를 변경한다. 
   * 
   * @param {Object} state  새로운 state 
   * @param {Boolean} isLoad  다시 로드 할 것인지 체크 , true 면 state 변경후 다시 로드 
   */
  setState(state: object = {}, isLoad: boolean = true) {
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
  toggleState(key: string | number, isLoad: boolean = true) {
    this.setState({
      [key]: !(this.state[key])
    }, isLoad)
  }

  /**
   * object 값을 그대로 key, value 형태로 넘기기 위한 함수
   * 
   * @param {IKeyValue} obj
   * @returns {string} `key=value` 형태의 문자열 리스트 
   */ 
   apply(obj: IKeyValue): string {
    return spreadVariable(obj);
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
    this.$el = this.parseTemplate(`${this.template()}`);
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
   * @returns {IKeyValue}
   */
  components(): IKeyValue {
    return {};
  }

  /**
   * ref 이름을 가진 Component 를 가지고 온다. 
   * 
   * @param  {any[]} args 
   * @returns {EventMachine}
   */
  getRef(...args: string[]): EventMachine {
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


  /**
   * $dom 에 있는 props, children 정보만 가지고 온다. 
   * 
   * 이것을 가지고 오는 이유는  중첩된 컴포넌트 내에서 하위 컴포넌트를 찾기 위해서이다.
   * 
   * ps.
   * 
   * 조회만 하기 때문에 getVariable()로 값만 조회한다. 
   * 
   * @param {Dom} $dom 
   * @returns 
   */
   parsePropertyInfo ($dom: IDom) {
    let props: IKeyValue = {};

    // parse properties 
    for(var t of $dom.htmlEl.attributes) {

      // 속성값이 없고, 속성 이름이 참조 변수 일 때는  그대로 보여준다. 
      if (hasVariable(t.nodeName)) {
        const recoveredValue = getVariable(t.nodeName);
        if (isObject(recoveredValue)) {
          props = Object.assign(props, recoveredValue)     
        } else {
          props[t.nodeName] = getVariable(t.nodeValue);                    
        }

      } else {
        props[t.nodeName] = getVariable(t.nodeValue);          
      }
    }

    // 하위 html 문자열을 props.content 로 저장한다. 
    const content = $dom.html() as string;
    if (content) {
      props.content = content;
      props.contentChildren = this.parseContent(props.content)
    }

    return props;
  }

  parseSourceName(obj: IEventMachine): string[] {

    if (obj.parent) {
      return [obj.sourceName, ...this.parseSourceName(obj.parent)]
    }

    return [obj.sourceName]
  }  


  getEventMachineComponent (refClassName: string) {
    var EventMachineComponent = retriveElement(refClassName) || this.childComponents[refClassName];

    return EventMachineComponent;
  }


  createInstanceForComponent (EventMachineComponent: any, targetElement: Element, props: IKeyValue = {}) {
    // external component 
    if (EventMachineComponent.__proto__.name === 'ProxyComponent') {
      return new EventMachineComponent({target: targetElement, props});
    }

    // return sapa component 
    return new EventMachineComponent(this, props);
  }  

  renderComponent({ $dom, refName, component, props }: IEventMachine) {
    var instance = null; 

    // 동일한 refName 의 EventMachine 이 존재하면  해당 컴포넌트는 다시 그려진다. 
    // 루트 element 는 변경되지 않는다. 
    if (this.children[refName]) {

      // FIXME: svelte 컴포넌트를 어떻게 재로드 할지 고민해야함 
      instance = this.children[refName] 
      instance.__timestamp = this._localTimestamp;
      instance._reload(props);
    } else {
      instance = this.createInstanceForComponent(component, $dom.$parent.el, props);
      instance.__timestamp = this._localTimestamp;

      this.children[refName || instance.id] = instance;

      if (isFunction(instance.render)) {
        instance.render();

      } else {
        // NOOP
        // console.log(instance);
      }

    }
    

    if (instance.renderTarget) {
      instance.$el?.appendTo(instance.renderTarget);
      $dom.remove();
    } else if (instance.$el) {
      $dom.replace(instance.$el);     
    } else {
      // EventMachine 의 renderTarget 또는 $el 이 없으면
      // renderTarget 과 유사하지만 appendTo 를 하지 않는다.
      $dom.remove();
    }
  }

  /**
   * 특정 html 의 자식 컴포넌트(EventMachine)의 정보를 가지고 온다. 
   * 
   * @param {string} html 
   * @param {string[]} filteredRefClass 
   * @returns {object[]}  - { refName, EventMachineComponent, props, $dom, refClass }
   */
  parseContent(html:string, filteredRefClass: string[] = []) {
    return (Dom.create('div').html(html) as IDom).children().map(($dom: any) => {
      return this._getComponentInfo($dom)
    }).filter((it: { refClass: any; }) => filteredRefClass.length === 0 ? true : filteredRefClass.includes(it.refClass))
  }

  /**
   * component 정보 얻어오기 
   * 
   * @param {Dom} $dom 
   * @returns {Object}
   */
  _getComponentInfo ($dom: IDom) {

    const refClass = $dom.attr(REF_CLASS);
    const EventMachineComponent = this.getEventMachineComponent(refClass)

    if (EventMachineComponent) {
      let props = this.parsePropertyInfo($dom);

      // get component class name
      let refName = $dom.attr(REFERENCE_PROPERTY);

      return { 
        $dom,
        refClass,
        props,
        // variable 로 props 를 지정했을 수도 있기 때문에 props.ref 도 같이 사용한다. 
        refName: refName || props.ref, 
        component: EventMachineComponent
      }
    } else {
      return {
        notUsed: true, 
        $dom,
      }
    }
  }

  /**
   * element 를 기준으로 내부 component 리스트를 생성한다. 
   * 
   * @return {object[]}
   */ 
   getComponentInfoList($el: IDom) {

    if (!$el) return [];

    const children: ({
      $dom: any; 
      refClass: any; 
      props: IKeyValue;
      // variable 로 props 를 지정했을 수도 있기 때문에 props.ref 도 같이 사용한다. 
      refName: any; 
      component: any; 
      notUsed?: undefined;
    } | {
      notUsed: boolean; $dom: any; refClass?: undefined; props?: undefined;
      // variable 로 props 를 지정했을 수도 있기 때문에 props.ref 도 같이 사용한다. 
      refName?: undefined; component?: undefined;
    })[] = []

    // 하위에 refclass 를 가진 element 중에 마지막 지점인 컴포넌트만 조회한다. 
    // 부모에 refclass 를 가지고 있는 경우는 그 다음 컴포넌트로 넘겨서 생성한다. 
    // 이렇게 하지 않으면 최상위 부모에서 모든 하위 refclass 를 컴포넌트로 생성해버리는 문제가 생긴다. 
    let targets = $el.$$(REF_CLASS_PROPERTY).filter((it: IDom) => {
      return it.path().filter((a: IDom) =>{
        return a.attr(REF_CLASS)
      }).length === 1
    })

    targets.forEach(($dom: any) => {
      children.push(this._getComponentInfo($dom));
    })

    return children; 
  }

  parseComponent() {
    const $el = this.$el;

    const componentList = this.getComponentInfoList($el);

    componentList.forEach(comp => {
      if (comp.notUsed) {
        comp.$dom.remove();
      } else {
        this.renderComponent(comp as unknown as IEventMachine);
      }  
    })

    keyEach(this.children, (key, child) => {
      if (child.__timestamp !== this._localTimestamp) {
        child.clean();
      }
    })
  }

  clean () {
    if (this.$el && !this.$el.hasParent()) {

      keyEach(this.children, (key, child) => {
        if (isFunction(child?.clean)) {
          child.clean();
        }
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
      this._loadMethods = this.filterProps('load');
    }

    const filtedLoadMethodList = this._loadMethods.filter(it => args.length === 0 ? true : it.args[0] === args[0])

    // loop 가 비동기라 await 로 대기를 시켜줘야 나머지 html 업데이트에 대한 순서를 맞출 수 있다. 
    await filtedLoadMethodList.forEach(async (it: MagicMethodResult) => {

      const [elName, ...args] = it.args;

      const isDomDiff = !!it.keys['domdiff'];
      const refTarget = this.refs[elName];

      if (refTarget) {        
        var newTemplate = await this[it.originalMethod].call(this, ...args);

        if (Array.isArray(newTemplate)) {
          newTemplate = newTemplate.join('');
        }

        // create fragment 
        const fragment = this.parseTemplate(newTemplate, true);
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
  collectProps(): MagicMethodResult[] {

    if (!this.__cachedMethodList){
      this.__cachedMethodList = collectProps(this, (name: string) => MagicMethod.check(name)).map(it => {
        return MagicMethod.parse(it);
      });
    }

    return this.__cachedMethodList;
  }

  filterProps(methodKey: string): MagicMethodResult[] {
    return this.collectProps().filter(it => {
      return it.method === methodKey;
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
