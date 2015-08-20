
import Store from '../store'

export function collection(args) {
  let { table } = args;
  let result = Store.data.get(table).toList();
  return result.size > 0 ? result.toJS() : null;
}

export function collectionVia(args) {
  let { table, filterId, filterKey } = args;
  let result = Store.data.get(table)
                         .toList()
                         .filter(r => r.get(filterKey) == filterId);
  return result.size > 0 ? result.toJS() : null;
}
