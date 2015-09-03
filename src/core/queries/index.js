
import { model } from './model'
import { collection, collectionVia } from './collection'
import { accountOwners } from './users'

export default {
  model, collection, collectionVia,
  agingReports: () => collection({ table: 'agingReport' }),
  accountOwners
}
