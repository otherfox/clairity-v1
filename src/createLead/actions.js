import Fynx from 'fynx'
import Store from '../store'

export const convertLead = Fynx.createAsyncAction();

convertLead.listen(leadInfo => {
  console.log('converting lead...', leadInfo)
});
