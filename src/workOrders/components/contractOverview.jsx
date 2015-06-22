import React from 'react'
import Settings from '../../shared/components/settings'
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

import Layout from '../../shared/components/layout'
import DropDown from '../../shared/components/dropDown'

import Location from '../services/stubs/location6384.json'
import WorkOrder from '../services/stubs/order1583.json'

import {Map, fromJS} from 'immutable'

let ContractOverview = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    id: React.PropTypes.number,
    location: React.PropTypes.object,
    order: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      location: fromJS(Location),
      order: fromJS(WorkOrder)
    }
  },

  getInitialState() {
    return {
      selectedContract: this.props.order.get('contract_id')
    };
  },

  getContracts() {
    let contracts = this.props.location.get('contracts').map((contract, idx) => {
      if(contract.get('signed')) {
        return new Map({
          value: contract.get('id'),
          label: contract.get('signed')
        });
      }
    });

    return contracts.toList();
  },

  handleContractChange(value) {
    this.setState({ selectedContract: value});
  },

  style() {
    let style = {};

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  render() {
    return (
      <div style={this.style()}>
        <Paper zDepth={1} rounded={true}>
          <Layout pPadding={'0 20px 20px 20px'}>
            <DropDown menuItems={this.getContracts()} selectedValue={this.state.selectedContract} onChange={this.handleContractChange}/>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default ContractOverview;
