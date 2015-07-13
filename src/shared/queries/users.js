
import Store from '../store'

export function queryAccountOwners() {
  let result = Store.data.get('user').toList();
  return result.size > 0 ? result : null;
}
