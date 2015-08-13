import Store from '../../shared/store'

export function queryAllCustomerTypes() {
  let results = Store.data
    .get('customerType')
    .toList();
  return results ? results.toJS() : [];
}

export function queryLocation(id) {
  let location = Store.data.getIn(['location', id]);
  return location ? location.toJS() : null;
}
