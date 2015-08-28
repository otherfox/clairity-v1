import Fynx from 'fynx'
import Store from '../store'

export const salesMetricsFetched = Fynx.createAsyncAction();

// Fetch the data
salesMetricsFetched.listen(salesMetrics => {
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'salesMetric',
      rows: salesMetrics
    }
  });
});
