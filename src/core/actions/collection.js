
import Store, { MessageTypes } from '../store'

export function collection(request) {
  let { data, params } = request;
  Store.dispatchMessage({
    type: MessageTypes.ReplaceAll,
    payload: {
      table: params.table,
      rows: data
    }
  });
  return Promise.resolve(Store.data);
}

export function collectionVia(request) {
  let { data, params } = request;
  Store.dispatchMessage({
    type: MessageTypes.Write,
    payload: {
      table: params.table,
      rows: data
    }
  });
  return Promise.resolve(Store.data);
}
