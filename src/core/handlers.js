import Queries from './queries'
import Actions from './actions'
import Services from './services'
import _ from 'lodash'

export default {
  query(message) {
    let { params } = message;
    let local = Queries[message.name](params);
    let remote = Services[message.name](params);
    remote.then(data => {
      console.log('remote promise resolved, deferring write', data)
      _.defer(() => Actions[message.name]({ data, params }));
    });
    return Promise.resolve(local || remote);
  },
  action(message) {
    return Promise.resolve(Actions[message.name](message.params));
  }
}
