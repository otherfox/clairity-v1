
import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import Details from  '../shared/components/details'
import Header from  '../shared/components/header'
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
import {List} from 'immutable'

import {Navigation} from 'react-router'

let IpZones = React.createClass({
  mixins: [Navigation],

  getZones() {
    return [
      { zoneId: 1, name: 'zone asdf', blocks: <div>66.187.176.0 - 66.187.176.127<br />216.59.211.0 - 216.59.211.25</div> }
    ]
  },

  getZoneTable(getZones) {
    let zones = getZones;
    return {
      colNames: [
        { label: 'Name', name: 'name', cellType: 'string'},
        { label: 'blocks', name: 'blocks', cellType: 'muiDropDown' },
        { label: 'Edit', name: 'edit', cellType: 'string', style: {textAlign: 'center'}}
      ],
      data: zones.map(s => {
        s.edit = <div style={{textAlign: 'center'}}><RaisedButton label={'EDIT'} linkButton={true} href={`/#/ip-zone/${s.zoneId}/edit`} /></div>;
        return s;
      }),
      filters: {
        data: [
          { label: 'Name', name: 'name', filterType: 'muiTextField'},
          { label: '', button: {primary: true, linkButton:true, href:`/#/ip-zone/create`, label:'Add New Zone'}, filterType: 'muiButton'}
        ]
      },
      colWidths: [6,6,2],
      
      widthAdj: -30,
      rowHeight: 80
    };
  },

  render() {

    let action = "controller.cfm?event=manageIpZones";

    return (
      <Layout widths={{}} pPadding={'20px 20px 0 0'}>
        <Header><h1>IP Zones</h1></Header>
        <Table {...this.getZoneTable(this.getZones())} />
    </Layout>
    );
  }
});

export default IpZones;
