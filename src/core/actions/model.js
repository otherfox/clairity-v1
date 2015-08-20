
import Store, { MessageTypes } from '../store'
import { enqueueUpdate } from '../update'

export function model(request) {
  let { data, params } = request;
  enqueueUpdate({
    type: MessageTypes.Write,
    payload: {
      table: params.table,
      row: data
    }
  }, request);
  return Promise.resolve(Store.data);
}
