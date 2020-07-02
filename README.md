# sapa

sapa is a simple library to make JS Application. 

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
<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/@easylogic/sapa@0.0.4/dist/sapa.js'></script>
<script type='text/javacript'>
    const {App, CLICK, UIElement} = sapa;   // or window.sapa 
</script>

```

# View examples 

```
npm run dev 
open localhost:8080/examples/first.html
```


# Core System Design 



## Start a application 

```js
App.start({
    components: {A},
    template: `
        <A />
    `,
    container: document.getElementById('sample') // default value is document.body
})
```

The `start` method defines the point in time of the first run. Apply the template to the location specified by container.



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


### ref  

When the DOM is created, the DOM with the ref attribute is managed as a variable that can be used in advance.

```js
template () {
    return `<div><span ref='$text'></span></div>`
}
[CLICK('$text')]  (e) { 
    console.log(this.refs.$text.html())
}
```

You can apply CLICK events to the `$text` DOM object.

### LOAD 

`LOAD` can define the part that changed frequently.

```js
template () {
    return `
        <div>
            <div ref='$list'></div>
        </div>
    `
}

[LOAD('$list')] () {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return arr.map(value => `<div class='item'>${value}</div>`)
}

refresh( ) {
    this.load();
}
```

### BIND 

`BIND` are used to change the attributes and style of a particular element. That is, it does not create the DOM itself.

```js
template () {
    return `
        <div>
            <div ref='$list'></div>
        </div>
    `
}

[BIND('$list')] () {
    return {
        'data-length': arr.length,
        style: {
            overflow: 'hidden'
        }
    }
}

refresh( ) {
    this.load();
}
```

The final output after `BIND` is as follows.

```html
<div ref='$list' data-value='0' style='overflow:hidden'></div>
```

## Run separately

`LOAD` and `BIND` can be executed separately.

```js
this.load('$list')
this.bindData('$list');
```

## Life Cycle 

sapa has a life cycle. 

```js
UIElement ->
    created()
    initialize() -> 
        initState()
    load()
    render -> 
        template() 
        get `ref` attribute 
        parseComponent() -> 
            create child component -> 
    initializeEvent()
    afterRender()
```

| Method | Override | Description |
| --- | --- | --- |
| created | O | When the UIElement is created  |
| initialize | O | It is the same as `created` but it is used when creating initial data. |
| initState | O | Methods to initialize state  |
| template | O | Generate html at render time |
| afterRender | O | When the DOM is applied to the actual browser, the element can be accessed from outside |

## Method Based DOM Event Handler 

sapa sets the DOM Event in a unique way. sapa take full advantage of the fact that javascript's methods are strings.

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

`[CLICK()]` is basically the same as `CLICK('$el')`. Sets `$el`'s click event automatically.

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

```
POINTERSTART is a defined name. Two events are actually specified, namely `mousedown` and `touchstart`.
```

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

`e.$delegateTarget` points to the element where the actual event occurred.


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

sapa has a simple event system for sending messages between objects.

This also uses `method` string, just like specifying a DOM event.

### EVENT 

EVENT allows you to receive emit messages from elsewhere. 

Provides a callback to send and receive messages even if they are not connected.


```js

class A extends UIElement {
    [EVENT('setLocale')] (locale) {
        console.log(locale);
    }
}

class B extends UIElement {
    template () {
        return `<button type="button">Click</button>`
    }

    [CLICK()] () {
        this.emit('setLocale', 'ko')
    }
}

App.start({
    components : {
        A, B
    },
    template : `
        <div>
            <A />
            <B />
        </div>
    `
})

```

### emit

`emit` is a method that delivers a message to an object other than itself.


```js
[CLICK()] () {
    this.emit('setLocale', 'ko')
}
```
why does not it send to its element?

The reason for not sending to itself is that there is a possibility that the event can run infinitely. Once I send the message, I can not come back to me.

### multiple EVENT 

EVENT can define several at the same time.

```js

[EVENT('a', 'b', 'c')] () {
    // 
}

// this.emit('a')
// this.emit('b')
// this.emit('c')

```

### DEBOUNCE 

You can also slow down the execution time of a message.

```js

[EVENT('a') + DEBOUNCE(100)] () {

}

```

### trigger 

The trigger method allows you to execute an event defined on the object itself. Messages sent by trigger are not propagated elsewhere.
 
```js
this.trigger('setLocale', 'en')  // setLocale message is run only on self instance 
```

If you want to send a message only to the parent object, you can do the following:

```js
this.parent.trigger('setLocale', 'en'); 
```

# Simple example 

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

