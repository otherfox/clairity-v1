
import Store from './store'
import { Is } from 'immutable'
import _ from 'lodash'

export function enqueueUpdate(msg, cause) {
  let before = Store.data;
  Store.handleMessage(msg);
  let after = Store.data;
  if (!Is(before, after)) { // deep, expensive equality comparison
    let message = _.clone(message);
    if (message.payload) {
      delete msg.payload.row;
      delete msg.payload.rows;
    }
    postMessage({
      cause, message,
      type: 'event'
    });
  }
}
