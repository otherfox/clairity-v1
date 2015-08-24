import Store from '../store'

export function model(args) {
  let { table, id } = args;
  let result = Store.data.getIn([table, id], null);
  return result && result.toJS();
}
