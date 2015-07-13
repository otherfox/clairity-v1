import Fynx from 'fynx'
import Store from '../store'

export const projectTypesFetched = Fynx.createAsyncAction();

// Fetch the data
projectTypesFetched.listen(projectTypes => {
  Store.handleMessage({
    type: Store.MessageTypes.Write,
    payload: {
      table: 'projectType',
      rows: projectTypes
    }
  });
});
