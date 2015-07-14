import Fynx from 'fynx'
import Store from '../store'

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
