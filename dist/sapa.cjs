function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function e(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}function n(){return(n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}function i(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,r(t,e)}function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function o(t,e){return e||(e=t.slice(0)),t.raw=e,t}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var a=function(t,e){return void 0===e&&(e=f)," "+e+" "+t},l=/domevent (.*)/gi,c=/load (.*)/gi,u=/bind (.*)/gi,h=/subscribe (.*)/gi,f="|",d={},p=function(){var t=[].slice.call(arguments).join(":");return function(){return"@magic:domevent "+[t].concat([].slice.call(arguments)).join(" ")}},v=function(){return"@magic:subscribe "+[].slice.call(arguments).join(f)},g=function(t,e){return void 0===e&&(e=f),a(t,e)},m=function(t,e){return void 0===e&&(e=f),a("after("+t+")",e)},y=g,E=g,b=g("ArrowUp"),T=g("ArrowDown"),C=g("ArrowLeft"),A=g("ArrowRight"),O=g("Enter"),N=g("Space"),S=g("Escape"),x=g("isAltKey"),R=g("isShiftKey"),M=g("isMetaKey"),k=g("isCtrlKey"),_=g("hasMouse"),D=g("hasTouch"),w=g("hasPen"),L=g("self"),P=g("isMouseLeftButton"),I=g("isMouseRightButton"),U=g("fit"),B=g("passive"),$=g("domdiff"),j=function(t){return void 0===t&&(t=100),g("debounce("+t+")")},H=j(1e3),F=g("allTrigger()"),V=g("selfTrigger()"),K=g("capture()"),G=m("preventDefault"),W=m("stopPropagation"),z=v,X=p,Y=p("click"),q=p("dblclick"),J=p("mousedown"),Z=p("mouseup"),Q=p("mousemove"),tt=p("mouseover"),et=p("mouseout"),nt=p("mouseenter"),it=p("mouseleave"),rt=p("touchstart"),ot=p("touchmove"),st=p("touchend"),at=p("keydown"),lt=p("keyup"),ct=p("keypress"),ut=p("drag"),ht=p("dragstart"),ft=p("drop"),dt=p("dragover"),pt=p("dragenter"),vt=p("dragleave"),gt=p("dragexit"),mt=p("dragout"),yt=p("dragend"),Et=p("contextmenu"),bt=p("change"),Tt=p("input"),Ct=p("focus"),At=p("focusin"),Ot=p("focusout"),Nt=p("blur"),St=p("paste"),xt=p("resize"),Rt=p("scroll"),Mt=p("submit"),kt=X("pointerover"),_t=X("pointerenter"),Dt=X("pointerout"),wt=X("pointermove"),Lt=X("pointerup"),Pt=X("change","input"),It=X("wheel","mousewheel","DOMMouseScroll"),Ut=p("animationstart"),Bt=p("animationend"),$t=p("animationiteration"),jt=p("transitionstart"),Ht=p("transitionend"),Ft=p("transitionrun"),Vt=p("transitioncancel"),Kt=X("doubletab"),Gt=function(t){return d[t]||""},Wt=function(t){return function(){return this.prevState[t]!=this.state[t]}},zt=function(){return!0};function Xt(t,e){return Math.sign(t)*Math.min(e,Math.abs(t))}var Yt={addDomEvent:function(t,e,n,i){void 0===i&&(i=!1),t&&t.addEventListener(e,n,i)},removeDomEvent:function(t,e,n){t&&t.removeEventListener(e,n)},pos:function(t){return t.touches&&t.touches[0]?t.touches[0]:t},posXY:function(t){var e=this.pos(t);return{x:e.pageX,y:e.pageY}}},qt={__proto__:null,MAGIC_METHOD:"@magic:",makeEventChecker:a,CHECK_DOM_EVENT_PATTERN:l,CHECK_LOAD_PATTERN:c,CHECK_BIND_PATTERN:u,CHECK_SUBSCRIBE_PATTERN:h,PIPE:function(){return[].slice.call(arguments).join("|")},NAME_SAPARATOR:":",CHECK_SAPARATOR:f,DOM_EVENT_SAPARATOR:"@magic:domevent ",LOAD_SAPARATOR:"@magic:load ",BIND_SAPARATOR:"@magic:bind ",SUBSCRIBE_SAPARATOR:"@magic:subscribe ",SAPARATOR:" ",CHECKER:g,AFTER:m,BEFORE:function(t,e){return void 0===e&&(e=f),a("before("+t+")",e)},IF:y,KEY:E,ARROW_UP:b,ARROW_DOWN:T,ARROW_LEFT:C,ARROW_RIGHT:A,ENTER:O,SPACE:N,ESCAPE:S,ALT:x,SHIFT:R,META:M,CONTROL:k,MOUSE:_,TOUCH:D,PEN:w,SELF:L,LEFT_BUTTON:P,RIGHT_BUTTON:I,FIT:U,PASSIVE:B,DOMDIFF:$,DEBOUNCE:j,DELAY:function(t){return void 0===t&&(t=300),g("delay("+t+")")},D1000:H,THROTTLE:function(t){return void 0===t&&(t=100),g("throttle("+t+")")},ALL_TRIGGER:F,SELF_TRIGGER:V,CAPTURE:K,PREVENT:G,STOP:W,SUBSCRIBE:z,SUBSCRIBE_ALL:function(){return v.apply(void 0,[].slice.call(arguments).concat([F]))},SUBSCRIBE_SELF:function(){return v.apply(void 0,[].slice.call(arguments).concat([V]))},CONFIG:function(t){return v.apply(void 0,["config:"+t].concat([].slice.call(arguments,1)))},CUSTOM:X,CLICK:Y,DOUBLECLICK:q,MOUSEDOWN:J,MOUSEUP:Z,MOUSEMOVE:Q,MOUSEOVER:tt,MOUSEOUT:et,MOUSEENTER:nt,MOUSELEAVE:it,TOUCHSTART:rt,TOUCHMOVE:ot,TOUCHEND:st,KEYDOWN:at,KEYUP:lt,KEYPRESS:ct,DRAG:ut,DRAGSTART:ht,DROP:ft,DRAGOVER:dt,DRAGENTER:pt,DRAGLEAVE:vt,DRAGEXIT:gt,DRAGOUT:mt,DRAGEND:yt,CONTEXTMENU:Et,CHANGE:bt,INPUT:Tt,FOCUS:Ct,FOCUSIN:At,FOCUSOUT:Ot,BLUR:Nt,PASTE:St,RESIZE:xt,SCROLL:Rt,SUBMIT:Mt,POINTERSTART:function(){return X("pointerdown").apply(void 0,[].slice.call(arguments))+P},POINTEROVER:kt,POINTERENTER:_t,POINTEROUT:Dt,POINTERMOVE:wt,POINTEREND:Lt,CHANGEINPUT:Pt,WHEEL:It,ANIMATIONSTART:Ut,ANIMATIONEND:Bt,ANIMATIONITERATION:$t,TRANSITIONSTART:jt,TRANSITIONEND:Ht,TRANSITIONRUN:Ft,TRANSITIONCANCEL:Vt,DOUBLETAB:Kt,LOAD:function(t){return void 0===t&&(t="$el"),"@magic:load "+t},getRef:Gt,BIND_CHECK_FUNCTION:Wt,BIND_CHECK_DEFAULT_FUNCTION:zt,BIND:function(t){return void 0===t&&(t="$el"),"@magic:bind "+t},normalizeWheelEvent:function(t){var e=t.deltaX,n=t.deltaY;if(0===e&&t.shiftKey){var i=[e,n];n=i[0],e=i[1]}return t.deltaMode===WheelEvent.DOM_DELTA_LINE?n*=8:t.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(n*=24),[Xt(e,24),Xt(n,24),0]},default:Yt},Jt=function(t,e,n,i){n?i&&n===i||function(t,e,n){"boolean"==typeof n?function(t,e,n){n?(t.setAttribute(e,e),t[e]=n):(t.removeAttribute(e),t[e]=n)}(t,e,n):t.setAttribute(e,n)}(t,e,n):function(t,e,n){"boolean"==typeof n?function(t,e){t.removeAttribute(e),t[e]=!1}(t,e):e&&function(t,e){t.removeAttribute(e)}(t,e)}(t,e,i)};function Zt(t){return t.nodeType!==Node.TEXT_NODE&&"true"===t.getAttribute("data-domdiff-pass")}function Qt(t){for(var e={},n=t.length,i=0;i<n;i++){var r=t[i];e[r.name]=r.value}return e}function te(t,e,n,i){if(e)if(n){if(Zt(e)||Zt(n));else if(l=e,(a=n).nodeType===Node.TEXT_NODE&&a.textContent!==l.textContent||a.nodeName!==l.nodeName||function(t){return t.nodeType!==Node.TEXT_NODE&&t.getAttribute("refClass")}(n))t.replaceChild(n.cloneNode(!0),e);else if(n.nodeType!==Node.TEXT_NODE&&n.nodeType!==Node.COMMENT_NODE&&"[object HTMLUnknownElement]"!==n.toString()){!function(t,e,n){void 0===e&&(e={}),void 0===n&&(n={});var i=[];i.push.apply(i,Object.keys(e)),i.push.apply(i,Object.keys(n));for(var r=[].concat(new Set(i)),o=0,s=r.length;o<s;o++){var a=r[o];Jt(t,a,e[a],n[a])}}(e,Qt(n.attributes),Qt(e.attributes));var r=ee(e),o=ee(n),s=Math.max(r.length,o.length);for(i=0;i<s;i++)te(e,r[i],o[i],i)}}else t.removeChild(e);else t.appendChild(n.cloneNode(!0));var a,l}var ee=function(t){var e=t.firstChild;if(!e)return[];var n=[];do{n.push(e),e=e.nextSibling}while(e);return n};function ne(t,e){e=e.el||e;for(var n=ee(t=t.el||t),i=ee(e),r=Math.max(n.length,i.length),o=0;o<r;o++)te(t,n[o],i[o],o)}var ie,re=function(){function t(t,e,n){if("string"!=typeof t)this.el=t;else{var i=document.createElement(t);for(var r in e&&(i.className=e),n=n||{})i.setAttribute(r,n[r]);this.el=i}}t.create=function(e,n,i){return new t(e,n,i)},t.createByHTML=function(e){var n=t.create("div").html(e).children();return n.length?t.create(n[0].el):null},t.getScrollTop=function(){return Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop)},t.getScrollLeft=function(){return Math.max(window.pageXOffset,document.documentElement.scrollLeft,document.body.scrollLeft)},t.parse=function(t){return DOMParser().parseFromString(t,"text/htmll")},t.body=function(){return t.create(document.body)};var n=t.prototype;return n.setAttr=function(t){var e=this;return Object.keys(t).forEach(function(n){e.attr(n,t[n])}),this},n.setAttrNS=function(t,e){var n=this;return void 0===e&&(e="http://www.w3.org/2000/svg"),Object.keys(t).forEach(function(i){n.attr(i,t[i],e)}),this},n.setProp=function(t){var e=this;return Object.keys(t).forEach(function(n){e.el[n]!=t[n]&&(e.el[n]=t[n])}),this},n.data=function(t,e){return 1===arguments.length?this.attr("data-"+t):2===arguments.length?this.attr("data-"+t,e):this},n.attr=function(t,e){return 1==arguments.length?this.el.getAttribute(t):(this.el.getAttribute(t)!=e&&this.el.setAttribute(t,e),this)},n.attrNS=function(t,e,n){return void 0===n&&(n="http://www.w3.org/2000/svg"),1==arguments.length?this.el.getAttributeNS(n,t):(this.el.getAttributeNS(n,t)!=e&&this.el.setAttributeNS(n,t,e),this)},n.attrKeyValue=function(t){var e;return(e={})[this.el.getAttribute(t)]=this.val(),e},n.attrs=function(){var t=this;return[].slice.call(arguments).map(function(e){return t.el.getAttribute(e)})},n.styles=function(){var t=this;return[].slice.call(arguments).map(function(e){return t.el.style[e]})},n.removeAttr=function(t){return this.el.removeAttribute(t),this},n.removeStyle=function(t){return this.el.style.removeProperty(t),this},n.is=function(t){return this.el===(t.el||t)},n.isTag=function(t){return this.el.tagName.toLowerCase()===t.toLowerCase()},n.closest=function(e){for(var n=this,i=!1;!(i=n.hasClass(e));){if(!n.el.parentNode)return null;n=t.create(n.el.parentNode)}return i?n:null},n.path=function(){if(!this.el)return[];var t=this.parent();return t?[].concat(t.path(),[this]):[this]},n.parent=function(){return t.create(this.el.parentNode)},n.hasParent=function(){return!!this.el.parentNode},n.removeClass=function(){var t;return(t=this.el.classList).remove.apply(t,[].slice.call(arguments)),this},n.hasClass=function(t){return!!this.el.classList&&this.el.classList.contains(t)},n.addClass=function(){var t;return(t=this.el.classList).add.apply(t,[].slice.call(arguments)),this},n.onlyOneClass=function(t){this.parent().children().forEach(function(e){e.removeClass(t)}),this.addClass(t)},n.toggleClass=function(t,e){return this.el.classList.toggle(t,e),this},n.html=function(t){return void 0===t?this.el.innerHTML:("string"==typeof t?this.el.innerHTML=t:this.empty().append(t),this)},n.htmlDiff=function(t){ne(this,t)},n.updateDiff=function(e,n){void 0===n&&(n="div"),ne(this,t.create(n).html(e))},n.updateSVGDiff=function(e,n){void 0===n&&(n="div"),ne(this,t.create(n).html("<svg>"+e+"</svg>").firstChild.firstChild)},n.find=function(t){return this.el.querySelector(t)},n.$=function(e){var n=this.find(e);return n?t.create(n):null},n.findAll=function(t){return Array.from(this.el.querySelectorAll(t))},n.$$=function(e){return this.findAll(e).map(function(e){return t.create(e)})},n.empty=function(){for(;this.el.firstChild;)this.el.removeChild(this.el.firstChild);return this},n.append=function(t){return this.el.appendChild("string"==typeof t?document.createTextNode(t):t.el||t),this},n.prepend=function(t){return this.el.prepend("string"==typeof t?document.createTextNode(t):t.el||t),this},n.prependHTML=function(e){var n=t.create("div").html(e);return this.prepend(n.createChildrenFragment()),n},n.appendHTML=function(e){var n=t.create("div").html(e);return this.append(n.createChildrenFragment()),n},n.createChildrenFragment=function(){var t=this.children(),e=document.createDocumentFragment();return t.forEach(function(t){return e.appendChild(t.el)}),e},n.appendTo=function(t){return(t.el?t.el:t).appendChild(this.el),this},n.remove=function(){return this.el.parentNode&&this.el.parentNode.removeChild(this.el),this},n.removeChild=function(t){return this.el.removeChild(t.el||t),this},n.text=function(e){if(void 0===e)return this.el.textContent;var n=e;return e instanceof t&&(n=e.text()),this.el.textContent!==n&&(this.el.textContent=n),this},n.css=function(t,e){var n=this;if(void 0!==t&&void 0!==e)0===t.indexOf("--")&&void 0!==e?this.el.style.setProperty(t,e):this.el.style[t]=e;else if(void 0!==t){if("string"==typeof t)return getComputedStyle(this.el)[t];Object.entries(t).forEach(function(t){var e=t[0],i=t[1];0===e.indexOf("--")&&void 0!==i?n.el.style.setProperty(e,i):n.el.style[e]=i})}return this},n.getComputedStyle=function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){var t=getComputedStyle(this.el),e={};return[].slice.call(arguments).forEach(function(n){e[n]=t[n]}),e}),n.getStyleList=function(){for(var t=this,e={},n=this.el.style.length,i=0;i<n;i++){var r=this.el.style[i];e[r]=this.el.style[r]}return[].slice.call(arguments).forEach(function(n){e[n]=t.css(n)}),e},n.cssText=function(t){return void 0===t?this.el.style.cssText:(t!=this.el.tempCssText&&(this.el.style.cssText=t,this.el.tempCssText=t),this)},n.cssArray=function(t){return t[0]&&(this.el.style[t[0]]=t[1]),t[2]&&(this.el.style[t[2]]=t[3]),t[4]&&(this.el.style[t[4]]=t[5]),t[6]&&(this.el.style[t[6]]=t[7]),t[8]&&(this.el.style[t[8]]=t[9]),this},n.cssFloat=function(t){return parseFloat(this.css(t))},n.cssInt=function(t){return parseInt(this.css(t))},n.px=function(t,e){return this.css(t,e+"px")},n.rect=function(){return this.el.getBoundingClientRect()},n.bbox=function(){return this.el.getBBox()},n.isSVG=function(){return"SVG"===this.el.tagName.toUpperCase()},n.offsetRect=function(){if(this.isSVG()){var t=this.parent().rect(),e=this.rect();return{x:e.x-t.x,y:e.y-t.y,top:e.x-t.x,left:e.y-t.y,width:e.width,height:e.height}}return{x:this.el.offsetLeft,y:this.el.offsetTop,top:this.el.offsetTop,left:this.el.offsetLeft,width:this.el.offsetWidth,height:this.el.offsetHeight}},n.offset=function(){var e=this.rect(),n=t.getScrollTop(),i=t.getScrollLeft();return{top:e.top+n,left:e.left+i}},n.offsetLeft=function(){return this.offset().left},n.offsetTop=function(){return this.offset().top},n.position=function(){return this.el.style.top?{top:parseFloat(this.css("top")),left:parseFloat(this.css("left"))}:this.rect()},n.size=function(){return[this.width(),this.height()]},n.width=function(){return this.el.offsetWidth||this.rect().width},n.contentWidth=function(){return this.width()-this.cssFloat("padding-left")-this.cssFloat("padding-right")},n.height=function(){return this.el.offsetHeight||this.rect().height},n.contentHeight=function(){return this.height()-this.cssFloat("padding-top")-this.cssFloat("padding-bottom")},n.val=function(e){if(void 0===e)return this.el.value;if(void 0!==e){var n=e;e instanceof t&&(n=e.val()),this.el.value=n}return this},n.matches=function(t){return this.el&&this.el.matches?this.el.matches(t)?this:this.parent().matches(t):null},n.realVal=function(){switch(this.el.nodeType){case"INPUT":var t=this.attr("type");if("checkbox"==t||"radio"==t)return this.checked();case"SELECT":case"TEXTAREA":return this.el.value}return""},n.int=function(){return parseInt(this.val(),10)},n.float=function(){return parseFloat(this.val())},n.show=function(t){return void 0===t&&(t="block"),this.el.style.display="none"!=t?t:"block",this},n.hide=function(){return this.el.style.display="none",this},n.isHide=function(){return"none"===this.el.style.display},n.isShow=function(){return!this.isHide()},n.toggle=function(t){var e=this.isHide();return 1==arguments.length?t?this.show():this.hide():e?this.show():this.hide()},n.scrollIntoView=function(){this.el.scrollIntoView()},n.addScrollLeft=function(t){return this.el.scrollLeft+=t,this},n.addScrollTop=function(t){return this.el.scrollTop+=t,this},n.setScrollTop=function(t){return this.el.scrollTop=t,this},n.setScrollLeft=function(t){return this.el.scrollLeft=t,this},n.scrollTop=function(){return this.el===document.body?t.getScrollTop():this.el.scrollTop},n.scrollLeft=function(){return this.el===document.body?t.getScrollLeft():this.el.scrollLeft},n.scrollHeight=function(){return this.el.scrollHeight},n.scrollWidth=function(){return this.el.scrollWidth},n.on=function(t,e,n,i){return this.el.addEventListener(t,e,n,i),this},n.off=function(t,e){return this.el.removeEventListener(t,e),this},n.getElement=function(){return this.el},n.createChild=function(e,n,i,r){void 0===n&&(n=""),void 0===i&&(i={}),void 0===r&&(r={});var o=t.create(e,n,i);return o.css(r),this.append(o),o},n.children=function(){var e=this.el.firstElementChild;if(!e)return[];var n=[];do{n.push(t.create(e)),e=e.nextElementSibling}while(e);return n},n.childLength=function(){return this.el.children.length},n.replace=function(t){return this.el.parentNode&&this.el.parentNode.replaceChild(t.el||t,this.el),this},n.replaceChild=function(t,e){return this.el.replaceChild(e.el||e,t.el||t),this},n.checked=function(t){return void 0===t&&(t=!1),0==arguments.length?!!this.el.checked:(this.el.checked=!!t,this)},n.click=function(){return this.el.click(),this},n.focus=function(){return this.el.focus(),this},n.select=function(){if("true"===this.attr("contenteditable")){var t=document.createRange();t.selectNodeContents(this.el);var e=window.getSelection();e.removeAllRanges(),e.addRange(t)}else this.el.select();return this},n.blur=function(){return this.el.blur(),this},n.context=function(t){return void 0===t&&(t="2d"),this._initContext||(this._initContext=this.el.getContext(t)),this._initContext},n.resize=function(t){var e=t.width,n=t.height;this._initContext=null;var i=this.context(),r=window.devicePixelRatio||1;this.px("width",+e),this.px("height",+n),this.el.width=e*r,this.el.height=n*r,i.scale(r,r)},n.toDataURL=function(t,e){return void 0===t&&(t="image/png"),void 0===e&&(e=1),this.el.toDataURL(t,e)},n.clear=function(){this.context().clearRect(0,0,this.el.width,this.el.height)},n.update=function(t){this.clear(),t.call(this,this)},n.drawImage=function(t,e,n){void 0===e&&(e=0),void 0===n&&(n=0);var i=this.context(),r=window.devicePixelRatio||1;i.drawImage(t,e,n,t.width,t.height,0,0,this.el.width/r,this.el.height/r)},n.drawOption=function(t){void 0===t&&(t={});var e=this.context();Object.assign(e,t)},n.drawLine=function(t,e,n,i){var r=this.context();r.beginPath(),r.moveTo(t,e),r.lineTo(n,i),r.stroke(),r.closePath()},n.drawPath=function(){var t=this.context();t.beginPath(),[].slice.call(arguments).forEach(function(e,n){0==n?t.moveTo(e[0],e[1]):t.lineTo(e[0],e[1])}),t.stroke(),t.fill(),t.closePath()},n.drawCircle=function(t,e,n){var i=this.context();i.beginPath(),i.arc(t,e,n,0,2*Math.PI),i.stroke(),i.fill()},n.drawText=function(t,e,n){this.context().fillText(n,t,e)},e(t,[{key:"value",get:function(){return this.el.value}},{key:"naturalWidth",get:function(){return this.el.naturalWidth}},{key:"naturalHeight",get:function(){return this.el.naturalHeight}},{key:"files",get:function(){return this.el.files?[].concat(this.el.files):[]}},{key:"totalLength",get:function(){return this.el.getTotalLength()}},{key:"firstChild",get:function(){return t.create(this.el.firstElementChild)}}]),t}(),oe=function(){return!0};function se(t,e){if(void 0===e&&(e=0),0===e)return t;var n=void 0;return function(i,r,o,s,a){n&&clearTimeout(n),n=setTimeout(function(){t(i,r,o,s,a)},e||300)}}function ae(t,e){var n=void 0;return function(i,r,o,s,a){n||(n=setTimeout(function(){t(i,r,o,s,a),n=null},e||300))}}function le(t,e){Object.keys(t).forEach(function(n,i){e(n,t[n],i)})}function ce(t){return!1===function(t){return null==t}(t)}function ue(t){return"string"==typeof t}function he(t){return"function"==typeof t}var fe,de,pe=/\<(\w*)([^\>]*)\/\>/gim,ve=((ie={image:!0,input:!0,br:!0,path:!0,line:!0,circle:!0,rect:!0}).path=!0,ie.polygon=!0,ie.polyline=!0,ie.use=!0,ie),ge=function(t){var e=arguments,n=t.map(function(t,n){var i=[].slice.call(e,1)[n]||"";return he(i)&&console.log(i),Array.isArray(i)||(i=[i]),t+i.join("")}).join("");return n.replace(pe,function(t,e){return ve[e.toLowerCase()]?t:t.replace("/>","></"+e+">")})},me=function(t,e){var n=t.filter(function(t){return t.indexOf(e+"(")>-1}),i=n.map(function(t){var n=t.split(e+"(")[1].split(")")[0].trim().split(" ");return{target:n[0],param:n[1]}});return[n,i]},ye=function(){function t(t,e){void 0===e&&(e={}),this.context=t,this.options=e}var e=t.prototype;return e.initialize=function(){},e.load=function(){},e.refresh=function(){},e.render=function(){},e.getRef=function(t){return this.context.getRef(t)},e.run=function(){},e.destroy=function(){},t}(),Ee={touchstart:!0,touchmove:!0,mousedown:!0,mouseup:!0,mousemove:!0},be={doubletab:"touchend"},Te={doubletab:!0},Ce=function(t){function e(){return t.apply(this,arguments)||this}i(e,t);var n=e.prototype;return n.initialize=function(){var t=this;this.destroy(),this._domEvents||(this._domEvents=this.context.filterProps(l)),this._domEvents.forEach(function(e){return t.parseDomEvent(e)})},n.destroy=function(){this.removeEventAll()},n.removeEventAll=function(){var t=this;this.getBindings().forEach(function(e){t.removeDomEvent(e)}),this.initBindings()},n.removeDomEvent=function(t){Yt.removeDomEvent(t.dom,t.eventName,t.callback)},n.getBindings=function(){return this._bindings||this.initBindings(),this._bindings},n.addBinding=function(t){this.getBindings().push(t)},n.initBindings=function(){this._bindings=[]},n.matchPath=function(t,e){return t?t.matches(e)?t:this.matchPath(t.parentElement,e):null},n.hasDelegate=function(t,e){return this.matchPath(t.target||t.srcElement,e.delegate)},n.makeCallback=function(t,e){return t.delegate?this.makeDelegateCallback(t,e):this.makeDefaultCallback(t,e)},n.makeDefaultCallback=function(t,e){var n=this;return function(i){var r=n.runEventCallback(i,t,e);if(ce(r))return r}},n.makeDelegateCallback=function(t,e){var n=this;return function(i){var r=n.hasDelegate(i,t);if(r){i.$dt=re.create(r);var o=n.runEventCallback(i,t,e);if(ce(o))return o}}},n.runEventCallback=function(t,e,n){var i=this.context;if(t.xy=Yt.posXY(t),e.beforeMethods.length&&e.beforeMethods.every(function(e){return i[e.target].call(i,t,e.param)}),this.checkEventType(t,e)){var r=n(t,t.$dt,t.xy);return!1!==r&&e.afterMethods.length&&e.afterMethods.forEach(function(e){return i[e.target].call(i,t,e.param)}),r}},n.checkEventType=function(t,e){var n=this.context,i=!0;e.codes.length&&(i=!!t.code&&e.codes.indexOf(t.code.toLowerCase())>-1||!!t.key&&e.codes.indexOf(t.key.toLowerCase())>-1);var r=!0;return e.checkMethodList.length&&(r=e.checkMethodList.every(function(e){var i=n[e];return he(i)&&i?i.call(n,t):!ce(i)||!!i})),i&&r},n.getDefaultDomElement=function(t){var e,n=this.context;return(e=t?n.refs[t]||n[t]||window[t]:n.el||n.$el||n.$root)instanceof re?e.getElement():e},n.getRealEventName=function(t){return be[t]||t},n.getCustomEventName=function(t){return Te[t]?t:""},n.getDefaultEventObject=function(t,e){var n=this.context,i=e,r=i.filter(function(t){return!!n[t]}),o=me(i,"after"),s=o[0],a=o[1],l=me(i,"before"),c=l[0],u=l[1],h=me(i,"debounce"),f=h[0],d=h[1],p=me(i,"delay"),v=p[0],g=p[1],m=me(i,"throttle"),y=m[0],E=m[1],b=me(i,"capture")[0],T=[].concat(r,s,c,v,f,y,b),C=i.filter(function(t){return-1===T.indexOf(t)}).map(function(t){return t.toLowerCase()});return{eventName:this.getRealEventName(t),customEventName:this.getCustomEventName(t),codes:C,captures:b,afterMethods:a,beforeMethods:u,delayMethods:g,debounceMethods:d,throttleMethods:E,checkMethodList:r}},n.addDomEvent=function(t,e){t.callback=this.makeCallback(t,e),this.addBinding(t);var n=!!t.captures.length;Ee[t.eventName]&&(n={passive:!0,capture:n}),Yt.addDomEvent(t.dom,t.eventName,t.callback,n)},n.makeCustomEventCallback=function(t,e){var n=this;if("doubletab"===t.customEventName){var i=300;return t.delayMethods.length&&(i=+t.delayMethods[0].target),function(){n.doubleTab?(performance.now()-n.doubleTab.time<i&&e.apply(void 0,[].slice.call(arguments)),n.doubleTab=null):n.doubleTab={time:performance.now()}}}return e},n.bindingDomEvent=function(t,e,n){var i=t[0],r=t[1],o=t.slice(2),s=this.getDefaultEventObject(i,e);s.dom=this.getDefaultDomElement(r),s.delegate=o.join(" "),s.debounceMethods.length?n=se(n,+s.debounceMethods[0].target):s.throttleMethods.length&&(n=ae(n,+s.throttleMethods[0].target)),n=this.makeCustomEventCallback(s,n),this.addDomEvent(s,n)},n.getEventNames=function(t){var e=[];return t.split(":").forEach(function(t){var n=t.split(":");e.push.apply(e,n)}),e},n.parseDomEvent=function(t){for(var e=this.context,n=t.split(f).map(function(t){return t.trim()}).filter(Boolean),i=n.shift().split("@magic:domevent ")[1].split(" "),r=this.getEventNames(i[0]),o=e[t].bind(e),s=0,a=r.length;s<a;s++)i[0]=r[s],this.bindingDomEvent(i,n,o)},e}(ye),Ae=function(t,e,n){if("cssText"!==e)if("style"!==e)if("class"!==e)"callback"!==e||"function"!=typeof n?void 0===n?t.removeAttr(e):"TEXTAREA"===t.el.nodeName&&"value"===e||"text"===e||"textContent"===e?t.text(n):"innerHTML"===e||"html"===e?t.html(n):"htmlDiff"===e?t.updateDiff(n):"svgDiff"===e?t.updateSVGDiff(n):"value"===e?t.val(n):t.attr(e,n):n();else if(Array.isArray(n))t.addClass.apply(t,n.filter(Boolean));else if(function(t){return"object"==typeof t&&!Array.isArray(t)&&!function(t){return"number"==typeof t}(t)&&!ue(t)&&null!==t}(n))for(var i=Object.keys(n),r=0,o=i.length;r<o;r++){var s=i[r];t.toggleClass(s,n[s])}else t.el.className=n;else"string"!=typeof n&&t.css(n);else t.cssText(n)},Oe=function(t){function e(){return t.apply(this,arguments)||this}i(e,t);var n=e.prototype;return n.load=function(){this.bindData.apply(this,[].slice.call(arguments))},n.bindData=function(){var t=this,e=[].slice.call(arguments);this._bindMethods||(this._bindMethods=this.context.filterProps(u));var n=this._bindMethods.filter(function(t){if(!e.length)return!0;var n=t.split(f)[0].split(" ");return e.indexOf(n[1])>-1});n.forEach(function(n){try{var i=t.context[n],r=n.split(f);n=r[0];var o=t.getRef(r[1]),s=zt;""!=o&&"string"==typeof o?s=Wt(o):"function"==typeof o&&(s=o);var a=n.split("@magic:bind ")[1],l=t.context.refs[a],c="function"==typeof s&&s.call(t.context);return Promise.resolve(function(){if(l&&c)return Promise.resolve(i.call.apply(i,[t.context].concat(e))).then(function(t){if(t)for(var e=Object.keys(t),n=0,i=e.length;n<i;n++){var r=e[n];Ae(l,r,t[r])}})}())}catch(t){return Promise.reject(t)}})},n.destroy=function(){this._bindMethods=void 0},e}(ye),Ne=new Map,Se=/[xy]/g;function xe(){var t=(new Date).getTime();return"xxx12-xx-34xx".replace(Se,function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"==e?n:3&n|8).toString(16)})}function Re(){var t=(new Date).getTime();return"idxxxxxxx".replace(Se,function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"==e?n:3&n|8).toString(16)})}var Me=re.create("div"),ke=function(){function t(t,e){this.state={},this.prevState={},this.refs={},this.children={},this._bindings=[],this.id=xe(),this.__tempVariables=new Map,this.handlers=this.initializeHandler(),this.initializeProperty(t,e),this.initComponents()}var e=t.prototype;return e.initializeProperty=function(t,e){void 0===e&&(e={}),this.opt=t||{},this.parent=this.opt,this.props=e,this.source=xe(),this.sourceName=this.constructor.name},e.initComponents=function(){this.childComponents=this.components()},e.initializeHandler=function(){return[new Oe(this),new Ce(this)]},e.initState=function(){return{}},e.setState=function(t,e){void 0===t&&(t={}),void 0===e&&(e=!0),this.prevState=this.state,this.state=Object.assign({},this.state,t),e&&this.load()},e.toggleState=function(t,e){var n;void 0===e&&(e=!0),this.setState(((n={})[t]=!this.state[t],n),e)},e.variable=function(t){var e="__ref__variable:"+Re();return this.__tempVariables.set(e,t),e},e.recoverVariable=function(t){if(!1===ue(t))return t;var e=t;return this.__tempVariables.has(t)&&(e=this.__tempVariables.get(t),this.__tempVariables.delete(t)),e},e._reload=function(t){this.props=t,this.state={},this.setState(this.initState(),!1),this.refresh(!0)},e.render=function(t){this.$el=this.parseTemplate(ge(fe||(fe=o(["\n        ","\n      "])),this.template())),this.refs.$el=this.$el,t&&t.append(this.$el),this.load(),this.afterRender()},e.initialize=function(){this.state=this.initState()},e.afterRender=function(){},e.components=function(){return{}},e.getRef=function(){var t=[].slice.call(arguments).join("");return this.refs[t]},e.parseTemplate=function(t,e){Array.isArray(t)&&(t=t.join("")),t=t.trim();for(var n=Me.html(t).children(),i=0,r=n.length;i<r;i++){var o=n[i],s=o.attr("ref");s&&(this.refs[s]=o);for(var a=o.$$("[ref]"),l={},c=0,u=a.length;c<u;c++){var h=a[c],f=h.attr("ref");l[f]?console.warn(s+" is duplicated. - "+this.sourceName,this):l[f]=!0,this.refs[f]=h}}return!e&&n.length?n[0]:re.create(Me.createChildrenFragment())},e.parseProperty=function(t){for(var e,i={},r=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}(t))){n&&(t=n);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(t.el.attributes);!(e=r()).done;){var o=e.value;i[o.nodeName]=this.recoverVariable(o.nodeValue)}return i.props&&(i=n({},i,Gt(i.props))),t.$$("property").forEach(function(t){var e=t.attrs("name","value","valueType"),n=e[0],r=e[2],o=e[1]||t.text();"json"===r&&(o=JSON.parse(o)),i[n]=o}),i},e.parseSourceName=function(t){return t.parent?[t.sourceName].concat(this.parseSourceName(t.parent)):[t.sourceName]},e.getEventMachineComponent=function(t){return Ne.get(t)||this.childComponents[t]},e.parseComponent=function(){var t=this;this.$el.$$("[refclass]").forEach(function(e){var n=t.getEventMachineComponent(e.attr("refclass"));if(n){var i,r=t.parseProperty(e),o=e.attr("ref"),s=null;t.children[o]?(s=t.children[o])._reload(r):(s=new n(t,r),t.children[o||s.id]=s,s.render()),s.renderTarget?(null==(i=s.$el)||i.appendTo(s.renderTarget),e.remove()):e.replace(s.$el)}else e.remove()}),le(this.children,function(e,n){n&&n.clean()&&delete t.children[e]})},e.clean=function(){if(this.$el&&!this.$el.hasParent())return le(this.children,function(t,e){e.clean()}),this.destroy(),this.$el=null,!0},e.refresh=function(){this.load()},e._afterLoad=function(){this.runHandlers("initialize"),this.bindData(),this.parseComponent()},e.load=function(){try{var t=arguments,e=this,n=[].slice.call(t);e._loadMethods||(e._loadMethods=e.filterProps(c));var i=e._loadMethods.filter(function(t){var e=t.split("@magic:load ")[1].split(f).map(function(t){return t.trim()})[0];return!n.length||n.indexOf(e)>-1});return Promise.resolve(i.forEach(function(t){try{var i=t.split("@magic:load ")[1].split(f).map(function(t){return t.trim()}),r=i[0],s=i.slice(1);s=s.map(function(t){return t.trim()});var a=Boolean(s.filter(function(t){return $.includes(t)}).length),l=function(){var i;if(e.refs[r])return Promise.resolve((i=e[t]).call.apply(i,[e].concat(n))).then(function(t){Array.isArray(t)&&(t=t.join(""));var n=e.parseTemplate(ge(de||(de=o(["",""])),t),!0);a?e.refs[r].htmlDiff(n):e.refs[r].html(n)})}();return Promise.resolve(l&&l.then?l.then(function(){}):void 0)}catch(t){return Promise.reject(t)}})).then(function(){e._afterLoad()})}catch(t){return Promise.reject(t)}},e.runHandlers=function(t){var e=arguments;void 0===t&&(t="run"),this.handlers.forEach(function(n){return n[t].apply(n,[].slice.call(e,1))})},e.bindData=function(){this.runHandlers.apply(this,["load"].concat([].slice.call(arguments)))},e.template=function(){return null},e.eachChildren=function(t){he(t)&&le(this.children,function(e,n){t(n)})},e.rerender=function(){var t=this.$el.parent();this.destroy(),this.render(t)},e.destroy=function(){this.eachChildren(function(t){t.destroy()}),this.runHandlers("destroy"),this.$el&&this.$el.remove(),this.$el=null,this.refs={},this.children={}},e.collectProps=function(){return this.__cachedMethodList||(this.__cachedMethodList=function(t,e){void 0===e&&(e=oe);var n=t,i=[];do{if(0==n instanceof Object)break;var r=Object.getOwnPropertyNames(n).filter(function(n){return t&&he(t[n])&&e(n)});i.push.apply(i,r)}while(n=Object.getPrototypeOf(n));return i}(this,function(t){return 0===t.indexOf("@magic:")})),this.__cachedMethodList},e.filterProps=function(t){return this.collectProps().filter(function(e){return e.match(t)})},e.self=function(t){return t&&t.$dt&&t.$dt.is(t.target)},e.isAltKey=function(t){return t.altKey},e.isCtrlKey=function(t){return t.ctrlKey},e.isShiftKey=function(t){return t.shiftKey},e.isMetaKey=function(t){return t.metaKey||"Meta"==t.key||t.code.indexOf("Meta")>-1},e.isMouseLeftButton=function(t){return 1===t.buttons},e.isMouseRightButton=function(t){return 2===t.buttons},e.hasMouse=function(t){return"mouse"===t.pointerType},e.hasTouch=function(t){return"touch"===t.pointerType},e.hasPen=function(t){return"pen"===t.pointerType},e.preventDefault=function(t){return t.preventDefault(),!0},e.stopPropagation=function(t){return t.stopPropagation(),!0},t}(),_e=function(){function t(t){this.cachedCallback={},this.callbacks={},this.commandes=[],this.editor=t}var e=t.prototype;return e.getCallbacks=function(t){return this.callbacks[t]||(this.callbacks[t]=[]),this.callbacks[t]},e.setCallbacks=function(t,e){void 0===e&&(e=[]),this.callbacks[t]=e},e.debug=function(){var t;this.editor&&this.editor.config.get("debug")&&(t=console).debug.apply(t,[].slice.call(arguments))},e.on=function(t,e,n,i,r,o,s,a){var l=this;void 0===i&&(i=0),void 0===r&&(r=0),void 0===o&&(o=!1),void 0===s&&(s=!1),void 0===a&&(a=[]);var c=e;return i>0?c=se(e,i):r>0&&(c=ae(e,r)),a.length&&(c=function(t,e,n){return function(){var i=[].slice.call(arguments);n.every(function(t){return e[t.target].apply(e,i)})&&t.apply(e,i)}}(c,n,a)),this.getCallbacks(t).push({event:t,callback:c,context:n,originalCallback:e,enableAllTrigger:o,enableSelfTrigger:s}),this.debug("add message event",t,n.sourceName),function(){l.off(t,e)}},e.off=function(t,e){this.debug("off message event",t),1==arguments.length?this.setCallbacks(t):2==arguments.length&&this.setCallbacks(t,this.getCallbacks(t).filter(function(t){return t.originalCallback!==e}))},e.offAll=function(t){var e=this;Object.keys(this.callbacks).forEach(function(n){e.setCallbacks(n,e.getCallbacks(n).filter(function(e){return e.context!==t}))}),this.debug("off all message",t.sourceName)},e.getCachedCallbacks=function(t){return this.getCallbacks(t)},e.sendMessage=function(t,e){var n=arguments,i=this;Promise.resolve().then(function(){var r=i.getCachedCallbacks(e);if(r)for(var o=0,s=r.length;o<s;o++){var a=r[o];a.enableSelfTrigger||(a.enableAllTrigger||a.originalCallback.source!==t)&&a.callback.apply(a.context,[].slice.call(n,2))}})},e.nextSendMessage=function(t,e){var n=arguments;Promise.resolve().then(function(){e.apply(void 0,[].slice.call(n,2))})},e.triggerMessage=function(t,e){var n=arguments,i=this;Promise.resolve().then(function(){var r=i.getCachedCallbacks(e);if(r)for(var o=0,s=r.length;o<s;o++){var a=r[o];a.originalCallback.source===t&&a.callback.apply(a.context,[].slice.call(n,2))}else console.warn(e," is not valid event")})},e.emit=function(t){var e=[].slice.call(arguments,1);he(t)?t.apply(void 0,e):this.sendMessage.apply(this,[this.source,t].concat(e))},e.nextTick=function(t){this.nextSendMessage(this.source,t)},e.trigger=function(t){var e=[].slice.call(arguments,1);he(t)?t.apply(void 0,e):this.triggerMessage.apply(this,[this.source,t].concat(e))},t}(),De=n({start:function(t,e){void 0===e&&(e={});var i=re.create(e.container||document.body),r=new t(e,n({},e,{store:e.store||new _e}));return r.render(i),r},UIElement:function(t){function n(e,n){var i;return void 0===n&&(n={}),(i=t.call(this,e,n)||this).__UID=new Set,n.store&&(i.__storeInstance=n.store),i.created(),i.initialize(),i.initializeStoreEvent(),i}i(n,t);var r=n.prototype;return r.setStore=function(t){this.__storeInstance=t},r.created=function(){},r.getRealEventName=function(t,e){void 0===e&&(e=MULTI_PREFIX);var n=t.indexOf(e);return t.substr(n<0?0:n+e.length)},r.splitMethod=function(t,e,n){void 0===n&&(n=0);var i=me(t,e),r=i[0],o=i[1];return[r.length?+o[0].target:n,r,o]},r.createLocalCallback=function(t,e){var n=e.bind(this);return n.displayName=this.sourceName+"."+t,n.source=this.source,n},r.initializeStoreEvent=function(){var t=this;this.filterProps(h).forEach(function(e){var n=t.getRealEventName(e,"@magic:subscribe "),i=n.split(f).slice(1),r=i.map(function(t){return t.trim()}).filter(function(e){return t[e]}).map(function(t){return{target:t}}),o=t.splitMethod(i,"debounce"),s=o[0],a=o[1],l=t.splitMethod(i,"throttle"),c=l[0],u=l[1],h=t.splitMethod(i,"allTrigger")[1],d=t.splitMethod(i,"selfTrigger")[1];n.split(f).filter(function(t){return-1===r.indexOf(t)&&-1===a.indexOf(t)&&-1===h.indexOf(t)&&-1===d.indexOf(t)&&-1===u.indexOf(t)}).map(function(t){return t.trim()}).filter(Boolean).forEach(function(n){if(he(t[e])){var i=t.createLocalCallback(n,t[e]);t.$store.on(n,i,t,s,c,h.length,d.length,r)}})})},r.destoryStoreSUBSCRIBE=function(){this.$store.offAll(this)},r.destroy=function(){t.prototype.destroy.call(this),this.destoryStoreSUBSCRIBE()},r.rerender=function(){t.prototype.rerender.call(this),this.initialize(),this.initializeStoreEvent()},r.emit=function(t){var e;this.$store.source=this.source,this.$store.sourceContext=this,(e=this.$store).emit.apply(e,[t].concat([].slice.call(arguments,1)))},r.nextTick=function(t){this.$store.nextTick(t)},r.trigger=function(t){var e;this.$store.source=this.source,(e=this.$store).trigger.apply(e,[t].concat([].slice.call(arguments,1)))},r.broadcast=function(t){var e=arguments,n=this;Object.keys(this.children).forEach(function(i){var r;(r=n.children[i]).trigger.apply(r,[t].concat([].slice.call(e,1)))})},r.on=function(t,e){this.$store.on(t,e)},r.off=function(t,e){this.$store.off(t,e)},r.subscribe=function(t,e,n){void 0===e&&(e=0),void 0===n&&(n=0);var i="subscribe."+Re(),r=this.createLocalCallback(i,t);return this.$store.on(i,r,this,e,n,!1,!0),i},e(n,[{key:"$store",get:function(){return this.__storeInstance||this.parent.$store}}]),n}(ke),BaseStore:_e,Dom:re},qt,{registElement:function(t){void 0===t&&(t={}),Object.keys(t).forEach(function(e){Ne.has(e)||Ne.set(e,t[e])})}});module.exports=De;
//# sourceMappingURL=sapa.cjs.map
