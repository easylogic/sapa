
import { UIElement } from '../src/UIElement';
import { LOAD } from '../src/Event';
import { start } from '../src/App';
import { Todo } from './todo';

import './webcomponent';
import { createComponent } from '../src/functions/jsx';
import { variable } from '../src';



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
                <div class='list' ref='$list' load=${variable(() => {
                    return AppList.map((item, index) => {
                        return /*html*/`
                        <div class='item'>
                            <h1>${item.title}</h1>
                            ${createComponent(item.refClass, {ref: `$${item.refClass}${index}`})}
                        </div>
                        `
                    })
                })}></div>

                <h1>Sample Web Component</h1>
                <sample-web-component key="color" value="yellow" />
            </div>
        </div>
        `
    }
}

start(Test);