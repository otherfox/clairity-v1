
import React, {PropTypes} from 'react'
import Header from '../shared/components/header'
import Layout from  '../shared/components/layout'
import Table from  '../shared/components/table'
import Details from '../shared/components/details'
import { Typeahead } from '../shared/components/typeahead'
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
    let accounts = _.map(leads, _.property('name'));
    let owners = _.map(leads, _.property('name'));

    return {
      colNames: [
        { label: 'Lead Name', name: 'name', cellType: 'string'},
        { label: 'Account', name: 'customer_name', cellType: 'string'},
        { label: 'Account Owner', name: 'agent_name', cellType: 'string'},
        { label: 'Lead Conversion', name: '__lead_conversion', cellType: 'string'}
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
        component: <Details
            widths={ {lg: ['auto', '320px']}}
            rowStyle={{ float: 'left' }}
            cStyles={{ lg: [{textAlign: 'left'}] }}
            data={[
              { label: 'Name', value: <Typeahead options={names} maxVisible={10} />, detailType: 'muiTextField' },
              { label: 'Account', value: <Typeahead options={accounts} maxVisible={10} />, detailType: 'muiTextField' },
              { label: 'Owner', value: <Typeahead options={owners} maxVisible={10} />, detailType: 'muiTextField' }
          ]}
        />
      },
      colWidths: [5,4,4,3],
      maxWidth: 16,
      widthAdj: -30
    };
  },

  render() {

    let leads = this.props.leads.toJS();

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
      <div>
        <Header><h1>View Leads</h1></Header>
        <Table {...this.getLeads(this.props.leads.toJS())} />
      </div>
    </Layout>
    );
  }
});

import {networkCollectionRenderer} from '../shared/components/networkRenderer'

export default networkCollectionRenderer(viewLeads, { tableName: 'lead' });

//export default viewLeads;
