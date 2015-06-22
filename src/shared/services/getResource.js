import {getContact} from 'contacts'
import {getLocation} from 'locations'
import {getWorkOrder} from 'workOrder'

const fns = {
  contact: getContact,
  location: getLocation,
  workorder: getWorkOrder
};

export function getResource(id, tableName) {

  return fns[tableName.toLowerCase()](id);

}
