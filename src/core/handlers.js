import Queries from './queries'
import Actions from './actions'
import Services from './services'

export default {
  query(message) {
    console.log('query request received', message);
    return Promise.resolve(Queries[message.name](message.params));
  },
  action(message) {
    console.log('action request received', message);
    return Promise.resolve(message);
  }
}
