var mr=Object.defineProperty,gr=Object.defineProperties;var Tr=Object.getOwnPropertyDescriptors;var $t=Object.getOwnPropertySymbols;var pr=Object.prototype.hasOwnProperty,Ar=Object.prototype.propertyIsEnumerable;var nt=(i,E,p)=>E in i?mr(i,E,{enumerable:!0,configurable:!0,writable:!0,value:p}):i[E]=p,Ht=(i,E)=>{for(var p in E||(E={}))pr.call(E,p)&&nt(i,p,E[p]);if($t)for(var p of $t(E))Ar.call(E,p)&&nt(i,p,E[p]);return i},wt=(i,E)=>gr(i,Tr(E));var u=(i,E,p)=>(nt(i,typeof E!="symbol"?E+"":E,p),p);(function(i,E){typeof exports=="object"&&typeof module!="undefined"?E(exports):typeof define=="function"&&define.amd?define(["exports"],E):(i=typeof globalThis!="undefined"?globalThis:i||self,E(i.sapa={}))})(this,function(i){"use strict";const E="@magic:",p=(r,t=A)=>` ${t} ${r}`,lt=/domevent (.*)/gi,at=/callback (.*)/gi,ot=/load (.*)/gi,ht=/bind (.*)/gi,ct=/subscribe (.*)/gi,Kt="ME@",Vt="|",ut=(...r)=>r.join(Vt),V=(...r)=>Kt+ut(...r),Gt=V,Wt=V,U=":",A="|",G=`${E}domevent `,W=`${E}callback `,k=`${E}load `,z=`${E}bind `,Y=`${E}subscribe `,F=" ",zt={},h=(...r)=>{var t=r.join(U);return(...e)=>G+[t,...e].join(F)},$=(...r)=>Y+r.join(A),Yt=(...r)=>W+r.join(A),c=(r,t=A)=>p(r,t),X=(r,t=A)=>p(`after(${r})`,t),Xt=(r,t=A)=>p(`before(${r})`,t),qt=c,jt=c,Qt=c("ArrowUp"),Zt=c("ArrowDown"),Jt=c("ArrowLeft"),xt=c("ArrowRight"),te=c("Enter"),ee=c("Space"),se=c("Escape"),re=c("Backspace"),ie=c("Delete"),ne=c("Equal"),le=c("Minus"),ae=c("BracketRight"),oe=c("BracketLeft"),he=c("isAltKey"),ce=c("isShiftKey"),ue=c("isMetaKey"),fe=c("isCtrlKey"),de=c("hasMouse"),Ee=c("hasTouch"),me=c("hasPen"),ge=c("self"),ft=c("isMouseLeftButton"),Te=c("isMouseRightButton"),pe=c("fit"),Ae=c("passive"),dt=c("domdiff"),Et=(r=100)=>c(`debounce(${r})`),Ce=(r=300)=>c(`delay(${r})`),Re=Et(1e3),Ne=(r=100)=>c(`throttle(${r})`),mt=c("allTrigger()"),gt=c("selfTrigger()"),be=c("frame()"),Se=r=>c(`params(${x(r)})`),Oe=c("capture()"),ve=X("preventDefault"),Me=X("stopPropagation"),_e=$,ye=(...r)=>$(...r,mt),Le=(...r)=>$(...r,gt),Pe=(r,...t)=>$(`config:${r}`,...t),Tt=Yt,Ie=Tt("requestAnimationFrame"),b=h,De=h("click"),Be=h("dblclick"),Ue=h("mousedown"),ke=h("mouseup"),Fe=h("mousemove"),$e=h("mouseover"),He=h("mouseout"),we=h("mouseenter"),Ke=h("mouseleave"),Ve=h("touchstart"),Ge=h("touchmove"),We=h("touchend"),ze=h("keydown"),Ye=h("keyup"),Xe=h("keypress"),qe=h("drag"),je=h("dragstart"),Qe=h("drop"),Ze=h("dragover"),Je=h("dragenter"),xe=h("dragleave"),ts=h("dragexit"),es=h("dragout"),ss=h("dragend"),rs=h("contextmenu"),is=h("change"),ns=h("input"),ls=h("focus"),as=h("focusin"),os=h("focusout"),hs=h("blur"),cs=h("paste"),us=h("resize"),fs=h("scroll"),ds=h("submit"),Es=(...r)=>b("pointerdown")(...r)+ft,ms=b("pointerover"),gs=b("pointerenter"),Ts=b("pointerout"),ps=b("pointermove"),As=b("pointerup"),Cs=b("change","input"),Rs=b("wheel","mousewheel","DOMMouseScroll"),Ns=h("animationstart"),bs=h("animationend"),Ss=h("animationiteration"),Os=h("transitionstart"),vs=h("transitionend"),Ms=h("transitionrun"),_s=h("transitioncancel"),ys=b("doubletab"),Ls=(r="$el")=>k+r,Ps=r=>zt[r]||"",pt=r=>function(){return this.prevState[r]!=this.state[r]},At=()=>!0,Is=(r="$el")=>z+r;function Ds(r){let t=r.deltaX,e=r.deltaY;return t===0&&r.shiftKey&&([e,t]=[t,e]),r.deltaMode===WheelEvent.DOM_DELTA_LINE?e*=8:r.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(e*=24),[Ct(t,24),Ct(e,24),0]}function Ct(r,t){return Math.sign(r)*Math.min(t,Math.abs(r))}var q={addDomEvent(r,t,e,s=!1){r&&r.addEventListener(t,e,s)},removeDomEvent(r,t,e){r&&r.removeEventListener(t,e)},pos(r){return r.touches&&r.touches[0]?r.touches[0]:r},posXY(r){var t=this.pos(r);return{x:t.pageX,y:t.pageY}}};const Bs=()=>!0;function Us(r,t=Bs){let e=r,s=[];do{if(e instanceof Object===!1)break;const l=Object.getOwnPropertyNames(e).filter(a=>r&&S(r[a])&&t(a));s.push.apply(s,l)}while(e=Object.getPrototypeOf(e));return s}function j(r,t=0){if(t===0)return r;var e=void 0;return function(...s){e&&clearTimeout(e),e=setTimeout(function(){r(...s)},t||300)}}function ks(r,t){return(...e)=>{requestAnimationFrame(()=>{r.apply(t,e)})}}function Q(r,t){var e=void 0;return function(...s){e||(e=setTimeout(function(){r(...s),e=null},t||300))}}function Fs(r,t,e){return(...s)=>{e.every(l=>t[l.target].apply(t,s))&&r.apply(t,s)}}function Z(r,t){Object.keys(r).forEach((e,s)=>{t(e,r[e],s)})}function $s(r){return typeof r=="undefined"||r===null}function P(r){return $s(r)===!1}function Rt(r){return typeof r=="string"}function Nt(r){return typeof r=="object"&&!Array.isArray(r)&&!bt(r)&&!Rt(r)&&r!==null}function S(r){return typeof r=="function"}function bt(r){return typeof r=="number"}const R=(r,t)=>{const e=r.filter(n=>n.indexOf(`${t}(`)>-1),s=e.map(n=>{const[l,a]=n.split(`${t}(`)[1].split(")")[0].trim().split(" ");return{target:l,param:a}});return[e,s]},St=/[xy]/g;function Ot(){var r=new Date().getTime(),t="xxx12-xx-34xx".replace(St,function(e){var s=(r+Math.random()*16)%16|0;return r=Math.floor(r/16),(e=="x"?s:s&3|8).toString(16)});return t}function vt(){var r=new Date().getTime(),t="idxxxxxxx".replace(St,function(e){var s=(r+Math.random()*16)%16|0;return r=Math.floor(r/16),(e=="x"?s:s&3|8).toString(16)});return t}const J=new Map,Mt={},y=new Map,I=new Map,_t="v:";function x(r,t=""){const e=`${_t}${vt()}`;return y.set(e,r),t&&(I.has(t)||I.set(t,new Set),I.get(t).add(e)),e}function Hs(r){I.has(r)&&(I.get(r).forEach(t=>{y.delete(t)}),I.delete(r))}function ws(r,t=!0){if(Rt(r)===!1)return r;let e=r;return y.has(r)&&(e=y.get(r),t&&y.delete(r)),e}function B(r){return y.has(r)?y.get(r):r}function yt(r){return y.has(r)}function Lt(r){return Object.entries(r).map(([t,e])=>`${t}=${x(e)}`).join(" ")}function Ks(r={}){Object.keys(r).forEach(t=>{J.has(t)||J.set(t,r[t])})}function Vs(r,t){Mt[r]=t}function Gs(r){return Mt[r]}function Pt(r){return J.get(r)}class tt{constructor(t){u(this,"cachedCallback");u(this,"callbacks");u(this,"editor");u(this,"source");u(this,"promiseProxy");this.cachedCallback={},this.callbacks={},this.editor=t,this.promiseProxy=new Proxy(this,{get:(e,s)=>this.makePromiseEvent(s)})}getCallbacks(t){return this.callbacks[t]||(this.callbacks[t]=[]),this.callbacks[t]}setCallbacks(t,e=[]){this.callbacks[t]=e}on(t,e,s,n=0,l=0,a=!1,o=!1,f=[],m=!1){var g=e;return n>0?g=j(e,n):l>0&&(g=Q(e,l)),f.length&&(g=Fs(g,s,f)),m&&(g=ks(g,s)),this.getCallbacks(t).push({event:t,callback:g,context:s,originalCallback:e,enableAllTrigger:a,enableSelfTrigger:o}),this.debug("add message event",t,s==null?void 0:s.sourceName),()=>{this.off(t,e)}}debug(t,e,s){}off(t,e){this.debug("off message event",t),arguments.length==1?this.setCallbacks(t):arguments.length==2&&this.setCallbacks(t,this.getCallbacks(t).filter(s=>s.originalCallback!==e))}offAll(t){Object.keys(this.callbacks).forEach(e=>{this.setCallbacks(e,this.getCallbacks(e).filter(s=>s.context!==t))}),this.debug("off all message",t.sourceName)}getCachedCallbacks(t){return this.getCallbacks(t)}get promise(){return this.promiseProxy}get p(){return this.promise}makePromiseEvent(t){var e=this.getCachedCallbacks(t);const s=this.source;return(...n)=>Promise.all(e.filter(l=>!l.enableSelfTrigger).filter(l=>l.enableAllTrigger||l.originalCallback.source!==s).map(l=>new Promise((a,o)=>{a(l.callback.apply(l.context,n))})))}sendMessage(t,e,...s){this.sendMessageList(t,[[e,...s]])}sendMessageList(t,e=[]){Promise.resolve().then(()=>{e.forEach(([s,...n])=>{var l=this.getCachedCallbacks(s);if(l&&l.length){const a=l.filter(o=>!o.enableSelfTrigger).filter(o=>o.enableAllTrigger||o.originalCallback.source!==t);for(const o of a){const f=o.callback.apply(o.context,n);if(P(f)){if(f===!1)return;if(S(f)){f();return}}}}})})}nextSendMessage(t,e,...s){Promise.resolve().then(()=>{e(...s)})}triggerMessage(t,e,...s){Promise.resolve().then(()=>{var n=this.getCachedCallbacks(e);if(n)for(var l=0,a=n.length;l<a;l++){const o=n[l];o.originalCallback.source===t&&o.callback.apply(o.context,s)}else console.warn(e," is not valid event")})}emit(t,...e){S(t)?t(...e):Array.isArray(t)?this.sendMessageList(this.source,t):this.sendMessage(this.source,t,...e)}nextTick(t){this.nextSendMessage(this.source,t)}trigger(t,...e){S(t)?t(...e):this.triggerMessage(this.source,t,...e)}}const Ws=(r,t,e)=>{e?(r.setAttribute(t,t),r[t]=e):(r.removeAttribute(t),r[t]=e)},zs=(r,t,e)=>{typeof e=="boolean"?Ws(r,t,e):r.setAttribute(t,e)},Ys=(r,t)=>{r.removeAttribute(t),r[t]=!1},Xs=(r,t)=>{r.removeAttribute(t)},qs=(r,t,e)=>{typeof e=="boolean"?Ys(r,t):t&&Xs(r,t)},js=(r,t,e,s)=>{e?(!s||e!==s)&&zs(r,t,e):qs(r,t,s)},Qs=(r,t={},e={})=>{const s=[];s.push.apply(s,Object.keys(t)),s.push.apply(s,Object.keys(e));const n=[...new Set(s)];for(var l=0,a=n.length;l<a;l++){const o=n[l];js(r,o,t[o],e[o])}};function Zs(r,t){return r.nodeType===Node.TEXT_NODE&&r.textContent!==t.textContent||r.nodeName!==t.nodeName}function It(r){return(r==null?void 0:r.nodeType)===8?!0:r.nodeType!==Node.TEXT_NODE&&r.getAttribute("data-domdiff-pass")==="true"}function Js(r){return r.nodeType!==Node.TEXT_NODE&&r.getAttribute("refClass")}function Dt(r){var t={};const e=r.length;for(let s=0;s<e;s++){const n=r[s];t[n.name]=n.value}return t}function Bt(r,t,e,s,n={}){if(!t)r.appendChild(e.cloneNode(!0));else if(!e)r.removeChild(t);else if(!(It(t)||It(e))){if(Zs(e,t)||Js(e))r.replaceChild(e.cloneNode(!0),t);else if(e.nodeType!==Node.TEXT_NODE&&e.nodeType!==Node.COMMENT_NODE&&e.toString()!=="[object HTMLUnknownElement]"){n.checkPassed&&n.checkPassed(t,e)||Qs(t,Dt(e.attributes),Dt(t.attributes));for(var l=H(t),a=H(e),o=Math.max(l.length,a.length),s=0;s<o;s++)Bt(t,l[s],a[s],s)}}}const H=r=>{var t=r.firstChild;if(!t)return[];var e=[];do e.push(t),t=t.nextSibling;while(t);return e};function et(r,t,e={}){e.checkPassed=S(e.checkPassed)?e.checkPassed:void 0,e.removedElements=[],r=r.el||r,t=t.el||t;for(var s=H(r),n=H(t),l=Math.max(s.length,n.length),a=0;a<l;a++)Bt(r,s[a],n[a],a,e)}class d{constructor(t,e="",s={}){u(this,"el");if(typeof t!="string")this.el=t;else{var n=document.createElement(t);e&&(n.className=e);for(var l in s)n.setAttribute(l,s[l]);this.el=n}}static create(t,e="",s={}){return new d(t,e,s)}static createByHTML(t){var e=d.create("div"),s=e.html(t).children();return s.length?d.create(s[0].el):null}static getScrollTop(){return Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop)}static getScrollLeft(){return Math.max(window.pageXOffset,document.documentElement.scrollLeft,document.body.scrollLeft)}static parse(t){var e=new DOMParser;return e.parseFromString(t,"text/html")}static body(){return d.create(document.body)}get htmlEl(){return this.el}get inputEl(){return this.el}get svgEl(){return this.el}setAttr(t){return Object.keys(t).forEach(e=>{this.attr(e,t[e])}),this}setAttrNS(t,e="http://www.w3.org/2000/svg"){return Object.keys(t).forEach(s=>{this.attrNS(s,t[s],e)}),this}setProp(t){return Object.keys(t).forEach(e=>{this.htmlEl[e]!=t[e]&&(this.htmlEl[e]=t[e])}),this}data(t,e){return arguments.length===1?this.attr("data-"+t):arguments.length===2?this.attr("data-"+t,e):this}attr(t,e){var s,n;return arguments.length==1?(n=(s=this.htmlEl).getAttribute)==null?void 0:n.call(s,t):(this.htmlEl.getAttribute(t)!=e&&this.htmlEl.setAttribute(t,`${e}`),this)}attrNS(t,e,s="http://www.w3.org/2000/svg"){return arguments.length==1?this.svgEl.getAttributeNS(s,t):(this.svgEl.getAttributeNS(s,t)!=e&&this.svgEl.setAttributeNS(s,t,e),this)}attrKeyValue(t){return{[`${this.htmlEl.getAttribute(t)}`]:this.val()}}attrs(...t){return t.map(e=>this.htmlEl.getAttribute(e))}styles(...t){return t.map(e=>this.htmlEl.style[e])}removeAttr(t){return this.htmlEl.removeAttribute(t),this}removeStyle(t){return this.htmlEl.style.removeProperty(t),this}is(t){return this.htmlEl===(t.el||t)}isTag(t){return this.htmlEl.tagName.toLowerCase()===t.toLowerCase()}closest(t){for(var e=this,s=!1;!(s=e.hasClass(t));)if(e.el.parentNode)e=d.create(e.el.parentNode);else return null;return s?e:null}path(){if(!this.htmlEl)return[];let t=[this],e=this.parent();if(!e.el)return t;for(;e&&(t.unshift(e),e=e.parent(),!!e.el););return t}get $parent(){return this.parent()}parent(){return d.create(this.htmlEl.parentNode)}hasParent(){return!!this.htmlEl.parentNode}removeClass(...t){return this.htmlEl.classList.remove(...t),this}hasClass(t){return this.htmlEl.classList?this.htmlEl.classList.contains(t):!1}addClass(...t){return this.htmlEl.classList.add(...t),this}onlyOneClass(t){var e=this.parent();e.children().forEach(s=>{s.removeClass(t)}),this.addClass(t)}toggleClass(t,e){return this.htmlEl.classList.toggle(t,e),this}html(t){try{return typeof t=="undefined"?this.htmlEl.innerHTML:(typeof t=="string"?Object.assign(this.el,{innerHTML:t}):this.empty().append(t),this)}catch(e){return console.log(e,t),this}}htmlDiff(t){et(this,t)}updateDiff(t,e="div"){et(this,d.create(e).html(t))}updateSVGDiff(t,e="div"){et(this,d.create(e).html(`<svg>${t}</svg>`).firstChild.firstChild)}find(t){return this.htmlEl.querySelector(t)}$(t){var e=this.find(t);return e?d.create(e):null}findAll(t){return Array.from(this.htmlEl.querySelectorAll(t))}$$(t){var e=this.findAll(t);return e.map(s=>d.create(s))}empty(){for(;this.htmlEl.firstChild;)this.htmlEl.removeChild(this.htmlEl.firstChild);return this}append(t){return typeof t=="string"?this.htmlEl.appendChild(document.createTextNode(t)):this.htmlEl.appendChild(t.el||t),this}prepend(t){return typeof t=="string"?this.htmlEl.prepend(document.createTextNode(t)):this.htmlEl.prepend(t.el||t),this}prependHTML(t){var e=d.create("div").html(t);return this.prepend(e.createChildrenFragment()),e}appendHTML(t){var e=d.create("div").html(t);return this.append(e.createChildrenFragment()),e}createChildrenFragment(){const t=this.children();var e=document.createDocumentFragment();return t.forEach(s=>e.appendChild(s.el)),e}appendTo(t){var e=t.el?t.el:t;return e.appendChild(this.htmlEl),this}remove(){return this.htmlEl.parentNode&&this.htmlEl.parentNode.removeChild(this.htmlEl),this}removeChild(t){return this.htmlEl.removeChild(t.el||t),this}text(t){if(typeof t=="undefined")return this.htmlEl.textContent;var e=t;return t instanceof d&&(e=t.text()),this.htmlEl.textContent!==e&&(this.htmlEl.textContent=e),this}css(t,e){const s=this.htmlEl;if(typeof t=="string"&&typeof e!="undefined")t.indexOf("--")===0&&typeof e!="undefined"?s.style.setProperty(t,e):s.style[t]=e;else if(typeof t!="undefined"){if(typeof t=="string")return getComputedStyle(s)[t];Object.entries(t).forEach(([n,l])=>{n.indexOf("--")===0&&typeof l!="undefined"?s.style.setProperty(n,l):s.style[n]=l})}return this}getComputedStyle(...t){var e=getComputedStyle(this.htmlEl),s={};return t.forEach(n=>{s[n]=e[n]}),s}getStyleList(...t){const e=this.htmlEl;for(var s={},n=e.style.length,l=0;l<n;l++){var a=e.style[l];s[a]=e.style[a]}return t.forEach(o=>{s[o]=this.css(o)}),s}cssText(t){const e=this.htmlEl;return typeof t=="undefined"?e.style.cssText:this}cssFloat(t){return parseFloat(this.css(t))}cssInt(t){return parseInt(this.css(t))}px(t,e){return this.css(t,`${e}px`)}rect(){return this.htmlEl.getBoundingClientRect()}bbox(){return this.el.getBBox()}isSVG(){return this.htmlEl.tagName.toUpperCase()==="SVG"}offsetRect(){const t=this.htmlEl;if(this.isSVG()){const e=this.parent().rect(),s=this.rect();return{x:s.x-e.x,y:s.y-e.y,top:s.x-e.x,left:s.y-e.y,width:s.width,height:s.height}}return{x:t.offsetLeft,y:t.offsetTop,top:t.offsetTop,left:t.offsetLeft,width:t.offsetWidth,height:t.offsetHeight}}offset(){var t=this.rect(),e=d.getScrollTop(),s=d.getScrollLeft();return{top:t.top+e,left:t.left+s}}offsetLeft(){return this.offset().left}offsetTop(){return this.offset().top}position(){return this.htmlEl.style.top?{top:parseFloat(this.css("top")),left:parseFloat(this.css("left"))}:this.rect()}size(){return[this.width(),this.height()]}width(){return this.htmlEl.offsetWidth||this.rect().width}contentWidth(){return this.width()-this.cssFloat("padding-left")-this.cssFloat("padding-right")}height(){return this.htmlEl.offsetHeight||this.rect().height}contentHeight(){return this.height()-this.cssFloat("padding-top")-this.cssFloat("padding-bottom")}val(t){if(typeof t=="undefined")return this.inputEl.value;if(typeof t!="undefined"){var e=t;t instanceof d?e=t.val():this.inputEl.value=e}return this}matches(t){return this.htmlEl&&this.htmlEl.matches?this.htmlEl.matches(t)?this:this.parent().matches(t):null}get value(){return this.inputEl.value}get files(){return this.inputEl.files?Array.from(this.inputEl.files):[]}show(t="block"){return this.htmlEl.style.display=t!="none"?t:"block",this}hide(){return this.htmlEl.style.display="none",this}isHide(){return this.htmlEl.style.display==="none"}isShow(){return!this.isHide()}toggle(t){var e=this.isHide();return arguments.length==1?t?this.show():this.hide():e?this.show():this.hide()}scrollIntoView(){this.htmlEl.scrollIntoView()}addScrollLeft(t){return this.htmlEl.scrollLeft+=t,this}addScrollTop(t){return this.htmlEl.scrollTop+=t,this}setScrollTop(t){return this.htmlEl.scrollTop=t,this}setScrollLeft(t){return this.htmlEl.scrollLeft=t,this}scrollTop(){return this.htmlEl===document.body?d.getScrollTop():this.htmlEl.scrollTop}scrollLeft(){return this.htmlEl===document.body?d.getScrollLeft():this.htmlEl.scrollLeft}scrollHeight(){return this.htmlEl.scrollHeight}scrollWidth(){return this.htmlEl.scrollWidth}on(t,e,s){return this.htmlEl.addEventListener(t,e,s),this}off(t,e){return this.htmlEl.removeEventListener(t,e),this}getElement(){return this.htmlEl}createChild(t,e="",s={},n={}){let l=d.create(t,e,s);return l.css(n),this.append(l),l}get firstChild(){return d.create(this.htmlEl.firstElementChild)}children(){var t=this.htmlEl.firstElementChild;if(!t)return[];var e=[];do e.push(d.create(t)),t=t.nextElementSibling;while(t);return e}childLength(){return this.htmlEl.children.length}replace(t){return this.htmlEl.parentNode&&this.htmlEl.parentNode.replaceChild(t.el||t,this.htmlEl),this}replaceChild(t,e){return this.htmlEl.replaceChild(e.el||e,t.el||t),this}checked(t=!1){return arguments.length==0?!!this.inputEl.checked:(this.inputEl.checked=!!t,this)}click(){return this.htmlEl.click(),this}focus(){return this.htmlEl.focus(),this}select(){if(this.attr("contenteditable")==="true"){var t=document.createRange();t.selectNodeContents(this.htmlEl);var e=window.getSelection();e==null||e.removeAllRanges(),e==null||e.addRange(t)}else this.inputEl.select();return this}blur(){return this.htmlEl.blur(),this}}class st{constructor(t,e={}){u(this,"context");u(this,"options");this.context=t,this.options=e}initialize(){}load(){}refresh(){}render(){}getRef(t){return this.context.getRef(t)}run(){}destroy(){}}const xs={touchstart:!0,touchmove:!0,mousedown:!0,mouseup:!0,mousemove:!0},tr={doubletab:"touchend"},er={doubletab:!0};class sr extends st{constructor(){super(...arguments);u(this,"_domEvents");u(this,"_bindings");u(this,"doubleTab")}initialize(){this.destroy(),!(this._domEvents&&this.context.notEventRedefine)&&(this._domEvents||(this._domEvents=this.context.filterProps(lt)),this._domEvents.forEach(t=>this.parseDomEvent(t)))}destroy(){this.context.notEventRedefine||this.removeEventAll()}removeEventAll(){var t;(t=this.getBindings())==null||t.forEach(e=>{this.removeDomEvent(e)}),this.initBindings()}removeDomEvent({eventName:t,dom:e,callback:s}){e&&q.removeDomEvent(e,t,s)}getBindings(){return this._bindings||this.initBindings(),this._bindings}addBinding(t){var e;(e=this.getBindings())==null||e.push(t)}initBindings(){this._bindings=[]}matchPath(t,e){return t?t.matches(e)?t:this.matchPath(t.parentElement,e):null}hasDelegate(t,e){return this.matchPath(t.target||t.srcElement,e.delegate)}makeCallback(t,e){return t.delegate?this.makeDelegateCallback(t,e):this.makeDefaultCallback(t,e)}makeDefaultCallback(t,e){return s=>{var n=this.runEventCallback(s,t,e);if(P(n))return n}}makeDelegateCallback(t,e){return s=>{const n=this.hasDelegate(s,t);if(n){s.$dt=d.create(n);var l=this.runEventCallback(s,t,e);if(P(l))return l}}}runEventCallback(t,e,s){const n=this.context;if(t.xy=q.posXY(t),e.beforeMethods.length&&e.beforeMethods.every(a=>n[a.target].call(n,t,a.param)),this.checkEventType(t,e)){var l=s(t,t.$dt,t.xy);return l!==!1&&e.afterMethods.length&&e.afterMethods.forEach(a=>n[a.target].call(n,t,a.param)),l}}checkEventType(t,e){const s=this.context;var n=!0;e.codes.length&&(n=(t.code?e.codes.indexOf(t.code.toLowerCase())>-1:!1)||(t.key?e.codes.indexOf(t.key.toLowerCase())>-1:!1));var l=!0;return e.checkMethodList.length&&(l=e.checkMethodList.every(a=>{var o=s[a];return S(o)&&o?o.call(s,t):P(o)?!!o:!0})),n&&l}getDefaultDomElement(t){const e=this.context;let s;return typeof t=="string"&&t?s=e.refs[t]||e[t]||window[t]:s=e.el||e.$el||e.$root,s instanceof d?s.getElement():s}getRealEventName(t){return tr[t]||t}getCustomEventName(t){return er[t]?t:""}getDefaultEventObject(t,e){const s=this.context;let n=e;const l=n.filter(L=>!!s[L]),[a,o]=R(n,"after"),[f,m]=R(n,"before"),[g,N]=R(n,"debounce"),[v,C]=R(n,"delay"),[D,M]=R(n,"throttle"),[O]=R(n,"capture"),_=[...l,...a,...f,...v,...g,...D,...O];var K=n.filter(L=>_.indexOf(L)===-1).map(L=>L.toLowerCase());return{eventName:this.getRealEventName(t),customEventName:this.getCustomEventName(t),codes:K,captures:O,afterMethods:o,beforeMethods:m,delayMethods:C,debounceMethods:N,throttleMethods:M,checkMethodList:l}}addDomEvent(t,e){t.callback=this.makeCallback(t,e),this.addBinding(t);var s=!!t.captures.length;xs[t.eventName]&&(s={passive:!0,capture:s}),(t==null?void 0:t.dom)&&q.addDomEvent(t==null?void 0:t.dom,t.eventName,t.callback,s)}makeCustomEventCallback(t,e){if(t.customEventName==="doubletab"){var s=300;return t.delayMethods.length&&(s=+t.delayMethods[0].target),(...n)=>{this.doubleTab?(performance.now()-this.doubleTab.time<s&&e(...n),this.doubleTab=null):this.doubleTab={time:performance.now()}}}return e}bindingDomEvent([t,e,...s],n,l){let a=this.getDefaultEventObject(t,n);if(a.dom=this.getDefaultDomElement(e),a.delegate=s.join(F),a.debounceMethods.length){var o=+a.debounceMethods[0].target;l=j(l,o)}else if(a.throttleMethods.length){var f=+a.throttleMethods[0].target;l=Q(l,f)}l=this.makeCustomEventCallback(a,l),this.addDomEvent(a,l)}getEventNames(t){let e=[];return t.split(U).forEach(s=>{var n=s.split(U);e.push.apply(e,n)}),e}parseDomEvent(t){const e=this.context;let s=t.split(A).map(m=>m.trim()).filter(Boolean);var n=s.shift(),l=n==null?void 0:n.split(G)[1],a=l==null?void 0:l.split(F);if(a){var o=this.getEventNames(a[0]),f=e[t].bind(e);for(let m=0,g=o.length;m<g;m++)a[0]=o[m],this.bindingDomEvent(a,s,f)}}}const rr=(r,t)=>{if(bt(t))switch(r){case"width":case"height":case"top":case"left":case"right":case"bottom":return t+"px"}return t},ir=(r,t,e)=>{if(t==="cssText"){r.cssText(e);return}else if(t==="style"){if(typeof e!="string"){const l={};Object.entries(e).forEach(([a,o])=>{l[a]=rr(a,o)}),r.css(e)}return}else if(t==="class"){if(Array.isArray(e))r.addClass(...e==null?void 0:e.filter(Boolean));else if(Nt(e)){const l=Object.keys(e);for(var s=0,n=l.length;s<n;s++){const a=l[s],o=e[a];r.toggleClass(a,o)}}else r.htmlEl.className=e;return}else if(t==="callback"&&typeof e=="function"){e();return}typeof e=="undefined"?r.removeAttr(t):r.el.nodeName==="TEXTAREA"&&t==="value"||t==="text"||t==="textContent"?r.text(e):t==="innerHTML"||t==="html"?r.html(e):t==="htmlDiff"?r.updateDiff(e):t==="svgDiff"?r.updateSVGDiff(e):t==="value"?r.val(e):r.attr(t,e)};class nr extends st{constructor(){super(...arguments);u(this,"_bindMethods")}load(...t){this.bindData(...t)}bindData(...t){var s;this._bindMethods||(this._bindMethods=this.context.filterProps(ht));const e=(s=this._bindMethods)==null?void 0:s.filter(n=>{if(!t.length)return!0;var[l,a]=n.split(A),[o,f]=l.split(" ");return t.indexOf(f)>-1});e==null||e.forEach(async a=>{const l=this.context[a];var[a,o]=a.split(A);const f=this.getRef(o);let m=At;typeof f=="string"&&f!==""?m=pt(f):typeof f=="function"&&(m=f);const g=a.split(z)[1];let N=this.context.refs[g];const v=typeof m=="function"&&m.call(this.context);if(N&&v){const M=await l.call(this.context,...t);if(!M)return;const O=Object.keys(M);for(var C=0,D=O.length;C<D;C++){const _=O[C],K=M[_];ir(N,_,K)}}})}destroy(){this._bindMethods=void 0}}class lr extends st{constructor(){super(...arguments);u(this,"_callbacks",[]);u(this,"_bindings")}initialize(){this.destroy(),this._callbacks||(this._callbacks=this.context.filterProps(at)),this._callbacks.forEach(t=>this.parseCallback(t))}destroy(){this.context.notEventRedefine||this.removeCallbackAll()}removeCallbackAll(){this.getBindings().forEach(t=>{this.removeCallback(t)}),this.initBindings()}removeCallback({animationFrameId:t}){cancelAnimationFrame(t)}getBindings(){return this._bindings||this.initBindings(),this._bindings}addBinding(t){this.getBindings().push(t)}initBindings(){this._bindings=[]}makeCallback(t,e){const s=n=>{e(n),t.requestId=requestAnimationFrame(s)};return()=>{t.requestId=requestAnimationFrame(s)}}getDefaultCallbackObject(t,e){const s=this.context;let n=e;const l=n.filter(_=>!!s[_]),[a,o]=R(n,"after"),[f,m]=R(n,"before"),[g,N]=R(n,"debounce"),[v,C]=R(n,"delay"),[D,M]=R(n,"throttle"),[O]=R(n,"capture");return[...l,...a,...f,...v,...g,...D,...O],{callbackName:t,captures:O,afterMethods:o,beforeMethods:m,delayMethods:C,debounceMethods:N,throttleMethods:M,checkMethodList:l}}addCallback(t,e){t.callback=this.makeCallback(t,e),this.addBinding(t),t.callback()}bindingCallback(t,e,s){let n=this.getDefaultCallbackObject(t,e);if(n.debounceMethods.length){var l=+n.debounceMethods[0].target;s=j(s,l)}else if(n.throttleMethods.length){var a=+n.throttleMethods[0].target;s=Q(s,a)}this.addCallback(n,s)}parseCallback(t){const e=this.context;let s=t.split(A).map(o=>o.trim()).filter(Boolean);var n=s.shift(),l=n.split(W)[1],a=e[t].bind(e);this.bindingCallback(l,s,a)}}const w="ref",Ut=d.create("div"),ar=`[${w}]`,rt="refclass",or=`[${rt}]`;class hr{constructor(t,e){u(this,"state");u(this,"prevState");u(this,"children");u(this,"id");u(this,"__tempVariables");u(this,"handlers");u(this,"_loadMethods");u(this,"__cachedMethodList");u(this,"el");u(this,"$el");u(this,"$root");u(this,"refs");u(this,"opt");u(this,"parent");u(this,"props");u(this,"source");u(this,"sourceName");u(this,"childComponents");u(this,"_localTimestamp");u(this,"_$store");this.state={},this.prevState={},this.refs={},this.children={},this._localTimestamp=0,this.id=Ot(),this.__tempVariables=new Map,this.handlers=this.initializeHandler(),this.initializeProperty(t,e),this.initComponents()}get $store(){return this._$store}set $store(t){this._$store=t}get _timestamp(){return this._localTimestamp++}get target(){var t;return(t=this.$el)==null?void 0:t.el}initializeProperty(t,e={}){this.opt=t||{},this.parent=this.opt,this.props=e,this.source=Ot(),this.sourceName=this.constructor.name}initComponents(){this.childComponents=this.components()}initializeHandler(){return[new nr(this),new sr(this),new lr(this)]}initState(){return{}}setState(t={},e=!0){this.prevState=this.state,this.state=Object.assign({},this.state,t),e&&this.load()}toggleState(t,e=!0){this.setState({[t]:!this.state[t]},e)}apply(t){return Lt(t)}_reload(t,e){e&&this.render(e),this.props=t,this.state={},this.setState(this.initState(),!1),this.refresh()}render(t){this.$el=this.parseTemplate(`${this.template()}`),this.refs.$el=this.$el,t&&t.append(this.$el),this.load(),this.afterRender()}initialize(){this.state=this.initState()}afterRender(){}components(){return{}}getRef(...t){const e=t.join("");return this.refs[e]}parseTemplate(t,e=!1){Array.isArray(t)&&(t=t.join("")),t=t.trim();const s=Ut.html(t).children();for(var n=0,l=s.length;n<l;n++){const N=s[n];var a=N.attr(w);a&&(this.refs[a]=N);for(var o=N.$$(ar),f={},m=0,g=o.length;m<g;m++){const v=o[m],C=v.attr(w);f[C]?console.warn(`${a} is duplicated. - ${this.sourceName}`,this):f[C]=!0,this.refs[C]=v}}return!e&&s.length?s[0]:d.create(Ut.createChildrenFragment())}parsePropertyInfo(t){let e={};for(var s of t.htmlEl.attributes)if(yt(s.nodeName)){const l=B(s.nodeName);Nt(l)?e=Object.assign(e,l):e[s.nodeName]=B(s.nodeValue)}else e[s.nodeName]=B(s.nodeValue);const n=t.html();return n&&(e.content=n,e.contentChildren=this.parseContent(e.content)),e}parseSourceName(t){return t.parent?[t.sourceName,...this.parseSourceName(t.parent)]:[t.sourceName]}getEventMachineComponent(t){var e=Pt(t)||this.childComponents[t];return e}createInstanceForComponent(t,e,s={}){return t.__proto__.name==="ProxyComponent"?new t({target:e,props:s}):new t(this,s)}renderComponent({$dom:t,refName:e,component:s,props:n}){var a;var l=null;this.children[e]?(l=this.children[e],l.__timestamp=this._localTimestamp,l._reload(n)):(l=this.createInstanceForComponent(s,t.$parent.el,n),l.__timestamp=this._localTimestamp,this.children[e||l.id]=l,S(l.render)&&l.render()),l.renderTarget?((a=l.$el)==null||a.appendTo(l.renderTarget),t.remove()):l.$el?t.replace(l.$el):t.remove()}parseContent(t,e=[]){return d.create("div").html(t).children().map(s=>this._getComponentInfo(s)).filter(s=>e.length===0?!0:e.includes(s.refClass))}_getComponentInfo(t){const e=t.attr(rt),s=this.getEventMachineComponent(e);if(s){let n=this.parsePropertyInfo(t),l=t.attr(w);return{$dom:t,refClass:e,props:n,refName:l||n.ref,component:s}}else return{notUsed:!0,$dom:t}}getComponentInfoList(t){if(!t)return[];const e=[];return t.$$(or).filter(n=>n.path().filter(l=>l.attr(rt)).length===1).forEach(n=>{e.push(this._getComponentInfo(n))}),e}parseComponent(){const t=this.$el;this.getComponentInfoList(t).forEach(s=>{s.notUsed?s.$dom.remove():this.renderComponent(s)}),Z(this.children,(s,n)=>{n.__timestamp!==this._localTimestamp&&n.clean()})}clean(){if(this.$el&&!this.$el.hasParent())return Z(this.children,(t,e)=>{S(e==null?void 0:e.clean)&&e.clean()}),this.destroy(),this.$el=null,!0}refresh(){this.load()}_afterLoad(){this.runHandlers("initialize"),this.bindData(),this.parseComponent()}async load(...t){this._loadMethods||(this._loadMethods=this.filterProps(ot)),await this._loadMethods.filter(s=>{const n=s.split(k)[1].split(A).map(l=>l.trim())[0];return t.length?t.indexOf(n)>-1:!0}).forEach(async s=>{let n=s.split(k)[1];var[l,...a]=n.split(A).map(g=>g.trim());a=a.map(g=>g.trim());const o=Boolean(a.filter(g=>dt.includes(g)).length);if(this.refs[l]){var m=await this[s].call(this,...t);Array.isArray(m)&&(m=m.join(""));const g=this.parseTemplate(m,!0);o?this.refs[l].htmlDiff(g):this.refs[l].html(g)}}),this._afterLoad()}runHandlers(t="run",...e){this.handlers.forEach(s=>s[t](...e))}bindData(...t){this.runHandlers("load",...t)}template(){return null}eachChildren(t){!S(t)||Z(this.children,(e,s)=>{t(s)})}rerender(){var t=this.$el.parent();this.destroy(),this.render(t)}destroy(){this.eachChildren(t=>{t.destroy()}),this.runHandlers("destroy"),this.$el&&this.$el.remove(),this.$el=null,this.refs={},this.children={}}collectProps(){return this.__cachedMethodList||(this.__cachedMethodList=Us(this,t=>t.indexOf(E)===0)),this.__cachedMethodList}filterProps(t){return this.collectProps().filter(e=>e.match(t))}self(t){return t&&t.$dt&&t.$dt.is(t.target)}isAltKey(t){return t.altKey}isCtrlKey(t){return t.ctrlKey}isShiftKey(t){return t.shiftKey}isMetaKey(t){return t.metaKey||t.key=="Meta"||t.code.indexOf("Meta")>-1}isMouseLeftButton(t){return t.buttons===1}isMouseRightButton(t){return t.buttons===2}hasMouse(t){return t.pointerType==="mouse"}hasTouch(t){return t.pointerType==="touch"}hasPen(t){return t.pointerType==="pen"}preventDefault(t){return t.preventDefault(),!0}stopPropagation(t){return t.stopPropagation(),!0}}class cr extends hr{constructor(t,e={}){super(t,e);u(this,"__storeInstance");u(this,"attributes");(e==null?void 0:e.store)?this.__storeInstance=e.store:this.__storeInstance=new tt,this.created(),this.initialize(),this.initializeStoreEvent()}setStore(t){this.__storeInstance=t}get $store(){return this.__storeInstance||this.parent.$store}created(){}getRealEventName(t,e){var s=t.indexOf(e);return t.substr(s<0?0:s+e.length)}splitMethod(t,e,s=0){var[n,l]=R(t,e);return[n.length?+l[0].target:s,n,l]}createLocalCallback(t,e){var s=e.bind(this);return s.displayName=`${this.sourceName}.${t}`,s.source=this.source,s}initializeStoreEvent(){this.filterProps(ct).forEach(t=>{const e=this.getRealEventName(t,Y),[s,...n]=e.split(A),l=n.map(T=>T.trim()).filter(T=>this[T]).map(T=>({target:T})),[a,o]=this.splitMethod(n,"debounce"),[f,m]=this.splitMethod(n,"throttle"),[g,N]=this.splitMethod(n,"allTrigger"),[v,C]=this.splitMethod(n,"selfTrigger"),[D,M]=this.splitMethod(n,"frame"),[O,_,K]=this.splitMethod(n,"params");let L=+a>0?a:0,kt=+f>0?f:0,fr=Boolean(N.length),dr=Boolean(C.length),Ft=Boolean(M.length);if(_.length){const T=B(O);P(T.debounce)&&(L=T.debounce),P(T.throttle)&&(kt=T.throttle),P(T.frame)&&(Ft=T.frame)}const Er=this[t];e.split(A).filter(T=>l.findIndex(it=>it.target===T)===-1&&o.indexOf(T)===-1&&N.indexOf(T)===-1&&C.indexOf(T)===-1&&m.indexOf(T)===-1&&_.indexOf(T)===-1).map(T=>T.trim()).filter(Boolean).forEach(T=>{if(S(this[t])){var it=this.createLocalCallback(T,Er);this.$store.on(T,it,this,L,kt,fr,dr,l,Ft)}})})}destoryStoreSUBSCRIBE(){this.$store.offAll(this)}destroy(){super.destroy(),this.destoryStoreSUBSCRIBE()}rerender(){super.rerender(),this.initialize(),this.initializeStoreEvent()}emit(t,...e){this.$store.source=this.source,this.$store.sourceContext=this,this.$store.emit(t,...e)}nextTick(t,e=0){setTimeout(()=>{this.$store.nextTick(t)},e)}trigger(t,...e){this.$store.source=this.source,this.$store.trigger(t,...e)}broadcast(t,...e){Object.keys(this.children).forEach(s=>{this.children[s].trigger(t,...e),this.children[s].broadcast(t,...e)})}on(t,e,s=0,n=0,l=!1,a=!1,o=!1){this.$store.on(t,e,this,s,n,l,a,[],o)}off(t,e){this.$store.off(t,e,this)}subscribe(t,e=0,s=0){const n=`subscribe.${vt()}`,l=this.createLocalCallback(n,t);return this.$store.on(n,l,this,e,s,!1,!0),n}}const ur=(r,t={})=>{const e=d.create((t==null?void 0:t.container)||document.body),s=new r(t,wt(Ht({},t),{store:t.store||new tt}));return s.render(e),s};i.AFTER=X,i.ALL_TRIGGER=mt,i.ALT=he,i.ANIMATIONEND=bs,i.ANIMATIONITERATION=Ss,i.ANIMATIONSTART=Ns,i.ARROW_DOWN=Zt,i.ARROW_LEFT=Jt,i.ARROW_RIGHT=xt,i.ARROW_UP=Qt,i.BACKSPACE=re,i.BEFORE=Xt,i.BIND=Is,i.BIND_CHECK_DEFAULT_FUNCTION=At,i.BIND_CHECK_FUNCTION=pt,i.BIND_SAPARATOR=z,i.BLUR=hs,i.BRACKET_LEFT=oe,i.BRACKET_RIGHT=ae,i.BaseStore=tt,i.CALLBACK=Tt,i.CALLBACK_SAPARATOR=W,i.CAPTURE=Oe,i.CHANGE=is,i.CHANGEINPUT=Cs,i.CHECKER=c,i.CHECK_BIND_PATTERN=ht,i.CHECK_CALLBACK_PATTERN=at,i.CHECK_DOM_EVENT_PATTERN=lt,i.CHECK_LOAD_PATTERN=ot,i.CHECK_SAPARATOR=A,i.CHECK_SUBSCRIBE_PATTERN=ct,i.CLICK=De,i.COMMAND=Gt,i.CONFIG=Pe,i.CONTEXTMENU=rs,i.CONTROL=fe,i.CUSTOM=b,i.D1000=Re,i.DEBOUNCE=Et,i.DELAY=Ce,i.DELETE=ie,i.DOMDIFF=dt,i.DOM_EVENT_SAPARATOR=G,i.DOUBLECLICK=Be,i.DOUBLETAB=ys,i.DRAG=qe,i.DRAGEND=ss,i.DRAGENTER=Je,i.DRAGEXIT=ts,i.DRAGLEAVE=xe,i.DRAGOUT=es,i.DRAGOVER=Ze,i.DRAGSTART=je,i.DROP=Qe,i.Dom=d,i.ENTER=te,i.EQUAL=ne,i.ESCAPE=se,i.EVENT=V,i.FIT=pe,i.FOCUS=ls,i.FOCUSIN=as,i.FOCUSOUT=os,i.FRAME=be,i.IF=qt,i.INPUT=ns,i.KEY=jt,i.KEYDOWN=ze,i.KEYPRESS=Xe,i.KEYUP=Ye,i.LEFT_BUTTON=ft,i.LOAD=Ls,i.LOAD_SAPARATOR=k,i.MAGIC_METHOD=E,i.META=ue,i.MINUS=le,i.MOUSE=de,i.MOUSEDOWN=Ue,i.MOUSEENTER=we,i.MOUSELEAVE=Ke,i.MOUSEMOVE=Fe,i.MOUSEOUT=He,i.MOUSEOVER=$e,i.MOUSEUP=ke,i.NAME_SAPARATOR=U,i.ON=Wt,i.PARAMS=Se,i.PASSIVE=Ae,i.PASTE=cs,i.PEN=me,i.PIPE=ut,i.POINTEREND=As,i.POINTERENTER=gs,i.POINTERMOVE=ps,i.POINTEROUT=Ts,i.POINTEROVER=ms,i.POINTERSTART=Es,i.PREVENT=ve,i.RAF=Ie,i.RESIZE=us,i.RIGHT_BUTTON=Te,i.SAPARATOR=F,i.SCROLL=fs,i.SELF=ge,i.SELF_TRIGGER=gt,i.SHIFT=ce,i.SPACE=ee,i.STOP=Me,i.SUBMIT=ds,i.SUBSCRIBE=_e,i.SUBSCRIBE_ALL=ye,i.SUBSCRIBE_SAPARATOR=Y,i.SUBSCRIBE_SELF=Le,i.THROTTLE=Ne,i.TOUCH=Ee,i.TOUCHEND=We,i.TOUCHMOVE=Ge,i.TOUCHSTART=Ve,i.TRANSITIONCANCEL=_s,i.TRANSITIONEND=vs,i.TRANSITIONRUN=Ms,i.TRANSITIONSTART=Os,i.UIElement=cr,i.VARIABLE_SAPARATOR=_t,i.WHEEL=Rs,i.getRef=Ps,i.getVariable=B,i.hasVariable=yt,i.initializeGroupVariables=Hs,i.makeEventChecker=p,i.normalizeWheelEvent=Ds,i.recoverVariable=ws,i.registAlias=Vs,i.registElement=Ks,i.retriveAlias=Gs,i.retriveElement=Pt,i.spreadVariable=Lt,i.start=ur,i.variable=x,Object.defineProperty(i,"__esModule",{value:!0}),i[Symbol.toStringTag]="Module"});
