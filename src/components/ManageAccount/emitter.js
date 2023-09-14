// downloand  ---   npm install --save-exact events@3.3.0
import EventEmitter from "events";
const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // unlimit litener
export const emitter = _emitter;
