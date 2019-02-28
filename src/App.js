import { UIElement } from "./UIElement";
import { Store } from "./Store";
import { Dom } from "./Dom";

export class App extends UIElement {

    initialize (modules = []) { 
        this.$store = opt.store || new Store({
            modules: [
                ...this.getModuleList(),
                ...modules
            ]
        });

        this.$body = new Dom(this.getContainer());
        this.$root = new Dom('div', this.getClassName());

        this.$body.append(this.$root);        

        this.render(this.$root)

        // 이벤트 연결 
        this.initializeEvent();          
        
        this.initBodyMoves()
    }



    getModuleList () {
        return opt.modules || []
    }

    getClassName () {
        return opt.className || 'easylogic'
    }

    getContainer () {
        return opt.container || document.body;
    }  
    
    template () {
        return `<div>${opt.template}</div>`
    }

    components () {
        return opt.components || {}
    }
}