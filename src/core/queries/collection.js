
export function collection(table) {
  let result = Store.data.get(table);
  return result.size > 0 ? result : null;
}

export function collectionVia(table, filterId, idName) {
  let result = Store.data.get(table)
                         .toList()
                         .filter(r => r.get(idName) == filterId);
  return result.size > 0 ? result : null;
}
