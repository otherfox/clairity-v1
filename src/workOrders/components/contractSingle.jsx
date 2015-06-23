import React from 'react'
import Settings from '../../shared/components/settings'
import Table from '../../shared/components/table'
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

class YesNoCell extends React.Component {
  render() {
    if(this.props.children) {
      var status = <div className="c-green"><span className="md md-check"></span> Yes</div>;
    } else {
      var status = <div className="c-a-1"><span className="md md-close"></span> No</div>;
    }
    return status;
  }
}

const ContractSingle = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    contract: React.PropTypes.object
  },

  getContractData(contract) {

    let colNames = [
      { label: 'Agent', name: 'agent_name',value: contract.get('agent_name'), cellType: 'string' },
      { label: 'Type', name: 'type_name',value: contract.getIn(['type','name']), cellType: 'string' },
      { label: 'Term', name: 'term',value: (contract.get('term')) ? contract.get('term')+' Months' : Date(contract.get('start_date')).toDateString()+' to '+Date(contract.get('end_date')).toDateString(), cellType: 'string' },
      { label: 'Days Until Install', name: 'est_days_till_install',value: contract.get('est_days_till_install'), cellType: 'string' },
      { label: 'Total NRC', name: 'total_nrc',value: contract.get('total_nrc'), cellType: 'string' },
      { label: 'Total MRC', name: 'total_mrc',value: contract.get('total_mrc'), cellType: 'string' },
      { label: 'Signed', name: 'signed',value: new Date(contract.get('signed')).toDateString(), cellType: 'string' },
      { label: 'Installed', name: 'install_date',value: (contract.get('install_date')) ? new Date(contract.get('install_date')).toDateString() : '', cellType: 'string' },
      { label: 'Disconnected', name: 'disconnect_date',value: (contract.get('disconnect_date')) ? new Date(contract.get('disconnect_date')).toDateString() : '', cellType: 'string' },
      { label: 'Status', name: 'status',value: contract.getIn(['status','name']), cellType: 'string' },
      { label: 'Billable', name: 'billable',value: contract.get('billable') ? 'Yes' : 'No', cellType: 'string' },
      { label: 'Telecomm Tax Estimate (17%)', name: 'tax_estimate',value: '// TODO', cellType: 'string' }
    ];
    let c = {};
    colNames.forEach((col, idx) => { c[col.name] = col.value;});
    let data = [c];

    let table = {
      colNames: colNames,
      data: data,
      colWidths: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      maxWidth: 36,
      widthAdj: -60,
      margin: '20px 0 5px 0'
    };

    let details = {data: colNames};

    return details;
  },

  getTableConfig(contract) {
    let services = contract.get('services').toJS();
    return {
      colNames: [
        { label: 'Service', name: 'full_name', cellType: 'string'},
        { label: 'Name', name: 'actual_name', cellType: 'string' },
        { label: 'Description', name: 'actual_description', cellType: 'string' },
        { label: 'Quantity', name: '__quantity', cellType: 'string' },
        { label: 'NRC', name: 'nrc', cellType: 'currency' },
        { label: 'MRC', name: 'mrc', cellType: 'currency' },
        { label: 'Installed', name: 'install_date', cellType: 'date' },
        { label: 'Billable', name: 'billable', cellType: YesNoCell }
      ],
      data: services.map(s => {
        s.__quantity = `${s.quantity} ${s.unit_description || ''}`;
        return s;
      }),
      colWidths: [5, 3, 8, 2, 1, 1, 2, 1],
      maxWidth: 23,
      widthAdj: -60,
      widthPerc: (1000/12),
      margin: '0'
    };
  },

  render() {
    return (
      <div style={this.props.style}>
        <Layout widths = {{lg: [2, 10], md: [2, 10], sm: [2, 10], xs: [2, 10]}} pPadding = {'20px 0 0 0'}>
          <div>
            <Details {...this.getContractData(this.props.contract)} />
          </div>
          <div>
            <Table {...this.getTableConfig(this.props.contract)} />
          </div>
        </Layout>
      </div>
    );
  }
});

import networkRenderer from '../../shared/components/networkRenderer'

export default networkRenderer(ContractSingle, 'contract');
