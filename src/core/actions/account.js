import Fynx from 'fynx'
import { getAllCustomerTypes } from '../services/account'
import { updateLocation, fetchLocation } from '../actions/location'
import Store from '../store'

/* Customer Actions */

export const fetchAllCustomerTypes = Fynx.createAsyncAction();

const customerTypesFetched = Fynx.createAsyncAction();

// Fetch the data
fetchAllCustomerTypes.listen(id => {
  getAllCustomerTypes().then(customerTypesFetched);
});

// Store the data
customerTypesFetched.listen(customerTypes =>
  Store.handleMessage({
    type: Store.MessageTypes.ReplaceAll,
    payload: {
      table: 'customerType',
      rows: customerTypes
    }
  })
);


export {fetchLocation};
export {updateLocation};
