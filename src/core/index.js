import Store from './store'
import Handlers from './handlers'

onmessage = function handleMessage(message) {
  Handlers[message.data.type](message.data).then(data => {
    data.token = message.data.token;
    postMessage(data);
  });
};
