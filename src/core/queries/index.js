
import { model } from './model'
import { collection, collectionVia } from './collection'

export default {
  model, collection, collectionVia,
  agingReports: () => collection({ table: 'agingReport' })
}
