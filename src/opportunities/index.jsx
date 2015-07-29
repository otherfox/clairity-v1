import React, {PropTypes} from 'react'
import Header from '../shared/components/header'
import Layout from  '../shared/components/layout'
import { networkModelRenderer } from '../shared/components/networkRenderer'
import { RaisedButton } from 'material-ui'
import { State, Link } from 'react-router'
import { fromJS } from 'immutable'
import OpportunityDetails from './public/details'

import AccountDetails from '../accounts/public/details'
let AccountDetailsAgent = networkModelRenderer(AccountDetails, 'user')


let viewOpportunity = React.createClass({
  mixins: [State],

  render() {

    let opp = this.props.opportunity;

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Layout widths={{lg:[8,4], sm:[12,12]}} cPadding={'0 20px 0 0'}>
          <Header><h1>View Opportunity - {opp.name}</h1></Header>
          <Link to="edit-opp" params={this.getParams()}>
            <RaisedButton style={{float: 'right', marginTop: 25}} primary label="Edit" />
          </Link>
        </Layout>
        {
          opp.customer.user_id ?
            <AccountDetailsAgent account={fromJS(opp.customer)} id={opp.customer.user_id} />
          :
            <AccountDetails account={fromJS(opp.customer)} user={null} />
        }
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
