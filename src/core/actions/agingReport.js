import Fynx from 'fynx'
import { getAgingReports } from '../services/agingReport'
import Store from '../store'

export const fetchAgingReports = Fynx.createAsyncAction();

export const agingReportsFetched = Fynx.createAsyncAction();

// Fetch the data
fetchAgingReports.listen(date => {
  getAgingReports(date)
    .then(reports => agingReportsFetched(reports));
});

// Store the data
agingReportsFetched.listen(reports =>
  Store.handleMessage({
    type: Store.MessageTypes.ReplaceAll,
    payload: {
      table: 'agingReport',
      rows: reports.rows
    }
  })
);
