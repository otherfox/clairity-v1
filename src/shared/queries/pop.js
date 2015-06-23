
import _ from 'lodash'
import Store from '../store'

export function queryAllPops() {
  return Store.data.get('pop').toList();
}
