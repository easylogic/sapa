# sapa

sapa a simple library to make JS Application. 

# Install 

`
npm install @easylogic/sapa
`

# How to use in es6 

```js
import {App, UIElement, CLICK} from '@easylogic/sapa'

```

# How to use in browser 

```html
<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/@easylogic/sapa@0.0.2/dist/sapa.js'></script>
<script type='text/javacript'>
    const {App, CLICK, UIElement} = sapa;   // or window.sapa 
</script>

```

# Core System Design 

## DOM Based Class 

```js
class MyElement extends UIElement {
    template () {
        return `<div>my element</div>`
    }
}

```

Use the `template ()` method to specify the actual HTML string for MyElement.

A UIElement can be contained in other UIElement.

```js
class SecondElement extends UIElement {
    components () {
        return { MyElement }
    }
    template () {
        return `
        <div>
            <MyElement />
        </div>
        `
    }
}

```

It creates MyElement internally when SecondElement is created. At this time, the parent property of MyElement becomes the instance of SecondElement.


### Access DOM 

Use `this.$el`  

$el is jQuery-liked DOM wrapper object.

```js
class Test extends UIElement {
    template () { return '<div class="test-item"></div>' }

    [CLICK()] () {
        if (this.$el.hasClass('test-item')) {
            console.log('this element has .test-item')
        }
    }
}
```

## Method Based DOM Event Handler 

sapa sets the DOM Event in a somewhat unique way. sapa take full advantage of the fact that javascript's methods are strings.


```js

class Test extends UIElement {
    template() {
        return '<div>Text</div>'
    }

    [CLICK()] (e) {
        console.log(e);
    }
}
```


`[CLICK()]` is basically the same as `CLICK('$el')`. Sets $ el's click event automatically.

The `CLICK()` method internally creates a string. The final result is shown below.

```js
'click $el' (e) { 
    // console.log(e);
}
```

### Support DOM Event List 

```
CLICK = "click"
DOUBLECLICK = "dblclick"
MOUSEDOWN = "mousedown"
MOUSEUP = "mouseup"
MOUSEMOVE = "mousemove"
MOUSEOVER = "mouseover"
MOUSEOUT = "mouseout"
MOUSEENTER = "mouseenter"
MOUSELEAVE = "mouseleave"
TOUCHSTART = "touchstart"
TOUCHMOVE = "touchmove"
TOUCHEND = "touchend"
KEYDOWN = "keydown"
KEYUP = "keyup"
KEYPRESS = "keypress"
DRAG = "drag"
DRAGSTART = "dragstart"
DROP = "drop"
DRAGOVER = "dragover"
DRAGENTER = "dragenter"
DRAGLEAVE = "dragleave"
DRAGEXIT = "dragexit"
DRAGOUT = "dragout"
DRAGEND = "dragend"
CONTEXTMENU = "contextmenu"
CHANGE = "change"
INPUT = "input"
FOCUS = "focus"
FOCUSIN = "focusin"
FOCUSOUT = "focusout"
BLUR = "blur"
PASTE = "paste"
RESIZE = "resize"
SCROLL = "scroll"
SUBMIT = "submit"
POINTERSTART = "mousedown", "touchstart"
POINTERMOVE = "mousemove", "touchmove"
POINTEREND = "mouseup", "touchend"
CHANGEINPUT = "change", "input"
WHEEL = "wheel", "mousewheel", "DOMMouseScroll"
```

You can define any additional events you need. Common DOM events are defined.

You can set several DOM events at the same time.

`
POINTERSTART, which is in upper case, is a randomly defined name. When this is specified, two events are actually specified, namely mousedow and touchstart.
`

DOM events can have some special elements other than $ el.

### ref  

When the DOM is created, the DOM with the ref attribute is managed as a variable that can be used in advance.

```js
template () {
    return `<div><span ref='$text'></span></div>`
}
[CLICK('$text')]  (e) { }
```

You can apply CLICK events to the `$text` DOM object.


### window, document 

Global objects such as window and document can also apply events to their methods.

```js
[RESIZE('window')] (e) { }
[POINTERSTART('document')] (e) { }
```

### delegate 

Applying events to individual DOMs may be bad for performance. In that case, use delegate to handle it.


```js
template () {
    return `
    <div>
        <div class='list' ref='$list'>
            <div class='item'>Item</div>
        </div>
    </div>
    `
}

[CLICK('$list .item')] (e) {
    // this method will run after .item element is clicked
}
```

This is also possible the css selector.


```js
[CLICK('$list .item:not(.selected)')] (e) {
    // do event 
    console.log(e.$delegateTarget.html())
}
```
You can run the method only when you click on the `.item` that is not applied to the` .selected` class.

`e. $ delegateTarget` points to the element where the actual event occurred.


DOM events can have several PIPE functions.

PIPE is a concept that combines predefined functions in an event.

### ALT

The event will only work when Alt key is pressed.


```js
[CLICK() + ALT] (e) {
    // when alt key is pressed
}
```

In addition to ALT, you can use default key combinations such as CTRL, SHIFT, and META.

PIPE can be connected with `+` character.

```js
[CLICK() + ALT + CTRL] (e) {
    // when alt and control key are pressed 
}

```

### IF 

when checkTarget's result is true, this method is run

```js
checkTarget(e) {
    if (e.target.nodeType != 3) return false;
    return true; 
}
[CLICK() + IF('checkTarget')] (e) {}
```

### DEBOUNCE 

Some PIPEs can also use actual methods in other ways. A typical example is DEBOUNCE.

```js
[RESIZE('window') + DEBOUNCE(100)] (e) {}
```

TROTTLE is also available.

```js
[SCROLL('document') + TROTTLE(100)] (e) {}
```

## Method Based Messaging System 


# simple example 

This sample make a clickable element.

```js

import {App, UIElement, CLICK} from 'sapa'

class Test extends UIElement {
    template() {
        return '<div>Text</div>'
    }

    [CLICK()] (e) {
        console.log(e);
    }
}

App.start({
    components: { Test },
    template: `<Test />`
});

```

# How to build 

`
npm run build
`

# Projects 

* https://editor.easylogic.studio - CSS Editor
`


# LICENSE: MIT 

