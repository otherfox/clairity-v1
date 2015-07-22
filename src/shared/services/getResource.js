import {getContact} from './contacts'
import {getLocation} from './location'
import {getWorkOrder} from './workOrder'
import {getContract} from './contracts'
import {getUser} from './users'
import {getAccount} from './account'
import {getOpportunity} from './opportunity'

const resource = {
  contact: getContact,
  location: getLocation,
  workorder: getWorkOrder,
  contract: getContract,
  lead: getContact,
  user: getUser,
  account: getAccount,
  opportunity: getOpportunity
};

export function getResource(id, tableName) {
  return resource[tableName.toLowerCase()](id);
}

import { getContactsByAccount, getContactsByOpportunity, getContactsByLocation } from './contacts'
import { getOpportunitiesByAccount } from './opportunity'
import { getContractsByAccount, getContractsByLocation } from './contracts'
import { getAccountsByAgent, getAccountsByContact } from './account'
import { getLocationsByPop, getLocationsByContact, getLocationsByStatus } from './location'

const resourceVia = {
  contact: {
    account: getContactsByAccount,
    opportunity: getContactsByOpportunity,
    location: getContactsByLocation
  },
  contract: {
    account: getContractsByAccount,
    location: getContractsByLocation
  },
  opportunity: {
    account: getOpportunitiesByAccount
  },
  account: {
    user: getAccountsByAgent,
    contact: getAccountsByContact
  },
  location: {
    pop: getLocationsByPop,
    contact: getLocationsByContact,
    locationStatus: getLocationsByStatus
  },
};

export function getCollectionVia(resourceTable, throughTable, throughId) {
  return resourceVia[resourceTable][throughTable](throughId);
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
