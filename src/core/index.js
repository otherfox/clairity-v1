import Store from './store'
import Handlers from './handlers'

onmessage = function handleMessage(message) {
  console.log('Worker thread', 'onmessage', message)
  Handlers[message.data.type](message.data).then(data => {
    console.log('Worker thread', '.then -> postMessage', data);
    let response = Object.assign({}, data, { token: message.data.token });
    postMessage(response);
  });
};
