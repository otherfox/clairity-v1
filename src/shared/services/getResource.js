import {getContact} from './contacts'
import {getLocation} from './location'
import {getWorkOrder} from './workOrder'
import {getContract} from './contracts'
import {getUser} from './users'

const resource = {
  contact: getContact,
  location: getLocation,
  workorder: getWorkOrder,
  contract: getContract,
  lead: getContact,
  user: getUser
};

export function getResource(id, tableName) {
  return resource[tableName.toLowerCase()](id);
}


import {getPops} from './pop'
import {getWorkOrderTypes, getWorkOrderStatuses} from './workOrder'
import {getLeads} from './contacts'
import {getProjectTypes} from './projectType'
import {getSalesStages} from './salesStage'

const collection = {
  pop: getPops,
  workOrderType: getWorkOrderTypes,
  workOrderStatus: getWorkOrderStatuses,
  lead: getLeads,
  projectType: getProjectTypes,
  salesStage: getSalesStages
};

export function getCollection(tableName) {
  return collection[tableName]();
}
