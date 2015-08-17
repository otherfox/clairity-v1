import Fynx from 'fynx'
import { getWorkOrder, putWorkOrder } from '../services/workOrder'
import Store, { MessageTypes } from '../store'

export const fetchWorkOrder = Fynx.createAsyncAction();
export const updateWorkOrder = Fynx.createAsyncAction();
export const ownersFetched = Fynx.createAsyncAction();
export const workOrderTypesFetched = Fynx.createAsyncAction();
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

// Update Work Order
updateWorkOrder.listen(state => {
  let promise = putWorkOrder(state.id, state.workOrder);
  promise.then(workOrder => Store.handleMessage({
    type: Store.MessageTypes.Update,
    payload: {
      table: 'workOrder',
      row: workOrder
    }
  }));
});

ownersFetched.listen(owners => {
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'user',
      rows: owners
    }
  });
});

workOrderTypesFetched.listen(types => {
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'workOrderType',
      rows: Types
    }
  });
});
