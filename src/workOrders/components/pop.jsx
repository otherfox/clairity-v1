import React from 'react'
import Settings from '../../shared/components/settings'
import Layout from '../../shared/components/layout'
import DropDown from '../../shared/components/dropDown'
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

import {fromJS} from 'immutable'

// Make available for use in all components
let widths = { lg: [6,6], md: [6,6], sm: [12,12], xs: [12,12], xxs: [12,12] };
let cPadding = '0 20px 20px 20px';

class ExistingPops extends React.Component {
  render() {
    return (
      <Layout {...{widths, cPadding}}>
        <div />
        <DropDown menuItems={fromJS([{label: 'Test POP', value: 0}])} />
      </Layout>
    );
  }
}

class NewPopForm extends React.Component {
  render() {
    return (
      <div>
        <Layout widths={{ lg: [6,6], md: [4,8], sm: [12,12], xs: [12,12], xxs: [12,12]}} cPadding={'0 20px 10px 0'}>
          <div style={{textAlign: 'right'}}><strong>POP Name</strong></div>
          <div><TextField /></div>
        </Layout>
        <Layout widths={{ lg: [6,6], md: [4,8], sm: [12,12], xs: [12,12], xxs: [12,12]}} cPadding={'0 20px 10px 0'}>
          <div style={{textAlign: 'right'}}><strong>POP Address</strong></div>
          <div><TextField /></div>
        </Layout>
      </div>
    );
  }
}

class UnknownPop extends React.Component {
  render() {
    return <div />;
  }
}

export default class POP extends React.Component {

  componentWillMount() {
    this.setState({popType: this.props.workOrder.pop_id ? 0 : 2});
  }

  updatePopType(popType) {
    this.setState({popType});
  }

  getPopDisplay(type) {
    if (type === 0) {
      return ExistingPops;
    } else if (type === 1) {
      return NewPopForm;
    }
    return UnknownPop;
  }

  render() {
    let PopDisplay = this.getPopDisplay(this.state.popType);

    return (
      <div style={this.props.style}>
        <Paper zDepth={1} rounded={true}>
          <Layout {...{widths, cPadding}}>
            <h3>POP Types</h3>
            <DropDown style={{paddingTop: 20}}
                      selectedValue={this.state.popType}
                      menuItems={fromJS([{label: 'Existing POP', value: 0}, {label: 'New POP', value: 1}, {label: 'Unknown POP', value: 2}])}
                      onChange={this.updatePopType.bind(this)} />
          </Layout>
          <PopDisplay workOrder={this.props.workOrder}/>
          <Layout {...{widths, cPadding}}><div /><RaisedButton primary label="Update" /></Layout>
        </Paper>
      </div>
    );
  }
};
