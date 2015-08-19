import Fynx from 'fynx'
import Store from '../store'

export const ticketsFetched = Fynx.createAsyncAction();

// Fetch the data
ticketsFetched.listen(tickets => {
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'ticket',
      rows: tickets
    }
  });
});
