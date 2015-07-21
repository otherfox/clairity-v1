import React from 'react'
import {
  Route,
  RouteHandler,
  DefaultRoute,
  NotFoundRoute,
  Redirect
} from 'react-router'

import {App, NavigationLayout} from '../../app'

/* Session Management */
import Login from '../../login'
import Settings from '../../settings'

/* Reports */
import AgingReports from '../../reports/aging'
import OpenInstalls from '../../openInstalls'

/* Accounts */
import ViewAccount from '../../accounts'
import EditAccount  from '../../accounts/edit'
import SearchAccount from '../../accounts/search'

/* Contacts */
import ViewContact from '../../contacts'
import ViewLeads from '../../contacts/leads'

/* Contracts */
import CreateContract from '../../contracts/create'
import ListContracts from '../../contracts/list'

/* Opportunities */
import ViewOpportunity from '../../opportunities'
import EditOpportunity from '../../opportunities/edit'
import ListOpportunities from '../../opportunities/list'
import CreateOpportunity from '../../opportunities/create'
import CreateUnlinkedOpportunity from '../../opportunities/create/unlinked'

/* Ip Zones */
import IpZones from '../../ipZones'
import EditIpZone from '../../ipZones/edit'
import ViewIpZone from '../../ipZones/view'
import CreateIpZone from '../../ipZones/create'

/* Ip Blocks */
import IpBlocks from '../../ipBlocks'
import EditIpBlock from '../../ipBlocks/edit'
import ViewIpBlock from '../../ipBlocks/view'
import CreateIpBlock from '../../ipBlocks/create'

/* Work Orders */
import WorkOrders from '../../workOrders'
import WorkOrderUpload from '../../workOrders/upload'

export default (
  <Route>
    <Redirect from="/" to="login" />
    <Route handler={App}>
      <Route name="login" path="/login" handler={Login} />
      <Route name="root-layout" path="/" handler={NavigationLayout}>
        <Route name="aging-reports" handler={AgingReports} />


        <Route {/***** IP Blocks *****/...{}}>
          <Redirect from="ip-blocks" to="all-ip-blocks" />
          <Route name="ip-blocks" path="ip-blocks" handler={RouteHandler}>
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
              <Route path="edit" name="edit-customer" handler={EditAccount} />
              <Route path="contracts" handler={RouteHandler}>
                <DefaultRoute name="view-contracts" handler={ListContracts} />
                <Route name="add-contract" handler={CreateContract} />
                <Route name="list-contracts" handler={ListContracts} />
                <Route name="list-opps" handler={ListOpportunities} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route {/***** Opportunities *****/...{}}>
          <Redirect from="opps" to="all-opps" />
          <Route name="opps" handler={RouteHandler}>
            <Route path=":oppId" handler={RouteHandler}>
              <DefaultRoute name="view-opp" handler={ViewOpportunity} />
              <Route name="edit-opp" path="edit" handler={EditOpportunity} />
              <Route name="opps-contacts" path="contacts" handler={RouteHandler}>
                <DefaultRoute name="opps-contact-list" handler={RouteHandler} />
                <Route name="add-opp-contact" path="add" handler={CreateOpportunity} />
              </Route>
            </Route>
            <Route name="new-opp" path="create  " handler={CreateUnlinkedOpportunity} />
            <Route name="all-opps" path="all" handler={ListOpportunities} />
          </Route>
        </Route>

        <Route {/***** Contacts *****/...{}}>
          <Redirect from="contacts" to="all-contacts" />
          <Route name="contacts" handler={RouteHandler}>
            <Route path=":contactId" handler={RouteHandler}>
              <DefaultRoute name="view-contact" handler={ViewContact} />
              <Route name="contact-opps" path="opps" handler={RouteHandler}>
                <DefaultRoute name="contact-opps-list" handler={RouteHandler} />
              </Route>
            </Route>
            <Route name="all-contacts" path="all" handler={ViewLeads} />
          </Route>
        </Route>

        <Route {/***** Leads *****/...{}}>
          <Redirect from="leads" to="all-leads" />
          <Route name="leads" handler={RouteHandler}>
            <Route path=":contactId/:agentId" handler={RouteHandler}>
              <Route name="add-contact-opp" path="convert" handler={CreateOpportunity} />
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
