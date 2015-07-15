import Fynx from 'fynx'
import Store from '../shared/store'

import { postConvertLead } from '../shared/services/contacts'
import { putOpportunity } from '../shared/services/opportunity'

export const convertLead = Fynx.createAsyncAction();
export const updateSalesOpp = Fynx.createAsyncAction();

convertLead.listen(leadInfo => {
  postConvertLead(leadInfo.data).then(a => leadInfo.completed());
});

updateSalesOpp.listen(oppInfo => {
  putOpportunity(oppInfo.data).then(a => oppInfo.completed && oppInfo.completed(a));
});
