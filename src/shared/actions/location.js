import Fynx from 'fynx'
import {getLocation, putLocation} from '../services/location'
import Store from '../store'

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
