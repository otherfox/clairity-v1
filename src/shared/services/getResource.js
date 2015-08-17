import {getContact} from './contacts'
import {getLocation} from './location'
import {getWorkOrder} from './workOrder'
import {getContract} from './contracts'
import {getUser} from './users'
import {getAccount} from './account'
import {getTicket} from './tickets'
import {getOpportunity, getSale} from './opportunity'

const resource = {
  contact: getContact,
  location: getLocation,
  workorder: getWorkOrder,
  contract: getContract,
  lead: getContact,
  user: getUser,
  account: getAccount,
  opportunity: getOpportunity,
  ticket: getTicket
};

export function getResource(id, tableName) {
  return resource[tableName.toLowerCase()](id);
}

import { getContactsByAccount, getContactsByOpportunity, getContactsByLocation } from './contacts'
import { getOpportunitiesByAccount} from './opportunity'
import { getContractsByAccount, getContractsByLocation } from './contracts'
import { getAccountsByAgent, getAccountsByContact } from './account'
import { getLocationsByPop, getLocationsByContact, getLocationsByStatus } from './location'
import { getWorkOrderMessagesByWorkOrder } from './messages'

const resourceVia = {
  workOrderMessage: {
    workOrder: getWorkOrderMessagesByWorkOrder
  },
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
  }
};

export function getCollectionVia(resourceTable, throughTable, throughId) {
  return resourceVia[resourceTable][throughTable](throughId);
}


import {getPops} from './pop'
import {getAccounts} from './account'
import {getWorkOrderTypes, getWorkOrderStatuses} from './workOrder'
import {getLeads} from './contacts'
import {getProjectTypes} from './projectType'
import {getSalesStages} from './salesStage'
import {getLeadSources} from './leadSource'
import {getCampaignSources} from './campaignSource'
import {getServiceTypes} from './serviceType'
import {getTickets} from './tickets'

const collection = {
  pop: getPops,
  account: getAccounts,
  workOrderType: getWorkOrderTypes,
  workOrderStatus: getWorkOrderStatuses,
  lead: getLeads,
  projectType: getProjectTypes,
  salesStage: getSalesStages,
  leadSource: getLeadSources,
  campaignSource: getCampaignSources,
  serviceType: getServiceTypes,
  ticket: getTickets
};

export function getCollection(tableName) {
  return collection[tableName]();
}
