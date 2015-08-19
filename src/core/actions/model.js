
import Fynx from 'fynx'
import Store, { MessageTypes } from '../store'

export const model = Fynx.createAsyncAction();

model.listen(request => {
  let { data, params } = request;
  Store.dispatchMessage({
    type: MessageTypes.Write,
    payload: {
      table: params.table,
      row: data
    }
  })
});
