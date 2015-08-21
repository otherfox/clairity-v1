import Fynx from 'fynx'
import { getAgingReports } from '../services/agingReport'
import Store, { MessageTypes } from '../store'
import { enqueueUpdate } from '../update'

export const fetchAgingReports = Fynx.createAsyncAction();

export const agingReportsFetched = Fynx.createAsyncAction();

// Fetch the data
fetchAgingReports.listen(date => {
  getAgingReports(date)
    .then(reports => agingReportsFetched(reports));
});

export function agingReports(request) {
  let { data, params } = request;
  enqueueUpdate({
    type: MessageTypes.ReplaceAll,
    payload: {
      table: 'agingReport',
      rows: data.rows
    }
  })
}

// Store the data
agingReportsFetched.listen(reports =>
  enqueueUpdate({
    type: Store.MessageTypes.ReplaceAll,
    payload: {
      table: 'agingReport',
      rows: reports.rows
    }
  })
);
