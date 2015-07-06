
import React, {PropTypes} from 'react'
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

  proptypes: {
    leads: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      leads: []
    }
  },

  getLeads(getLeads) {
    let leads = getLeads;
    return {
      colNames: [
        { label: 'Service', name: 'full_name', cellType: 'string'},
        { label: 'Name', name: 'actual_name', cellType: 'string' },
        { label: 'Description', name: 'actual_description', cellType: 'string' },
        { label: 'Quantity', name: '__quantity', cellType: 'string' },
        { label: 'NRC', name: 'nrc', cellType: 'currency' },
        { label: 'MRC', name: 'mrc', cellType: 'currency' },
        { label: 'Installed', name: 'install_date', cellType: 'date' }
      ],
      data: leads.map(s => {
        s.__quantity = `${s.quantity} ${s.unit_description || ''}`;
        return s;
      }),
      colWidths: [5, 3, 5, 2, 2, 2, 2, 2],
      maxWidth: 23,
      widthAdj: -100,
      widthPerc: (900/12),
      margin: '0'
    };
  },

  render() {
    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
      <Paper>
        <Layout widths={{}} cPadding={'0 20px 20px 20px'}>
          <h3>
            View Leads
          </h3>
          <Table {...this.getLeads(this.props.leads)} />
        </Layout>
      </Paper>
    </Layout>
    );
  }
});

export default viewLeads;
