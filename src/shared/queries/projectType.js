
import _ from 'lodash'
import Store from '../store'

export function queryAllProjectTypes() {
  let result = Store.data.get('projectType').toList();
  return result.size > 0 ? result : null;
}
