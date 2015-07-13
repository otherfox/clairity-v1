
import Store from '../store'

export function queryAccountOwners() {
  // TODO: Verify that this works the way I think it does
  let result = Store.data.get('user').toList();
  return result.size > 0 ? result : null;
}
