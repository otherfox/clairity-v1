import Store from '../../shared/store'

export function queryAllCustomerTypes() {
  return Store.data
    .get('customerType')
    .toList().toJS()
}

export function queryLocation(id) {
  let location = Store.data.getIn(['location', id], null);
  if(location) {
    location = location.toJS();
  }
  return location;
}
