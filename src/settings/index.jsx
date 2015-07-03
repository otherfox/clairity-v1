
import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import Details from  '../shared/components/details'
import Footer from  '../shared/components/footer'
import TopNav from '../shared/components/topnav'
import LeftNav from '../shared/components/leftnav'
import Content from '../shared/components/content'
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

let Settings = React.createClass({
  mixins: [Navigation],

  render() {
    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
      <Paper>
        <Layout widths={{}} cPadding={'0 20px 20px 20px'}>
          <Details
            title={'Settings'}
            data={[
                {label: '', value: <Layout><Toggle labelStyle={{ minWidth: '100px'}} name="compactView"  value="false"  label="Compact View" /></Layout>},
                {},
            ]}
          />
        </Layout>
      </Paper>
    </Layout>
    );
  }
});

export default Settings;
