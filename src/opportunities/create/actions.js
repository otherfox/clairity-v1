import Fynx from 'fynx'
import Store from '../../shared/store'

import {postConvertLead} from '../../shared/services/contacts'

export const convertLead = Fynx.createAsyncAction();

convertLead.listen(leadInfo => {
  postConvertLead(leadInfo.data).then(a => leadInfo.completed());
});
