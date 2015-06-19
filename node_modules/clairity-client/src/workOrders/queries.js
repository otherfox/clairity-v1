import _ from 'lodash'
import Store from '../shared/store'

export function queryOrdersForCustomer(customerId) {
  //...
}

export function queryWorkOrder(id) {
  return Store.data.getIn(['workOrders', id]);
}
