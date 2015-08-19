import Store from '../store'

export function model(args) {
  let { table, id } = args;
  return Store.data.getIn([table, id]).toJS();
}
