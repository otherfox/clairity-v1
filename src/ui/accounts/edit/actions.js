import Fynx from 'fynx'
import {getAllAccountTypes} from '../../../core/services/account'
import {getLocation, putLocation} from '../../../core/services/location'
import {fetchLocation, updateLocation} from '../../../core/actions/location'
import Store from '../../../core/store'

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
