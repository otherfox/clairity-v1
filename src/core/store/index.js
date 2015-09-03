
import Store from '@brainbytes/immutable-store'

import schema from './schema'

let appStore = new Store(schema);
appStore.MessageTypes = Store.MessageTypes;
appStore.Queries = {};

export default appStore;


try {
  window.Store = appStore;
  appStore.onWindow = true;
} catch (e) {
  appStore.onWindow = false;
  // inside a worker;
}
