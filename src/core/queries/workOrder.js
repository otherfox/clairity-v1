import Store from '../store'

export function queryWorkOrder(id) {
  return Store.data.getIn(['workOrder', id]);
}
