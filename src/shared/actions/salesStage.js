import Fynx from 'fynx'
import Store from '../store'

export const salesStagesFetched = Fynx.createAsyncAction();

// Fetch the data
salesStagesFetched.listen(salesStages => {
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'salesStage',
      rows: salesStages
    }
  });
});
