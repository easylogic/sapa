import Dom from "./Dom";
import { POINTERMOVE, POINTEREND, DEBOUNCE } from "./Event";
import BaseStore from "./BaseStore";
import { EVENT, UIElement } from "./UIElement";

import { debounce } from "./functions/func";

const EMPTY_POS = { x: 0, y: 0 };
const MOVE_CHECK_MS = 10;

export const start = opt => {
  class App extends UIElement {

    initialize() {

      this.$store = new BaseStore();
      this.$app = this; 

      this.$container = Dom.create(this.getContainer());
      this.$container.addClass(this.getClassName());

      this.render(this.$container);

      // 이벤트 연결
      this.initializeEvent();

      this.initBodyMoves();
    }

    initState () {
      return {
        pos: {},
        oldPos: {}
      }
    }

    initBodyMoves() {
      this.moves = new Set();
      this.ends = new Set();

      this.modifyBodyMoveSecond(MOVE_CHECK_MS);
    }

    modifyBodyMoveSecond(ms = MOVE_CHECK_MS) {
      this.funcBodyMoves = debounce(this.loopBodyMoves.bind(this), ms);
    }

    loopBodyMoves() {
      var {oldPos, pos} = this.state;

      var isRealMoved = oldPos.x != pos.x || oldPos.y != pos.y;

      if (isRealMoved && this.moves.size) {
        this.moves.forEach(v => {
          var dx = pos.x - v.xy.x;
          var dy = pos.y - v.xy.y;
          if (dx != 0 || dy != 0) {
            //  변화가 있을 때만 호출 한다.
            v.func.call(v.context, dx, dy, 'move');
          }
        });
      }
      requestAnimationFrame(this.funcBodyMoves);
    }

    removeBodyMoves() {
      var {pos} = this.state; 
      this.ends.forEach(v => {
        v.func.call(v.context, pos.x - v.xy.x, pos.y - v.xy.y, 'end');
      });

      this.moves.clear();
      this.ends.clear();
    }

    [EVENT('add/body/mousemove')](func, context, xy) {
      this.moves.add({ func, context, xy });
    }

    [EVENT('add/body/mouseup')](func, context, xy) {
      this.ends.add({ func, context, xy });
    }

    getClassName() {
      return opt.className || "sapa";
    }

    getContainer() {
      return opt.container || document.body;
    }

    template() {
      return `${opt.template}`
    }

    components() {
      return opt.components || {};
    }

    [POINTERMOVE("document")](e) {
      var oldPos = this.state.pos || EMPTY_POS;
      var newPos = e.xy || EMPTY_POS;

      this.bodyMoved = !(oldPos.x == newPos.x && oldPos.y == newPos.y);

      this.setState({bodyEvent : e, pos: newPos, oldPos}, false);

      if (!this.requestId) {
        this.requestId = requestAnimationFrame(this.funcBodyMoves);
      }
    }

    [POINTEREND("document") + DEBOUNCE(50)](e) {
      var newPos = e.xy || EMPTY_POS;
      this.setState({bodyEvent : e, pos: newPos}, false);
      this.removeBodyMoves();
      this.requestId = null;
    }
  }

  return new App(opt);
};
