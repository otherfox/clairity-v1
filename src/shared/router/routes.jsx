import React from 'react'
import {Route, RouteHandler, DefaultRoute, NotFoundRoute} from 'react-router'

import App from '../../app'
import AgingReports from '../../agingReports'
import CreateContract from '../../createContract'
import CreateLead from '../../createLead'
import CreateIpBlock from '../../createIpBlock'
import CreateIpZone from '../../createIpZone'
import EditCustomer  from '../../editCustomer'
import EditLead from '../../editLead'
import EditIpBlock from '../../editIpBlock'
import EditIpZone from '../../editIpZone'
import IpBlocks from '../../ipBlocks'
import IpZones from '../../ipZones'
import Login from '../../login'
import OpenInstalls from '../../openInstalls'
import Settings from '../../settings'
import WorkOrders from '../../workOrders'
import WorkOrderUpload from '../../workOrderUpload'
import ViewCustomer from '../../viewCustomer'
import ViewLead from '../../viewLead'
import ViewLeads from '../../viewLeads'
import ViewIpBlock from '../../viewIpBlock'
import ViewIpZone from '../../viewIpZone'


export default (
  <Route>
    <DefaultRoute handler={Login} />
    <Route name="login" path="/login" handler={Login} />
    <Route path="/" handler={App}>
      <Route name="aging-reports" handler={AgingReports} />
      <Route name="customer" path="customer/:id" handler={RouteHandler}>
        <DefaultRoute name="view-customer" handler={ViewCustomer} />
        <Route name="edit-customer" path="edit" handler={EditCustomer} />
      </Route>
      <Route name="create-contract" handler={CreateContract} />
      <Route name="ip-blocks" handler={IpBlocks} />
      <Route name="ip-block" path="ip-block" handler={RouteHandler}>
        <DefaultRoute name="view-ip-block" handler={ViewIpBlock} />
        <Route name="create-ip-block" path="create" handler={CreateIpBlock} />
        <Route name="edit-ip-block" path=":blockId/edit" handler={EditIpBlock} />
      </Route>
      <Route name="ip-zones" handler={IpZones} />
      <Route name="ip-zone" path="ip-zone" handler={RouteHandler}>
        <DefaultRoute name="view-ip-zone" handler={ViewIpZone} />
        <Route name="create-ip-zone" path="create" handler={CreateIpZone} />
        <Route name="edit-ip-zone" path=":zoneId/edit" handler={EditIpZone} />
      </Route>
      <Route name="lead" path="lead/:contactId/:agentId" handler={RouteHandler}>
        <DefaultRoute name="view-lead" handler={ViewLead} />
        <Route name="edit-lead" path="edit" handler={EditLead} />
        <Route name="create-lead" path="create" handler={CreateLead} />
      </Route>
      <Route name="open-installs" handler={OpenInstalls} />
      <Route name="work-orders" path="work-orders/:id" handler={WorkOrders}>
        <Route name="work-order-upload" path="upload" handler={WorkOrderUpload} />
      </Route>
      <Route name="settings" handler={Settings} />
      <Route name="leads" handler={ViewLeads} />
    </Route>
  </Route>
);
