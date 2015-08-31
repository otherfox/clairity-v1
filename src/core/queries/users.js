
import Store from '../store'

export function queryAccountOwners() {
  let result = Store.data.get('user')
    .toList()
    .filter(u => u.getIn(['type', 'name']) == "Employee");
  return result.size > 0 ? result : null;
}

export function accountOwners() {
  let result = Store.data.get('user')
    .toList()
    .filter(u => u.getIn(['type', 'name']) == "Employee");
  return result.size > 0 ? result : null;
}
