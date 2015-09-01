
import Store, { MessageTypes } from '../store'
import { enqueueUpdate } from '../update'

export function collection(request) {
  console.log('Collection action', 'received request', request);
  let { data, params } = request;
  enqueueUpdate({
    type: MessageTypes.ReplaceAll,
    payload: {
      table: params.table,
      rows: data
    }
  }, request);
  return Promise.resolve(Store.data);
}

export function collectionVia(request) {
  console.log('CollectionVia action', 'received request', request);
  let { data, params } = request;
  enqueueUpdate({
    type: MessageTypes.Write,
    payload: {
      table: params.table,
      rows: data
    }
  }, request);
  return Promise.resolve(Store.data);
}
