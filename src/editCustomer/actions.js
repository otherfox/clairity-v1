import Fynx from 'fynx'
import {getAllCustomerTypes, getLocation, putLocation} from './services'
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
      table: 'customerTypes',
      rows: customerTypes
    }
  })
);

/* Location actions */

export const fetchLocation = Fynx.createAsyncAction();

const locationFetched = Fynx.createAsyncAction();

// Fetch the data
fetchLocation.listen(id => {
  requestLocation(id)
    .then(location => locationFetched(location));
});

// Store the data
locationFetched.listen(location =>
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'locations',
      row: location
    }
  })
);

export const updateLocation = Fynx.createAction();

updateLocation.listen((state) => {
  return updateLocation(state.location, state.sameAddress);
});
