
import React, {PropTypes} from 'react'
import Header from '../shared/components/header'
import Layout from  '../shared/components/layout'
import Table from  '../shared/components/table'
import Details from '../shared/components/details'
import { RaisedButton } from 'material-ui'

import _ from 'lodash'
import controllable from 'react-controllables'
import {Navigation, Link} from 'react-router'

let viewLeads = React.createClass({
  mixins: [Navigation],

  propTypes: {
    leads: React.PropTypes.object
  },

  getLeads(getLeads) {

    let leads = getLeads;
    let names = _.map(leads, _.property('name'));
    let accounts = _.map(leads, _.property('customer_name'));
    let owners = _.map(leads, _.property('agent_name'));

    return {
      colNames: [
        { label: 'Lead Name', name: 'name', cellType: 'contact'},
        { label: 'Account', name: 'customer_name', cellType: 'account'},
        { label: 'Account Owner', name: 'agent_name', cellType: 'agent'},
        { label: 'Lead Conversion', name: '__lead_conversion', cellType: 'string', style: {textAlign: 'center'}}
      ],
      data: leads.map(s => {
        s.__lead_conversion = (
          <div style={{textAlign: 'center'}}>
            <Link to="add-contact-opp" params={{contactId: s.id, agentId: s.agent_id}}>
              <RaisedButton label={'convert lead'}/>
            </Link>
          </div>
        );
        return s;
      }),
      filters: {
        data: [
          { label: 'Name', filterType: 'muiTextField', name: 'name' },
          { label: 'Account', filterType: 'muiTextField', name: 'customer_name' },
          { label: 'Account Owner', filterType: 'muiTextField', name: 'agent_name' }
        ]
      },
      colWidths: [5,4,4,3],
      maxWidth: 16,
      widthAdj: -30
    };
  },

  render() {

    let leads = this.props.leads.toJS();

    return (
      <Layout widths={{}} pPadding={'20px 20px 0 0'}>
          <Header><h1>View Leads</h1></Header>
          <Table {...this.getLeads(this.props.leads.toJS())} />
      </Layout>
    );
  }
});

import {networkCollectionRenderer} from '../shared/components/networkRenderer'

export default networkCollectionRenderer(viewLeads, { tableName: 'lead' });

//export default viewLeads;
