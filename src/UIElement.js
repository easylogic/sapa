import EventMachine from "./EventMachine";
import { uuid, keyEach } from "./func";

const CHECK_STORE_MULTI_PATTERN = /^ME@/
const MULTI_PREFIX = 'ME@'
const SPLITTER = '|'

export const EVENT = (...args) => {
    return MULTI_PREFIX + args.join(SPLITTER);
}

export class UIElement extends EventMachine {
    constructor (opt, props) {
        super(opt)

        this.opt = opt || {};
        this.parent = this.opt;
        this.props = props || {}
        this.source = uuid()

        if (opt && opt.$store) {
            this.$store = opt.$store
        }

        this.created();

        this.initialize();
        
        this.initializeStoreEvent();
    }

    created() {}

    getRealEventName(e, s = PREFIX) {
        var startIndex = e.indexOf(s);
        return e.substr(startIndex == 0 ? 0 : startIndex + s.length);
    }

    /**
     * initialize store event 
     * 
     * you can define '@xxx' method(event) in UIElement 
     * 
     * 
     */
    initializeStoreEvent () {
        this.storeEvents = {}

        this.filterProps(CHECK_STORE_MULTI_PATTERN).forEach((key) => {
            const events = this.getRealEventName(key, MULTI_PREFIX);

            events.split(SPLITTER).forEach(e => {
                e = this.getRealEventName(e);
                var callback = this[key].bind(this)
                callback.displayName = e;
                this.storeEvents[e] = callback                
                this.$store.on(e, this.storeEvents[e], this);
            })
            
        });        
    }

    destoryStoreEvent () {
        keyEach(this.storeEvents, (event, eventValue) => {
            this.$store.off(event, eventValue)
        })
    }

    read (...args) {
        return this.$store.read(...args)
    }

    mapGetters (...args) {
        return this.$store.mapGetters(...args);
    }

    mapActions (...args) {
        return this.$store.mapActions(...args);
    }    

    mapDispatches (...args) {
        return this.$store.mapDispatches(...args);
    }          

    run (...args) {
        return this.$store.run(...args);
    }

    dispatch (...args) {
        this.$store.source = this.source ; 
        return this.$store.dispatch(...args) 
    }

    emit (...args) {
        this.$store.source = this.source ; 
        this.$store.emit(...args);
    }
}