import React, {PropTypes} from 'react'
import Header from '../shared/components/header'
import Layout from  '../shared/components/layout'
import DropDown from '../shared/components/dropDown'
import Details from  '../shared/components/details'
import {networkModelRenderer, queryRenderer, modelQuery} from '../shared/components/networkRenderer'
import {
  RadioButtonGroup,
  RadioButton,
  Checkbox,
  FlatButton,
  RaisedButton,
  FloatingActionButton,
  IconButton,
  Toggle,
  Slider,
  DropDownMenu,
  DatePicker,
  TextField,
  Paper
} from 'material-ui'

import accountDetails from '../accounts/parts/details'
import OpportunityDetails from './parts/details'
let AccountDetails = networkModelRenderer(accountDetails, 'account');

import controllable from 'react-controllables'
import {List} from 'immutable'
import {State} from 'react-router'

/*
  Form INFO
  let event = 'controller.cfm?event=updateSalesOpp';
  let hiddenValues = {
    customer_id: "1480",
    contact_id: "7223",
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

let viewOpportunity = React.createClass({

  render() {

    let opp = this.props.opportunity.toJS();

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Layout widths={{lg:[8,4], sm:[12,12]}} cPadding={'0 20px 0 0'}>
          <Header><h1>View Opportunity - {opp.name}</h1></Header>
          <RaisedButton style={{float: 'right', marginTop: 25}} primary label="Edit" />
        </Layout>
        <AccountDetails id={opp.customer_id} />
        <OpportunityDetails {...this.props} />
      </Layout>
    );
  }
});

let ViewOpportunity = queryRenderer(viewOpportunity, {
  queries: [
    modelQuery('opportunity', 'opportunity', 'opportunityId')
  ]
});

let ViewOpportunityPage = React.createClass({
  mixins: [State],
  render() {
    return (
      <ViewOpportunity opportunityId={+this.getParams().oppId} />
    );
  }
});

export default ViewOpportunityPage;
