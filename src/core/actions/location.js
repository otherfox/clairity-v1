import Fynx from 'fynx'
import { getLocation } from '../services/location'
import Store from '../store'

export const fetchLocation = Fynx.createAsyncAction();

const locationFetched = Fynx.createAsyncAction();

// Fetch the data
fetchLocation.listen(id => {
  getLocation(id)
    .then(location => locationFetched(location));
});

// Store the data
locationFetched.listen(location =>
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'location',
      row: location
    }
  })
);

// TODO: Fix this
export const updateLocation = Fynx.createAction();

updateLocation.listen((state) => {
  return updateLocation(state.location, state.sameAddress);
});
