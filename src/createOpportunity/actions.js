import Fynx from 'fynx'
import Store from '../shared/store'

export const convertLead = Fynx.createAsyncAction();

convertLead.listen(leadInfo => {
  console.log('converting lead...', leadInfo)
});
