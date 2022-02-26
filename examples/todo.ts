import { UIElement } from '../src/UIElement';
import { CLICK, ENTER, KEYDOWN, LOAD, SUBSCRIBE_SELF, PREVENT, DEBOUNCE, BIND } from '../src/Event';

export class Todo extends UIElement {

    initState() {
        return {
            list: [
                { id: 1, text: 'Learn React' },
            ]
        }
    }

    template() {
        return /*html*/`
        <div class='todo'>
            <div class="input-group">
                <input type="text" ref="$input" class="form-control" placeholder="Add new todo">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button">Add</button>
                </span>
            </div>
            <div class="list" ref="$list"></div>
        </div>
        `
    }

    [KEYDOWN('$input') + ENTER + PREVENT] () {
        this.trigger('updateList')
    }

    [CLICK('$el button')] () {
        this.trigger('updateList')
    }

    [SUBSCRIBE_SELF('updateList', 'changeList') + DEBOUNCE(100)] () {
        let text = this.refs.$input.value
        if (text) {
            this.refs.$input.val('');
        }
        this.setState({
            list: [...this.state.list, { id: this.state.list.length + 1, text }]
        })

        setTimeout(() => {
            this.refs.$input.focus();
        }, 100)
    }

    [LOAD('$list')] () {
        return this.state.list.map(item => {
            return /*html*/`<div class="item" data-id="${item.id}">${item.text}</div>`
        })
    }

    [BIND('$list')] () {
        return {
            style: {
                'background-color': 'blue',
                color: 'white'
            }

        }
    }

}