import React from 'react'
import {Route, RouteHandler, DefaultRoute, NotFoundRoute} from 'react-router'

import App from '../../app'
import AgingReports from '../../agingReports'
import EditCustomer  from '../../editCustomer'
import CreateContract from '../../createContract'
import Login from '../../login'
import OpenInstalls from '../../openInstalls'
import WorkOrders from '../../workOrders'
import WorkOrderUpload from '../../workOrderUpload'
import ViewCustomer from '../../viewCustomer'

export default (
  <Route>
    <DefaultRoute handler={Login} />
    <Route path="/" handler={App}>
      <Route name="aging-reports" handler={AgingReports} />
      <Route name="customer" path="customer/:id" handler={RouteHandler}>
        <DefaultRoute name="view-customer" handler={ViewCustomer} />
        <Route name="edit-customer" path="edit" handler={EditCustomer} />
      </Route>
      <Route name="create-contract" handler={CreateContract} />
      <Route name="open-installs" handler={OpenInstalls} />
      <Route name="work-orders" path="work-orders/:id" handler={WorkOrders}>
        <Route name="work-order-upload" path="upload" handler={WorkOrderUpload} />
      </Route>
    </Route>
    <Route name="login" path="/login" handler={Login} />
  </Route>
);
