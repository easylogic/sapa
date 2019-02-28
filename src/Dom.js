import { isString, isUndefined, isNotString, keyEach, isNotUndefined } from "./func";


export class Dom {

    constructor (tag, className, attr) {
    
        if (isNotString(tag)) {
            this.el = tag;
        } else {
    
            var el  = document.createElement(tag);

            if (className) {
                el.className = className;
            }

            attr = attr || {};
    
            for(var k in attr) {
                el.setAttribute(k, attr[k]);
            }
    
            this.el = el;
        }
    }

    static getScrollTop () {
        return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
    }

    static getScrollLeft () {
        return Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft)
    }

    attr (key, value) {
        if (arguments.length == 1) {
            return this.el.getAttribute(key);
        }

        this.el.setAttribute(key, value);

        return this; 
    }

    attrs (...args) {
        return args.map(key => {
            return this.el.getAttribute(key);
        })
    }

    removeAttr (key) {
        this.el.removeAttribute(key);

        return this; 
    }

    is (checkElement) {
        return this.el === (checkElement.el || checkElement);
    }

    closest (cls) {
        
        var temp = this;
        var checkCls = false;
    
        while(!(checkCls = temp.hasClass(cls))) {
            if (temp.el.parentNode) {
                temp = new Dom(temp.el.parentNode);
            } else {
                return null;
            }
        }
    
        if (checkCls) {
            return temp;
        }
    
        return null;
    }

    parent () {
        return new Dom(this.el.parentNode);
    }
    
    removeClass (...args) {

        this.el.classList.remove(...args);

        return this; 
    }
    
    hasClass (cls) {
        if (!this.el.classList) return false;
        return this.el.classList.contains(cls);
    }
    
    addClass (...args) {
        this.el.classList.add(...args);

        return this; 
    
    }

    toggleClass (cls, isForce) {

        this.el.classList.toggle(cls, isForce);

        /*
        if (arguments.length == 2) {
            if (isForce) {
                this.addClass(cls)
            } else {
                this.removeClass(cls);
            }
        } else {
            if (this.hasClass(cls)) {
                this.removeClass(cls);
            } else {
                this.addClass(cls);
            }
        }
        */


    }
    
    html (html) {

        if (isUndefined(html)) {
            return this.el.innerHTML;
        }

        if (isString( html )) {
            this.el.innerHTML = html;
        } else {
            this.empty().append(html);
        }

        return this;
    }

    find (selector) {
        return this.el.querySelector(selector)
    } 

    $ (selector) {
        var node = this.find(selector);
        return node ? new Dom(node) : null; 
    }

    findAll (selector) { 
        return this.el.querySelectorAll(selector)
    } 

    $$ (selector) {
        return [...this.findAll(selector)].map(node => {
            return new Dom(node)
        })
    }

    
    empty () {
        return this.html('');
    }
    
    append (el) {
    
        if (isString( el )) {
            this.el.appendChild(document.createTextNode(el));
        } else {
            this.el.appendChild(el.el || el);
        }
    
        return this;
    }

    appendHTML (html) {
        var $dom = new Dom("div").html(html)

        this.append($dom.createChildrenFragment());
    }

    createChildrenFragment () {
        const list = this.children()
    
        var fragment = document.createDocumentFragment()
        list.forEach($el => fragment.appendChild($el.el))

        return fragment;
    }
    
    appendTo (target) {
        var t = target.el ? target.el : target;
    
        t.appendChild(this.el);
    
        return this;
    }
    
    remove () {
        if (this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }
    
        return this;
    }
    
    text (value) {
        if (isUndefined(value)) {
            return this.el.textContent;
        } else {

            var tempText = value; 

            if (value instanceof Dom) {
                tempText = value.text();
            } 
            
            this.el.textContent = tempText; 
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
    
    css (key, value) {
        if (isNotUndefined(key) && isNotUndefined(value)) {
            this.el.style[key] = value;
        } else if (isNotUndefined(key)) {
    
            if (isString( key )) {
                return getComputedStyle(this.el)[key];
            } else {
                var keys = key || {};

                keyEach(keys, (k, value) => {
                    this.el.style[k] = value;
                })
            }     
        }
    
        return this;
    }

    cssText (value) {
        if (isUndefined( value ))  {
            return this.el.style.cssText;
        }

        this.el.style.cssText = value;

        return this; 
    }

    cssArray (arr) {

        if (arr[0]) this.el.style[arr[0]] = arr[1]
        if (arr[2]) this.el.style[arr[2]] = arr[3]
        if (arr[4]) this.el.style[arr[4]] = arr[5]
        if (arr[6]) this.el.style[arr[6]] = arr[7]
        if (arr[8]) this.el.style[arr[8]] = arr[9]

        return this; 
    }

    cssFloat (key) {
        return parseFloat(this.css(key));
    }

    cssInt (key) {
        return parseInt(this.css(key));
    }

    px (key, value) {
        return this.css(key, value + 'px' )
    }

    rect () {
        return this.el.getBoundingClientRect()
    }
    
    offset () {
        var rect = this.rect();

        var scrollTop = Dom.getScrollTop()
        var scrollLeft = Dom.getScrollLeft()

        return { 
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        };
    }

    offsetLeft () {
        return this.offset().left; 
    }

    offsetTop () {
        return this.offset().top; 
    }
    
    position () {

        if (this.el.style.top) {
            return {
                top: parseFloat(this.css('top')),
                left: parseFloat(this.css('left'))
            };
        } else {
            return this.rect();
        }

    }

    size () {
        return [this.width(), this.height()]
    }
    
    width () {
        return this.el.offsetWidth || this.rect().width;
    }

    contentWidth() {
        return this.width() - this.cssFloat('padding-left') - this.cssFloat('padding-right');
    }
    
    height () {
        return this.el.offsetHeight || this.rect().height;
    }


    contentHeight() {
        return this.height() - this.cssFloat('padding-top') - this.cssFloat('padding-bottom');
    }
    
    val (value) {
        if (isUndefined(value)) {
            return this.el.value;
        } else if (isNotUndefined(value)) {

            var tempValue = value; 

            if (value instanceof Dom) {
                tempValue = value.val()
            }

            this.el.value = tempValue;
        }
    
        return this;
    }
    
    int () {
        return parseInt(this.val(), 10);
    }

    float () {
        return parseFloat(this.val());
    }
    
    show () {
        return this.css('display', 'block');
    }
    
    hide () {
        return this.css('display', 'none');
    }

    toggle (isForce) {

        var currentHide = this.css('display') == 'none'

        if (arguments.length == 1) {
            currentHide = isForce
        }

        if (currentHide) {
            return this.show();
        } else {
            return this.hide();
        }
    }

    setScrollTop (scrollTop) {
        this.el.scrollTop = scrollTop;
        return this;
    }

    setScrollLeft (scrollLeft) {
        this.el.scrollLeft = scrollLeft;
        return this; 
    }

    scrollTop () {
        if (this.el === document.body) {
            return Dom.getScrollTop()
        }

        return this.el.scrollTop
    } 

    scrollLeft () {
        if (this.el === document.body) {
            return Dom.getScrollLeft()
        }

        return this.el.scrollLeft
    }

    scrollHeight () {
        return this.el.scrollHeight; 
    }

    on (eventName, callback, opt1, opt2) {
        this.el.addEventListener(eventName, callback, opt1, opt2);

        return this; 
    }

    off (eventName, callback ) {
        this.el.removeEventListener(eventName, callback);

        return this; 
    }

    getElement ( ) {
        return this.el;
    }

    createChild (tag, className = '', attrs = {}, css = {}) {
        let $element = new Dom(tag, className, attrs);
        $element.css(css);

        this.append($element);

        return $element;
    }

    firstChild () {
        return new Dom(this.el.firstElementChild);
    }

    children () {
        var element = this.el.firstElementChild; 

        if (!element) {
            return [] 
        }

        var results = [] 

        do {
            results.push(new Dom(element));
            element = element.nextElementSibling;
        } while (element);

        return results; 
    }

    childLength () {
        return this.el.children.length;
    }

    replace (newElement) {

        this.el.parentNode.replaceChild(newElement.el || newElement, this.el);

        return this; 
    }

    checked (isChecked = false) {

        if (arguments.length == 0) {
            return !!this.el.checked; 
        }

        this.el.checked = !!isChecked;

        return this;
    }

    focus () {
        this.el.focus()

        return this; 
    }


    // canvas functions 

    context (contextType = '2d') {

        if (!this._initContext) {
            this._initContext = this.el.getContext(contextType)
        }

        return  this._initContext;
    }

    resize ({width, height}) {
        
        // support hi-dpi for retina display 
        this._initContext = null; 
        var ctx = this.context();
        var scale = window.devicePixelRatio || 1; 

        this.px('width', width)
        this.px('height', height)

        this.el.width = width * scale
        this.el.height = height * scale

        ctx.scale(scale, scale);
    }

    clear () {
        this.context().clearRect(0, 0, this.el.width, this.el.height);
    }

    update (callback) {
        this.clear()
        callback.call(this);
    }

    drawOption (option = {}) {
        var ctx = this.context();

        Object.assign(ctx, option);
    }

    drawLine (x1, y1, x2, y2) {
        var ctx = this.context();

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }

    drawPath (...path) {
        var ctx = this.context();

        ctx.beginPath();

        path.forEach((p, index) => {
            if (index == 0) {
                ctx.moveTo(p[0], p[1]);
            } else {
                ctx.lineTo(p[0], p[1]);
            }
        })
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    drawCircle (cx, cy, r) {
        var ctx = this.context();        
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    drawText (x, y, text) {
        this.context().fillText(text, x, y);
    }
}

