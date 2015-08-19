
import Store, { MessageTypes } from '../store'

export function model(request) {
  let { data, params } = request;
  Store.dispatchMessage({
    type: MessageTypes.Write,
    payload: {
      table: params.table,
      row: data
    }
  });
  return Promise.resolve(Store.data);
}
