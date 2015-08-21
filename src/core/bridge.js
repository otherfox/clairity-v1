
import { v4 } from 'uuid'
import EventEmitter from 'eventemitter2'

class WorkerBridge extends EventEmitter {

  constructor(workerPath) {
    super();
    this.name = workerPath;
    this.worker = new Worker(this.name);
    this.callbackMap = new Map();
    this.worker.onmessage = this._handleMessage.bind(this);
  }

  _handleMessage(ev) {
    console.log('thread bridge', 'received message', ev.data);
    let { data } = ev;
    if (data.token) {
      this.callbackMap.get(data.token)(data);
      this.callbackMap.delete(data.token);
    } else if (data.event) {
      this.emit(['update'], data);
      console.log('worker event', data);
    }
  }

  dispatch(message) {
    console.log('thread bridge', 'dispatching message', message);
    return new Promise((resolve, reject) => {
      let token = message.token || v4();
      message.token = token;
      this.callbackMap.set(token, resolve);
      this.worker.postMessage(message);
    });
  }

}

let instance = new WorkerBridge('worker.js');

export { instance };

export default WorkerBridge;
