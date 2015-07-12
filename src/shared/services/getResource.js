import {getContact} from './contacts'
import {getLocation} from './location'
import {getWorkOrder} from './workOrder'
import {getContract} from './contracts'

const resource = {
  contact: getContact,
  location: getLocation,
  workorder: getWorkOrder,
  contract: getContract
};

export function getResource(id, tableName) {

  return resource[tableName.toLowerCase()](id);

}


import {getPops} from './pop'
import {getWorkOrderTypes, getWorkOrderStatuses} from './workOrder'
import {getLeads} from './contacts'

const collection = {
  pop: getPops,
  workOrderType: getWorkOrderTypes,
  workOrderStatus: getWorkOrderStatuses,
  lead: getLeads
};

export function getCollection(tableName) {

  return collection[tableName]();

}
