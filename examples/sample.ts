
import { UIElement } from '../src/UIElement';
import { BIND, CLICK, SUBSCRIBE, LOAD } from '../src/Event';
import { start } from '../src/App';
import { Todo } from './todo';



const AppList = [
    { refClass: "ToDo", class: Todo, title: "ToDo"}
]


class Test extends UIElement {

    components () {

        const obj = {}

        AppList.forEach(item => {
            obj[item.refClass] = item.class
        })

        return obj;
    }

    template() {
        return /*html*/`
        <div>
            <div class='test-view'>
                <h1>Sample List</h1>
                <div class='list' ref='$list'></div>
            </div>
        </div>
        `
    }

    renderList() {
        return AppList.map(item => {
            return /*html*/`
            <div class='item'>
                <h1>${item.title}</h1>
                <object refClass="${item.refClass}" />
            </div>
            `
        })
    }

    [LOAD('$list')]() {
        return this.renderList();
    }
}

start(Test);