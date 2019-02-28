import { ACTION_PREFIX, GETTER_PREFIX } from "./Event";
import { filterProps } from "./func";

export default class Module {
    constructor ($store) {
        this.$store = $store;
        this.loadProps()
        this.initialize();
    }

    afterDispatch() {}
    initialize() {}

    loadProps() {
        filterProps(this, ACTION_PREFIX).forEach(key => {
            this.$store.action(key, this);
        });

        filterProps(this, GETTER_PREFIX).forEach(key => {
            this.$store.getter(key, this);
        });        
    }
}