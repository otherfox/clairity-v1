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

import Location from '../services/stubs/location6384.json'
import WorkOrder from '../services/stubs/order1583.json'
import Contract from '../services/stubs/contract7416.json'

import {Map, fromJS} from 'immutable'

let ContractOverview = React.createClass ({

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
          value: contract.get('id'),
          label: (contract.get('services')) ? 'Signed '+signed.toDateString()+' - '+contract.getIn(['services', 1,'actual_name']) :  'Signed '+signed.toDateString()
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

    let contract = this.props.contract;

    let data = [
      {
        label: 'Agent',
        value: contract.get['agent_name']
      },
      {
        label: 'Type',
        value: contract.getIn(['type','name'])
      },
      {
        label: 'Term',
        value: (contract.get('term')) ? contract.get('term')+' Months' : Date(contract.get('start_date')).toDateString()+' to '+Date(contract.get('end_date')).toDateString()
      },
      {
        label: 'Days Until Install',
        value: contract.get('est_days_till_install')
      },
      {
        label: 'Total NRC',
        value: contract.get('total_nrc')
      },
      {
        label: 'Total MRC',
        value: contract.get('total_mrc')
      },
      {
        label: 'Signed',
        value: new Date(contract.get('signed')).toDateString()
      },
      {
        label: 'Installed',
        value: (contract.get('install_date')) ? new Date(contract.get('install_date')).toDateString() : ''
      },
      {
        label: 'Disconnected',
        value: (contract.get('disconnect_date')) ? new Date(contract.get('disconnect_date')).toDateString() : ''
      },
      {
        label: 'Status',
        value: contract.getIn(['status','name'])
      },
      {
        label: 'Billable',
        value: contract.get('billable') ? 'Yes' : 'No'
      },
      {
        label: 'Telecomm Tax Estimate (17%)',
        value: ''
      }
    ];

    return (
      <div style={this.style()}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{lg: [12,12]}} pPadding={'0 20px 20px 20px'}>
            <div>
              <DropDown menuItems={this.getContracts()} selectedValue={this.state.selectedContract} onChange={this.handleContractChange}/>
            </div>
            <div>
              <Details data={data} />
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default ContractOverview;
