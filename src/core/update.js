
import Store from './store'
import { is } from 'immutable'
import _ from 'lodash'

export function enqueueUpdate(msg, cause) {
  console.log('Worker Update pump', 'update request received', msg, cause);
  let before = Store.data;
  Store.handleMessage(msg);
  let after = Store.data;
  console.log('Worker Update pump', 'comparing data...')
  if (!is(before, after)) { // deep, expensive equality comparison
    console.log('Worker Update pump', 'change found')
    let message = _.clone(msg);
    if (message.payload) {
      delete msg.payload.row;
      delete msg.payload.rows;
    }
    postMessage({
      cause, message,
      type: 'event',
      event: true
    });
  } else {
    console.log('Worker Update pump', 'no change found');
  }
}
