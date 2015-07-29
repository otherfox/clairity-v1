import _ from 'lodash'
import Store from '../shared/store'

export function queryOrdersForCustomer(customerId) {
  //...
}

export function queryWorkOrder(id) {
  return Store.data.getIn(['workOrder', id]);
}

export function queryWorkOrderTypes() {
  return Store.data.get('workOrderType');
}

export function queryWorkOrderOwners() {
  let result = Store.data.get('user') // get all users
    .toList() // as a list/collection
    .filter(u => // find the users
      u.get('roles') // inspect each users roles
       .filter(r => // find roles which have
         r.get('name') == 'provisioning' || // the name provisioning
         r.get('name') == 'field_ops')  // or field_ops
       .size > 0); // return users whose role query returned one or more entry
  return result.size > 0 ? result.toJS() : null;
}
