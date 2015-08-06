
import {v4} from 'uuid'
import EventEmitter from 'eventemitter2'

class WorkerBridge extends EventEmitter {

  constructor(workerPath) {
    super();
    this.name = workerPath;
    this.worker = new Worker(this.name);
    this.callbackMap = new Map();
    this.worker.onmessage = this._handleMessage.bind(this);
  }

  _handleMessage(message) {
    if (message.token) {
      this.callbackMap.get(message.token)(message);
      this.callbackMap.delete(message.token);
    } else {

    }
  }

  dispatch(message) {
    return new Promise((resolve, reject) => {
      let token = v4();
      message.token = token;
      callbackMap.put(token, resolve);
      this.worker.postMessage(message);
    });
  }

}

let instance = new WorkerBridge('worker.js');

export { instance };

export default WorkerBridge;
