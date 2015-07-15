import React, {PropTypes} from 'react'
import Header from '../shared/components/header'
import Layout from  '../shared/components/layout'
import DropDown from '../shared/components/dropDown'
import Details from  '../shared/components/details'
import {networkModelRenderer, queryRenderer, modelQuery} from '../shared/components/networkRenderer'
import { RaisedButton } from 'material-ui'

import accountDetails from '../accounts/parts/details'
import OpportunityDetails from './parts/details'
let AccountDetails = networkModelRenderer(accountDetails, 'account');

import controllable from 'react-controllables'
import {State, Link} from 'react-router'

let viewOpportunity = React.createClass({
  mixins: [State],

  render() {

    let opp = this.props.opportunity.toJS();

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Layout widths={{lg:[8,4], sm:[12,12]}} cPadding={'0 20px 0 0'}>
          <Header><h1>View Opportunity - {opp.name}</h1></Header>
          <Link to="edit-opp" params={this.getParams()}>
            <RaisedButton style={{float: 'right', marginTop: 25}} primary label="Edit" />
          </Link>
        </Layout>
        <AccountDetails id={opp.customer_id} />
        <OpportunityDetails {...this.props} />
      </Layout>
    );
  }
});

let ViewOpportunity = networkModelRenderer(viewOpportunity, 'opportunity');

let ViewOpportunityPage = React.createClass({
  mixins: [State],
  render() {
    return <ViewOpportunity id={+this.getParams().oppId} />;
  }
});

export default ViewOpportunityPage;
