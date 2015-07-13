
import _ from 'lodash'
import Store from '../store'

export function queryAllSalesStages() {
  let result = Store.data.get('salesStage').toList();
  return result.size > 0 ? result : null;
}
