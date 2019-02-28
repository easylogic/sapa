import { debounce } from "./func";
import { ACTION_PREFIX, GETTER_PREFIX, PREVENT } from "./Event";

export class Store {
    constructor (opt) {
        this.cachedCallback = {}
        this.callbacks = [] 
        this.actions = []
        this.getters = []
        this.modules = opt.modules || []
        this.standalone = {
            getters: {},
            actions: {},
            dispatches: {}
        }

        this.initialize()
    }

    initialize () {
        this.initializeModule();
    }

    initializeModule () {
        this.modules.forEach(ModuleClass => {
            this.addModule(ModuleClass);
        })
    } 

    makeActionCallback (context, action, actionName) {
        var func = (...args) => {
            return context[action].call(context, this, ...args); 
        }
        
        func.context = context;
        func.displayName = actionName;

        return func 
    }

    action (action, context) {
        var actionName = action.substr(action.indexOf(ACTION_PREFIX) + ACTION_PREFIX.length) 

        this.actions[actionName] = this.makeActionCallback(context, action, actionName);

        this.standalone.actions[actionName] = ((...args) => {
            return this.run(actionName, ...args)
        })        
        this.standalone.dispatches[actionName] = ((...args) => {
            return this.dispatch(actionName, ...args)
        })                
    }

    getter (action, context) {
        var actionName = action.substr(action.indexOf(GETTER_PREFIX) + GETTER_PREFIX.length) 

        this.getters[actionName] = this.makeActionCallback(context, action, actionName);   

        this.standalone.getters[actionName] = ((...args) => {
            return this.read(actionName, ...args)
        })
    }    

    mapGetters (...args) {
        return args.map(actionName => {
            return this.standalone.getters[actionName]
        })
    }

    mapActions (...args) {
        return args.map(actionName => {
            return this.standalone.actions[actionName]
        })
    }
    
    mapDispatches (...args) {
        return args.map(actionName => {
            return this.standalone.dispatches[actionName]
        })
    }    

    dispatch (action, ...args) {
        var actionCallback = this.actions[action];

        if (actionCallback) {
            var ret = actionCallback(...args); 

            if (ret != PREVENT) {
                actionCallback.context.afterDispatch()
            }

        } else {
            throw new Error('action : ' + action + ' is not a valid.')
        }

    }

    run (action, ...args) {
        var actionCallback = this.actions[action];

        if (actionCallback) { 
            return actionCallback(...args); 
        } else {
            throw new Error('action : ' + action + ' is not a valid.')            
        }
    }    

    read (action, ...args) {
        var getterCallback = this.getters[action];

        if (getterCallback) { 
            return getterCallback(...args); 
        } else {
            throw new Error('getter : ' + action + ' is not a valid.')            
        }
    }

    addModule (ModuleClass) {
        return new ModuleClass(this)
    }

    on (event, originalCallback, context, delay = 0) {
        var callback = delay > 0 ? debounce(originalCallback, delay) : originalCallback;
        this.callbacks.push({ event, callback, context, originalCallback })
    }

    off (event, originalCallback) {

        if (arguments.length == 0) {
            this.callbacks = [] 
            this.cachedCallback = {}
        } else if (arguments.length == 1) {
            this.callbacks = this.callbacks.filter(f => {
                return f.event != event 
            })
            this.cachedCallback = {}
        } else if (arguments.length == 2) {
            this.callbacks = this.callbacks.filter(f => {
                return !(f.event == event && f.originalCallback == originalCallback)
            })
            this.cachedCallback = {}
        }

    }

    emit (event, ...args) {

        if (!this.cachedCallback[event]) {
            this.cachedCallback[event] = this.callbacks.filter(f => {
                return (f.event == event)
            });
        } 

        this.cachedCallback[event].forEach(f => {
            if (f.context.source != this.source) {
                f.callback(...args);
            }
        })
    }    
}