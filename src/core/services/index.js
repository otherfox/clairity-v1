import { model, collection, collectionVia } from './getResource'

import { agingReports } from './agingReport'
import { getAccountOwners } from './users'

export default {
  model, collection, collectionVia,
  agingReports,
  accountOwners: getAccountOwners
}
