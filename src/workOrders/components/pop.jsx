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

class ExistingPops extends React.Component {
  render() {
    return (
      <div>
        <div>Existing POP</div>
        <DropDown menuItems={fromJS([{label: 'Test POP', value: 0}])} />
      </div>
    );
  }
}

class NewPopForm extends React.Component {
  render() {
    return (
      <div>
        <Layout widths={{ lg: [5,7], md: [4,8], sm: [12,12], xs: [12,12], xxs: [12,12]}} cPadding={'0 20px 10px 0'}>
          <div style={{textAlign: 'right'}}><strong>POP Name</strong></div>
          <div><TextField /></div>
        </Layout>
        <Layout widths={{ lg: [5,7], md: [4,8], sm: [12,12], xs: [12,12], xxs: [12,12]}} cPadding={'0 20px 10px 0'}>
          <div style={{textAlign: 'right'}}><strong>POP Address</strong></div>
          <div><TextField /></div>
        </Layout>
      </div>
    );
  }
}

class UnknownPop extends React.Component {
  render() {
    return <div>Unknown POP</div>;
  }
}

export default class POP extends React.Component {

  componentWillMount() {
    this.setState({popType: this.props.workOrder.pop_id ? 0 : 2});
  }

  updatePopType(popType) {
    this.setState({popType});
  }

  render() {
    let PopDisplay = UnknownPop;
    if (this.state.popType === 0) {
      PopDisplay = ExistingPops;
    } else if (this.state.popType === 1) {
      PopDisplay = NewPopForm;
    }
    return (
      <div style={this.props.style}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{ lg: [6,6,12,12], md: [6,6,12,12], sm: [12,12,12,12], xs: [12,12,12,12], xxs: [12,12,12,12]}} cPadding={'0 20px 20px 20px'}>
            <h3>POP Types</h3>
            <div>
              <DropDown selectedValue={this.state.popType} menuItems={fromJS([{label: 'Existing POP', value: 0}, {label: 'New POP', value: 1}, {label: 'Unknown POP', value: 2}])} onChange={this.updatePopType.bind(this)}/>
            </div>
            <div><PopDisplay workOrder={this.props.workOrder} /></div>
            <div style={{float: 'right'}}>
              <RaisedButton primary label="Update" />
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
};
