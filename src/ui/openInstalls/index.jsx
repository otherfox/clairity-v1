
import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
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

import { Navigation } from 'react-router'

let OpenInstalls = React.createClass({
  mixins: [Navigation],

  componentDidMount() {
    loginSuccess.listen(() => this.transitionTo('aging-reports'));
  },

  tryLogin(username, password) {
    tryLogin(username, password);
  },

  render() {
    return (
      <div>Open installs page</div>
    );
  }
});

export default OpenInstalls;
