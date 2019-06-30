# sa-pa

sa-pa a simple library to make JS Application. 

# Install 

`
npm install @easylogic/sapa
`

# How to use in es6 

```js
import {App, UIElement, CLICK} from 'sapa'

```

# How to use in browser 

```html
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

`template()` 메소드를 통해서 MyElement의 실질적인 HTML 문자열을 지정합니다. 


UIElement 는 형식상 다른 UIElement 에 포함 될 수 있습니다.

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

SecondElement 가 생성 될 때 내부적으로 MyElement 를 생성해줍니다. 이때 MyElement 의 parent  속성은 SecondElement 의 instance 가 됩니다. 

### access dom element 

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

sa-pa 는 DOM Event 를 조금은 독특한 방식으로 셋팅합니다. javascript 의 메소드가 문자열이다라는 사실을 적극 활용합니다. 

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

`[CLICK()]` 은 기본적으로 CLICK('$el') 와 같습니다. $el 의 click 이벤트를 자동으로 설정해줍니다. 

CLICK() 메소드는 내부적으로 문자열을 만드는데요. 최종 결과물은 아래와 같습니다. 

```js
'click $el' (e) { 
    // console.log(e);
}
```

적용할 수 이벤트는 아래와 같습니다. 

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

필요한 이벤트는 추가해서 정의하면 됩니다. 일반적인 DOM 이벤트가 정의 되어 있습니다. 

`
대문자로 되어 있는 POINTERSTART 는 임의로 정의된 이름이고 이것을 지정하면 실제로는 mousedow, touchstart 라는 2개의 이벤트가 지정이 됩니다. 
`

DOM 이벤트에는 $el 이외의 특수한 몇가지 element 를 지정할 수 있습니다. 

### ref  

```js
template () {
    return `<div><span ref='$text'></span></div>`
}
[CLICK('$text')]  (e) { }
```

### window, document 

```js
[RESIZE('window')] (e) { }
[POINTERSTART('document')] (e) { }
```

### delegate 

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



DOM 이벤트에는 몇가지 PIPE 기능들이 붙을 수 있습니다. 


### ALT

```js
[CLICK() + ALT]   
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

```js
[RESIZE('window') + DEBOUNCE(100)] (e) {}
```


## Method Based Messaging System 


# simple example 

This sample make a clickable element.

```js

import {App, UIElement, CLICK} from 'sa-pa'

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


# LICENSE: MIT 

