
export function collection(args) {
  let { table } = args;
  let result = Store.data.get(table);
  return result.size > 0 ? result : null;
}

export function collectionVia(args) {
  let { table, filterId, idName } = args;
  let result = Store.data.get(table)
                         .toList()
                         .filter(r => r.get(idName) == filterId);
  return result.size > 0 ? result : null;
}
