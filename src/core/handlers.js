import Queries from './queries'
import Actions from './actions'
import Services from './services'
import _ from 'lodash'

export default {
  query(message) {
    console.log('query request received', message);
    let { params } = message;
    let local = Queries[message.name](params);
    let remote = Services[message.name](params);
    remote.then(data => {
      console.log('remote promise resolved, deferring write', data)
      _.defer(() => Actions[message.name]({ data, params }));
    });
    console.log('return promise resolved with', local || remote);
    return Promise.resolve(local || remote);
  },
  action(message) {
    console.log('action request received', message);
    return Promise.resolve(Actions[message.name](message.params));
  }
}
