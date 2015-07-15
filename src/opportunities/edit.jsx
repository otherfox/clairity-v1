import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import DropDown from '../shared/components/dropDown'
import Details from  '../shared/components/details'
import {networkModelRenderer} from '../shared/components/networkRenderer'
import Header from '../shared/components/header'
import {
  Checkbox,
  RaisedButton,
  TextField,
  Paper
} from 'material-ui'

import { List, Map } from 'immutable'
import { State, Link } from 'react-router'

import editAccountDetails from '../accounts/parts/editDetails'
let EditAccountDetails = networkModelRenderer(editAccountDetails, 'account');

import EditDetails from './parts/editDetails'

/*
let event = 'controller.cfm?event=updateSalesOpp';
let hiddenValues = {
  customer_id: "1480",
  oportunity_id: "7223",
  tax_exempt: false,
  summary_billing: false,
  show_international: true,
  show_long_distance: false,
  email_invoice: false,
  invoice_weekly: false,
  vip: false,
  auto_pay: false,
};
*/

let editOpportunity = React.createClass({
  mixins: [State],

  render() {
    let opp = this.props.opportunity.toJS();

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Layout widths={{lg:[8,4], sm:[12,12]}} cPadding={'0 20px 0 0'}>
          <Header><h1>Edit Opportunity - {opp.name}</h1></Header>
          <Link to="view-opp" params={this.getParams()}>
            <RaisedButton style={{float: 'right', marginTop: 25}} secondary label="Return" />
          </Link>
        </Layout>
        <EditAccountDetails id={opp.customer_id} />
        <EditDetails {...this.props} />
        <RaisedButton style={{float: 'right', marginTop: 25}} primary label="Update" />
      </Layout>
    );
  }
});

let EditOpportunity = networkModelRenderer(editOpportunity, 'opportunity');

let EditOpportunityPage = React.createClass({
  mixins: [State],
  render() {
    return <EditOpportunity id={+this.getParams().oppId} />;
  }
});

export default EditOpportunityPage;
