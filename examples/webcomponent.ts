
import { CLICK, BIND } from '../src/Event';
import { UIElement } from '../src/UIElement';
import WebComponent from '../src/WebComponent';
class SampleWebComponent extends UIElement {

    static attributes = ['key', 'value']

    initState() {
        return {
            counter: 0
        }
    }

    template() {
        const { key = '', value = '' } = this.props;
        return /*html*/`<div style="user-select: none;background-color: ${key === 'color' ? value : ''}">web component test ${key} : ${value} <span ref="$counter"></span></div>`
    }

    [CLICK()] () {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    [BIND('$counter')] () {
        return {
            text: this.state.counter
        }
    }
}

customElements.define('sample-web-component', WebComponent(SampleWebComponent));