
import * as App from "./App";
import Dom from "./Dom";
import * as Event from "./Event";
import UIElement, { EVENT } from "./UIElement";

import * as func from './functions/func';

export default { Dom, UIElement, EVENT, App, ...Event, ...func };
