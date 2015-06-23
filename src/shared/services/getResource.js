import {getContact} from './contacts'
import {getLocation} from './location'
import {getWorkOrder} from './workOrder'
import {getContract} from './contracts'

const fns = {
  contact: getContact,
  location: getLocation,
  workorder: getWorkOrder,
  contract: getContract
};

export function getResource(id, tableName) {

  return fns[tableName.toLowerCase()](id);

}
