import _ from 'lodash'
import Store from '../shared/store'

function nonzero(v) {
  return  v.get('balance')  != 0 ||
          v.get('b_0_30') != 0 ||
          v.get('b_31_60') != 0 ||
          v.get('b_61_90') != 0 ||
          v.get('b_91') != 0;
}

function all(v) {
  return true
}

export function queryActive(includeZeros) {
  return Store.data
    .get('agingReport')
    .filter(v => v.get('active') == 'Active')
    .filter(includeZeros ? all : nonzero)
    .toMap()
}

export function queryInactive(includeZeros) {
  return Store.data
    .get('agingReport')
    .filter(v => v.get('active') == 'Inactive')
    .filter(includeZeros ? all : nonzero)
    .toMap()
}

export function queryAll(includeZeros) {
  return Store.data
    .get('agingReport')
    .filter(includeZeros ? all : nonzero)
    .toMap()
}
