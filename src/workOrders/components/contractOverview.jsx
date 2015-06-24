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
import Details from '../../shared/components/details'

import ContractSingle from './contractSingle'

import Location from '../services/stubs/location6384.json'
import WorkOrder from '../services/stubs/order1583.json'
import Contract from '../services/stubs/contract7416.json'

import {List, Map, fromJS} from 'immutable'

const ContractOverview = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    id: React.PropTypes.number,
    location: React.PropTypes.object,
    order: React.PropTypes.object,
    contract: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      location: fromJS(Location),
      order: fromJS(WorkOrder),
      contract: fromJS(Contract)
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

        let signed = new Date(contract.get('signed'));

        return new Map({
          key: contract.get('id'),
          value: contract.get('id'),
          label: (contract.get('services')) ? 'Signed '+signed.toDateString()+' - '+contract.getIn(['services', 1,'actual_name']) :  'Signed '+signed.toDateString()
        });
      }
    });

    return new List(contracts);
  },

  handleContractChange(value) {
    this.setState({ selectedContract: value});
  },

  render() {

    return (
      <div style={this.props.style}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{lg: [3, 9,12], md: [12, 12,12], sm: [12, 12,12], xs: [12, 12,12]}} pPadding={'0 20px 20px 20px'}>
            <div>
              <h3>Contracts</h3>
            </div>
            <div>
              <DropDown style={{paddingTop: '10px'}}menuItems={this.getContracts()} selectedValue={this.state.selectedContract} onChange={this.handleContractChange}/>
            </div>
            <div>
              <ContractSingle id={this.state.selectedContract} />
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default ContractOverview;
