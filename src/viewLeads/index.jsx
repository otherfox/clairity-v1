
import React, {PropTypes} from 'react'
import Header from '../shared/components/header'
import Layout from  '../shared/components/layout'
import Table from  '../shared/components/table'

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

import controllable from 'react-controllables'

import {Navigation} from 'react-router'

let viewLeads = React.createClass({
  mixins: [Navigation],

  propTypes: {
    leads: React.PropTypes.object
  },

  getLeads(getLeads) {
    let leads = getLeads;
    return {
      colNames: [
        { label: 'Lead Name', name: 'name', cellType: 'string'},
        { label: 'Account', name: 'customer_name', cellType: 'string'},
        { label: 'Account Owner', name: 'agent_name', cellType: 'string'},
        { label: 'Lead Conversion', name: '__lead_conversion', cellType: 'string'}
      ],
      data: leads.map(s => {
        s.__lead_conversion = <div style={{textAlign: 'center'}}><RaisedButton label={'Convert Lead'} linkButton={true} href={`/#/lead/${s.id}/${s.agent_id}/create`} /></div>;
        return s;
      }),
      colWidths: [5,4,4,3],
      maxWidth: 16,
      widthAdj: -30
    };
  },

  render() {
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
