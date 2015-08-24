import Queries from './queries'
import Actions from './actions'
import Services from './services'
import _ from 'lodash'

export default {
  query(message) {
    console.log('Query Message handler', message);
    let { params, token } = message;
    let local = Queries[message.name](params);
    let remote = Services[message.name](params);
    remote.then(data => {
      console.log('remote promise resolved, deferring write', data)
      _.defer(() => Actions[message.name]({ data, params, token }));
    });
    console.log('Query Message handler', 'returning promise', local ? 'local' : 'remote')
    return Promise.resolve(local || remote);
  },
  action(message) {
    return Promise.resolve(Actions[message.name](message.params));
  }
}
