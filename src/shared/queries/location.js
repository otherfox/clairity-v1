import Store from '../store'

export function queryLocation(id) {
  return Store.data.getIn(['location', id]);
}
