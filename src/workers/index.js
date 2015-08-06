
try {
  !!window;
  console.log('outside worker');
} catch (e) {
  console.log('inside worker!');
}

/*

// Example implemention of bridge/hub for Worker

import {v4} from 'uuid'

const callbackMap = new Map();

let worker = {postMessage(){}}

worker.onmessage = msg => {
  let token = msg.token;
  callbackMap.get(token)(msg);
  callbackMap.delete(token);
};


function getPromiseForMessage(message) {
  return new Promise((resolve, reject) => {
    let token = Symbol(v4());
    message.token = token;
    callbackMap.put(token, resolve);
  });
}
*/
