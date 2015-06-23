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

const ContractSingle = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    contract: React.PropTypes.object
  },

  getContractData(contract) {
    return [  // Had to condense this into something manageable. 80 lines of inline POJOs was too much for me.
      { label: 'Agent', value: contract.get('agent_name') },
      { label: 'Type', value: contract.getIn(['type','name']) },
      { label: 'Term', value: (contract.get('term')) ? contract.get('term')+' Months' : Date(contract.get('start_date')).toDateString()+' to '+Date(contract.get('end_date')).toDateString() },
      { label: 'Days Until Install', value: contract.get('est_days_till_install') },
      { label: 'Total NRC', value: contract.get('total_nrc') },
      { label: 'Total MRC', value: contract.get('total_mrc') },
      { label: 'Signed', value: new Date(contract.get('signed')).toDateString() },
      { label: 'Installed', value: (contract.get('install_date')) ? new Date(contract.get('install_date')).toDateString() : '' },
      { label: 'Disconnected', value: (contract.get('disconnect_date')) ? new Date(contract.get('disconnect_date')).toDateString() : '' },
      { label: 'Status', value: contract.getIn(['status','name']) },
      { label: 'Billable', value: contract.get('billable') ? 'Yes' : 'No' },
      { label: 'Telecomm Tax Estimate (17%)', value: '// TODO' }
    ];
  },

  render() {
    return (
      <div style={this.props.style}>
        <Layout widths={{lg: [12,12]}} pPadding={'0 20px 20px 20px'}>
          <div>
            <Details data={this.getContractData(this.props.contract)} />
          </div>
        </Layout>
      </div>
    );
  }
});

import networkRenderer from '../../shared/components/networkRenderer'

export default networkRenderer(ContractSingle, 'contract');
