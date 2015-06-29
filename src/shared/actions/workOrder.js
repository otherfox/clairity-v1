import Fynx from 'fynx'
import {getWorkOrder, putWorkOrder} from '../services/workOrder'
import Store from '../store'

export const fetchWorkOrder = Fynx.createAsyncAction();

const workOrderFetched = Fynx.createAsyncAction();

// Fetch the data
fetchWorkOrder.listen(id => {
  getWorkOrder(id)
    .then(workOrder => workOrderFetched(workOrder));
});

// Store the data
workOrderFetched.listen(workOrder =>
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'workOrder',
      row: workOrder
    }
  })
);

export const updateWorkOrder = Fynx.createAction();

updateWorkOrder.listen((state) => {
  return putWorkOrder(state.id, state.workOrder);
});
