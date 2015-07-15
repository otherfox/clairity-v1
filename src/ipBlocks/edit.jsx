
import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import DropDown from '../shared/components/dropDown'
import Details from  '../shared/components/details'
import Link from '../shared/components/link'
import Header from '../shared/components/header'

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
import {List} from 'immutable'
import {Navigation} from 'react-router'

let EditIpBlock = React.createClass({
  mixins: [Navigation],

  render() {

    let hiddenValues = {
      zone_id: "1480"
    };

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
      <div>
        <Header><h1>Edit IP Block</h1></Header>
        <div><RaisedButton label={'Assign New Block'} primary /> <RaisedButton label={'Refresh'} /></div>
      </div>
      <Paper>
        <Layout widths={{ lg: [6,6,6] }} cPadding={'0 20px 20px 20px'} pPadding={'20px 0 0 0'}>
          <Details
            cStyles={{ lg: [{textAlign: 'right'}]}}
            widths={{ lg: [5,7]}}
            data={[
              { label: 'Block', name: 'zoneName', value: <div><TextField value={'66.187.176.8/32'} style={{ }} /></div>, detailType: 'muiTextField' },
              { label: 'Status', name: 'zoneName', value: <div><TextField value={'active'} style={{ }} /></div>, detailType: 'muiTextField' },
              { label: 'Downstream Org ID', name: 'zoneName', value: <div><TextField value={''} style={{ }} /></div>, detailType: 'muiTextField' },
              { label: 'Reverse DNS 1', name: 'zoneName', value: <div><TextField value={''} style={{ }} /></div>, detailType: 'muiTextField' },
              { label: 'Reverse DNS 2', name: 'zoneName', value: <div><TextField value={''} style={{ }} /></div>, detailType: 'muiTextField' },
              { label: 'notes', name: 'zoneName', value: <div><TextField mutiline={true} value={''} style={{ }} /></div>, detailType: 'muiTextField' }
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'right'}]}}
            widths={{ lg: [3,9]}}
            data={[
              { label: 'Customer', name: 'zoneName', value: <div><DropDown menuItems={new List([{ label: 'Customer', value: 2}])} style={{ }} /></div>, detailType: 'muiDropDown' },
              { label: 'POP', name: 'zoneName', value: <div><DropDown menuItems={new List([{ label: '', value: 2}])} style={{ }} /></div>, detailType: 'muiDropDown' },
              { label: 'Transit Circuit', name: 'zoneName', value: <div><DropDown menuItems={new List([{ label: '', value: 2}])} style={{ }} /></div>, detailType: 'muiDropDown' },
              { label: 'Provider Circuit', name: 'zoneName', value: <div><DropDown menuItems={new List([{ label: '', value: 2}])} style={{ }} /></div>, detailType: 'muiDropDown' },
              { label: 'Internal', name: 'zoneName', value: <div><TextField mutiline={true} value={''} style={{ }} /></div>, detailType: 'muiTextField' }
            ]}
          />
        </Layout>
      </Paper>
    </Layout>
    );
  }
});

export default EditIpBlock;
