import Fynx from 'fynx'
import {getWorkOrder, putWorkOrder} from '../shared/services/workOrder'
import Store from '../shared/store'

export const fetchWorkOrder = Fynx.createAsyncAction();
export const updateWorkOrder = Fynx.createAsyncAction();
export const ownersFetched = Fynx.createAsyncAction();
export const workOrderTypesFetched = Fynx.createAsyncAction();
const workOrderRecieved = Fynx.createAsyncAction();

// Fetch the data
fetchWorkOrder.listen(id => {
  getWorkOrder(id)
    .then(order => workOrderRecieved(order));
});

// Store the data
workOrderRecieved.listen(order => {
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'workOrder',
      row: order
    }
  });
});

// Update Work Order
updateWorkOrder.listen((id, data) => {
  let promise = putWorkOrder(id, data);
  Store.handleMessage({
    type: Store.MessageTypes.Update,
    payload: {
      table: 'workOrder',
      row: order
    },
    promise
  })
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
