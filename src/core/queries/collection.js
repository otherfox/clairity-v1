
export function collection(args) {
  let { table } = args;
  let result = Store.data.get(table.toLowerCase());
  return result.size > 0 ? result : null;
}

export function collectionVia(args) {
  let { table, filterId, idName } = args;
  let result = Store.data.get(table.toLowerCase())
                         .toList()
                         .filter(r => r.get(idName) == filterId);
  return result.size > 0 ? result : null;
}
