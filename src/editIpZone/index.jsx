
import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import DropDown from '../shared/components/dropDown'
import Details from  '../shared/components/details'

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

let editIpZone = React.createClass({
  mixins: [Navigation],

  render() {

    let hiddenValues = {
      zone_id: "1480"
    };

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <h1></h1>
      <Paper>
        <Layout widths={{ lg: [12, 6,6] }} cPadding={'0 20px 20px 20px'}>
          <Details
            cStyles={{ lg: [{textAlign: 'right'}]}}
            layout={{ lg: [1,11]}}
            title={'Edit IP Zone'}
            data={[
              { label: 'Zone', name: 'zoneName', value: <div><TextField value={'zone asdf'} style={{ }} /><RaisedButton style={{position: 'absolute', marginLeft: '20px', textAlign: 'center'}} primary label={'Save'} linkButton={true} href={`/#/ip-zones`} /></div>, detailType: 'muiTextField' }
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'right'}]}}
            layout={{ lg: [2,10]}}
            data={[
              { label: 'Range 1', name: 'range1', value: <div><TextField value={'66.187.176.0'} style={{marginRight: '20px'}}/><TextField value={'66.187.176.127'}/></div>, detailType: 'muiTextField' },
              { label: 'Range 2', name: 'range1', value: <div><TextField value={'216.59.211.0'} style={{marginRight: '20px'}}/><TextField value={'216.59.211.25'}/></div>, detailType: 'muiTextField' },
              { label: 'Range 3', name: 'range1', value: <div><TextField value={''} style={{marginRight: '20px'}}/><TextField value={''}/></div>, detailType: 'muiTextField' },
              { label: 'Range 4', name: 'range1', value: <div><TextField value={''} style={{marginRight: '20px'}}/><TextField value={''}/></div>, detailType: 'muiTextField' },
              { label: 'Range 5', name: 'range1', value: <div><TextField value={''} style={{marginRight: '20px'}}/><TextField value={''}/></div>, detailType: 'muiTextField' },
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'right'}]}}
            layout={{ lg: [2,10]}}
            data={[
              { label: 'Range 6', name: 'range1', value: <div><TextField value={''} style={{marginRight: '20px'}}/><TextField value={''}/></div>, detailType: 'muiTextField' },
              { label: 'Range 7', name: 'range1', value: <div><TextField value={''} style={{marginRight: '20px'}}/><TextField value={''}/></div>, detailType: 'muiTextField' },
              { label: 'Range 8', name: 'range1', value: <div><TextField value={''} style={{marginRight: '20px'}}/><TextField value={''}/></div>, detailType: 'muiTextField' },
              { label: 'Range 9', name: 'range1', value: <div><TextField value={''} style={{marginRight: '20px'}}/><TextField value={''}/></div>, detailType: 'muiTextField' },
              { label: 'Range 10', name: 'range1', value: <div><TextField value={''} style={{marginRight: '20px'}}/><TextField value={''}/></div>, detailType: 'muiTextField' }
            ]}
          />
        </Layout>
      </Paper>
    </Layout>
    );
  }
});

export default editIpZone;
