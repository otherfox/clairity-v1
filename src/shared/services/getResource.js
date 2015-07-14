import {getContact} from './contacts'
import {getLocation} from './location'
import {getWorkOrder} from './workOrder'
import {getContract} from './contracts'
import {getUser} from './users'
import {getAccount} from './account'

const resource = {
  contact: getContact,
  location: getLocation,
  workorder: getWorkOrder,
  contract: getContract,
  lead: getContact,
  user: getUser,
  account: getAccount
};

export function getResource(id, tableName) {
  return resource[tableName.toLowerCase()](id);
}


import {getPops} from './pop'
import {getWorkOrderTypes, getWorkOrderStatuses} from './workOrder'
import {getLeads} from './contacts'
import {getProjectTypes} from './projectType'
import {getSalesStages} from './salesStage'
import {getLeadSources} from './leadSource'
import {getCampaignSources} from './campaignSource'

const collection = {
  pop: getPops,
  workOrderType: getWorkOrderTypes,
  workOrderStatus: getWorkOrderStatuses,
  lead: getLeads,
  projectType: getProjectTypes,
  salesStage: getSalesStages,
  leadSource: getLeadSources,
  campaignSource: getCampaignSources
};

export function getCollection(tableName) {
  return collection[tableName]();
}
