import Store from '../shared/store'

export function queryAllCustomerTypes() {
  return Store.data
    .get('customerTypes')
    .toList().toJS()
}

export function queryLocation(id) {
  let location = Store.data
    .get('locations')
    .get(id, null);
  if(location) {
    location = location.toJS();
  }
  return location;
}
