import Router, { HashLocation, HistoryLocation } from 'react-router'
import routes from './routes'

export default Router.create({
  routes,
  location: HistoryLocation
});
