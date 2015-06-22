import Fynx from 'fynx'
import {getAllCustomerTypes} from './services'
import {getLocation, putLocation} from '../shared/services/location'
import {fetchLocation, updateLocation} from '../shared/actions/location'
import Store from '../shared/store'

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
