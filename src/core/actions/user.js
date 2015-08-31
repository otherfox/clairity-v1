import Fynx from 'fynx'

export const usersFetched = Fynx.createAsyncAction();

// Fetch the data
usersFetched.listen(users => {
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'user',
      rows: users
    }
  });
});


import Store, { MessageTypes } from '../store'
import { enqueueUpdate } from '../update'

export function accountOwners(request) {
  let { data, params } = request;
  enqueueUpdate({
    type: MessageTypes.Write,
    payload: {
      table: 'user',
      row: data
    }
  }, request);
  return Promise.resolve(Store.data);
}
