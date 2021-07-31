import { start } from "./App";
import BaseStore from "./BaseStore";
import * as EventFunctions from "./Event";
import Dom from "./functions/Dom";
import { registElement } from "./functions/registElement";
import UIElement from "./UIElement";

export default {
  start,
  UIElement,
  BaseStore,
  Dom,
  ...EventFunctions,
  registElement,
};
