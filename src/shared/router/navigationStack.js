import EventEmitter from 'eventemitter2'
import _ from 'lodash'

/*
 *
 *
 */
class NavigationStack extends EventEmitter {

  constructor(options) {
    super(options);
    this.stack = [];
  }

  push(name, params, displayName) {
    this.stack.push({name, params, displayName});
    this.emit('change');
  }

  pop() {
    return this.stack.pop();
    this.emit('change');
  }

  popAfter(name) {
    let i = this.stack.findIndex(l => l.name == name);
    if (i < 0) return;
    this.stack.splice(i, this.stack.length - i);
    this.emit('change');
  }

  replaceWith(name, params, displayName) {
    this.stack = [ { name, params, displayName } ];
    this.emit('change');
  }

  get size() {
    return this.stack.length;
  }

}

export var navStack = new NavigationStack();

export default NavigationStack;
