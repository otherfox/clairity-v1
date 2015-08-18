import Store from './store'
import Handlers from './handlers'

onmessage = function handleMessage(message) {
  console.log('worker thread', 'got message', message.data);
  Handlers[message.data.type](message.data).then(postMessage);
};
