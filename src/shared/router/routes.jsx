import React from 'react'
import {Route, RouteHandler, DefaultRoute, NotFoundRoute, Redirect} from 'react-router'

import {App, NavigationLayout} from '../../app'
import AgingReports from '../../agingReports'
import CreateContract from '../../createContract'
import CreateOpportunity from '../../createOpportunity'
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
import ViewAccount from '../../viewAccount'
import SearchAccount from '../../SearchAccount'
import ViewLead from '../../viewLead'
import ViewLeads from '../../viewLeads'
import ViewIpBlock from '../../viewIpBlock'
import ViewIpZone from '../../viewIpZone'

export default (
  <Route>
    <Redirect from="/" to="login" />
    <Route handler={App}>
      <Route name="login" path="/login" handler={Login} />
      <Route name="root-layout" path="/" handler={NavigationLayout}>
        <Route name="aging-reports" handler={AgingReports} />
        <Route name="customer" path="customer/:id" handler={RouteHandler}>
          <DefaultRoute name="view-customer" handler={ViewAccount} />
          <Route name="edit-customer" path="edit" handler={EditCustomer} />
        </Route>
        <Route name="create-contract" handler={CreateContract} />

        <Route {/***** IP Blocks *****/...{}}>
          <Redirect from="ip-blocks" to="all-ip-blocks" />
          <Route name="ip-blocks" path="ip-block" handler={RouteHandler}>
            <Route name="all-ip-blocks" path="all" handler={IpBlocks} />
            <Route name="view-ip-block" path=":blockId" handler={RouteHandler}>
              <DefaultRoute name="view-ip-block-index" handler={ViewIpBlock} />
              <Route name="edit-ip-block" path="edit" handler={EditIpBlock} />
            </Route>
            <Route name="create-ip-block" path="create" handler={CreateIpBlock} />
          </Route>
        </Route>

        <Route {/***** IP Zones *****/...{}}>
          <Route name="ip-zones" handler={IpZones} />
          <Route name="ip-zone" path="ip-zone" handler={RouteHandler}>
            <DefaultRoute name="view-ip-zone" handler={ViewIpZone} />
            <Route name="create-ip-zone" path="create" handler={CreateIpZone} />
            <Route name="edit-ip-zone" path=":zoneId/edit" handler={EditIpZone} />
          </Route>
        </Route>

        <Route {/***** Accounts *****/...{}}>
          <Route name="accounts" handler={RouteHandler}>
            <Route name="search-accounts" path="search" handler={SearchAccount} />
            <Route path=":accountId/:locationId" handler={RouteHandler}>
              <DefaultRoute name="view-account" handler={ViewAccount} />
            </Route>
          </Route>
        </Route>

        <Route {/***** Leads *****/...{}}>
          <Redirect from="leads" to="all-leads" />
          <Route name="leads" handler={RouteHandler}>
            <Route path=":contactId/:agentId" handler={RouteHandler}>
              <DefaultRoute name="view-lead" handler={ViewLead} />
              <Route name="edit-lead" path="edit" handler={EditLead} />
              <Route name="contact-opps" path="opps" handler={RouteHandler}>
                <DefaultRoute name="contact-opps-list" handler={RouteHandler} />
                <Route name="add-contact-opp" path="add" handler={CreateOpportunity} />
              </Route>
            </Route>
            <Route name="all-leads" path="all" handler={ViewLeads} />
          </Route>
        </Route>

        <Route name="open-installs" handler={OpenInstalls} />
        <Route name="work-orders" path="work-orders/:id" handler={WorkOrders}>
          <Route name="work-order-upload" path="upload" handler={WorkOrderUpload} />
        </Route>
        <Route name="settings" handler={Settings} />
      </Route>
    </Route>
  </Route>
);
