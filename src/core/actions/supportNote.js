
import { enqueueUpdate } from '../update'
import { postSupportNote } from '../services/supportNote'

import { MessageTypes } from '../store'

export function createSupportNote(request) {
  let write = postSupportNote(params);
  write.then(row => enqueueUpdate({
    type: MessageTypes.Write,
    payload: { row, table: 'supportNote' }
  }, request, true));
  return write;
}
