
import React, {PropTypes, Component} from 'react'
import Header from '../shared/components/header'
import Layout from  '../shared/components/layout'
import Table from  '../shared/components/table'
import Cards from '../shared/components/cards'
import Details from '../shared/components/details'
import { RaisedButton } from 'material-ui'
import { Filters, FilteredCollection, TextFilter} from '../shared/components/filteredCollection'
import {networkCollectionRenderer} from '../shared/components/networkRenderer'

import _ from 'lodash'
import controllable from 'react-controllables'
import Link from '../shared/components/link'

class ViewLeads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leads: this.props.leads
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ leads: props.leads });
  }

  getLeads(getLeads) {

    let leads = getLeads;
    let names = _.map(leads, _.property('name'));
    let accounts = _.map(leads, _.property('customer_name'));
    let owners = _.map(leads, _.property('agent_name'));

    return {
      colNames: [
        { label: 'Lead Name', name: 'name', cellType: 'contact'},
        { label: 'Account', name: 'customer_name', cellType: 'account', props: { idField: 'customer_id' } },
        { label: 'Account Owner', name: 'agent_name', cellType: 'agent'},
        { label: 'Lead Conversion', name: '__lead_conversion', cellType: 'string', style: {textAlign: 'center'}}
      ],
      data: leads.map(s => {
        s.__lead_conversion = (
          <div style={{textAlign: 'center'}}>
            <Link to="add-contact-opp" params={{contactId: s.id, userId: s.agent_id}}>
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

      widthAdj: -30
    };
  }

  render() {
    return (
      <Layout widths={{}} pPadding={'20px 20px 0 0'}>
          <Header><h1>View Leads</h1></Header>
          <FilteredCollection data={this.state.leads}>
            <Filters>
              <TextFilter name={'name'} label={'Name'} />
              <TextFilter name={'customer_name'} label={'Account'} />
              <TextFilter name={'agent_name'} label={'Account Owner'} />
            </Filters>
            <Cards {...this.getLeads(this.state.leads)} />
          </FilteredCollection>
      </Layout>
    );
  }
}

export default networkCollectionRenderer(ViewLeads, { tableName: 'lead' });
