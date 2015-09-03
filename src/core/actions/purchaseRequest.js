import Fynx from 'fynx'
import Store from '../store'

export const purchaesRequestsFetched = Fynx.createAsyncAction();

// Fetch the data
purchaesRequestsFetched.listen(purchaseRequests => {
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'purchaseRequest',
      rows: purchaseRequests
    }
  });
});
