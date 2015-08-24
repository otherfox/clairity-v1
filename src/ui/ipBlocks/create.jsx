
import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import Details from  '../shared/components/details'
import DropDown from '../shared/components/dropDown'
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
import { List } from 'immutable'

import { Navigation } from 'react-router'

let IpBlocks = React.createClass({
  mixins: [Navigation],

  getBlockDetails(getBlocks) {
    return {
      data: [
        { label: 'Requested Zone', name: 'block', value: <TextField />, cellType: 'string'},
        { label: 'Requested Subnet', name: 'block', value: <TextField />, cellType: 'string'},
        { label: 'Requested Size', name: 'block', value: <TextField />, cellType: 'string'},
        { label: 'Assign Block', name: 'block', value: <TextField />, cellType: 'string'},
        { label: 'Block', name: 'block', value: <TextField />, cellType: 'string'},
        { label: 'Downstream Org ID', name: 'downstream_org_id', value: <TextField />,cellType: 'string'},
        { label: 'Reverse DNS 1', name: 'reverse_dns_1', value: <TextField />,cellType: 'string'},
        { label: 'Reverse DNS 2', name: 'reverse_dns_2', value: <TextField />,cellType: 'string'},
        { label: 'Notes', name: 'notes', value: <TextField />,cellType: 'string'},
      ],
      title: 'Create IP Blocks',
      widths: { lg: ['auto', '320px'] },
      rowStyle: { float: 'left' },
      cStyles: { lg: [{textAlign: 'left'}] },
    }
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  render() {

    let action = "controller.cfm?event=manageIpBlocks";

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Details {...this.getBlockDetails()} />
    </Layout>
    );
  }
});

export default IpBlocks;
