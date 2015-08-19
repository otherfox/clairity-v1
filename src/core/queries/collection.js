
import Store from '../store'

export function collection(args) {
  let { table } = args;
  let result = Store.data.get(table);
  console.log('collection query', result.toJS());
  return result.size > 0 ? result.toJS() : null;
}

export function collectionVia(args) {
  let { table, filterId, idName } = args;
  let result = Store.data.get(table)
                         .toList()
                         .filter(r => r.get(idName) == filterId);
  return result.size > 0 ? result : null;
}
