import Store from '../store'

export function model(table, id) {
  return Store.data.getIn([table, id]).toJS();
}
