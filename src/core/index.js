import Store from './store'

onmessage = function handleMessage(message) {
  console.log('worker thread', 'got message', message.data);
  setTimeout(function() {
    console.log('worker thread', 'sending response');
    postMessage(message.data);
  }, 1000);
};
