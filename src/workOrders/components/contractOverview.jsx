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
import Details from '../../shared/components/details'
import DropDown from '../../shared/components/dropDown'

import controllable from 'react-controllables'

import {fetchLocation} from '../../shared/actions/location'
import {queryLocation} from '../../shared/queries/location'
import {Navigation} from 'react-router'

import Location from '../services/stubs/location6384.json'
import WorkOrder from '../services/stubs/order1583.json'

import {Map, fromJS} from 'immutable'

let ContractOverview = React.createClass ({

  // statics: {
  //   queryForData(id) {
  //     return Promise((s, f) => {
  //
  //     });
  //   }
  // }

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
      selectedContract: this.getSelectedContract()
    };
  },

  updateState() {
    this.setState(this.getStateFromStore());
    this.setState({contracts: this.getContracts()});
    this.setState({selectedContract: this.getSelectedContract()});
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

    return contracts;
  },

  getSelectedContract() {
    let selected = this.props.order.get('contract_id')

    return selected;
  },

  handleContractChange() {
    this.setState(this.getSelectedContract() );
  },

  componentWillMount() {
    let id = this.props.id;
    fetchLocation(id);
  },

  componentDidMount() {
    this.updateState();
    Store.on('update', () => this.updateState());
  },

  getStateFromStore() {
    return { location: queryLocation(this.props.id) };
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

  updateAddressField(fieldName) {
    return value => {
      this.setState({order: this.state.order.setIn(['address', fieldName], value)});
    }
  },

  updateOrder() {
    let id = this.props.id;
    updateWorkOrder(id, this.state.order);
  },

  render() {

    let location = this.props.location;
    let title = location.getIn(['customer', 'name'])+' at '+location.get('name');

    let contractMenu = [

    ]

    let data = [
      {
        label:  'Customer (Billing) Address',
        value:  location.getIn(['customer', 'street1'])+', '+
                location.getIn(['customer', 'street2'])+', '+
                location.getIn(['customer', 'city'])+', '+
                location.getIn(['customer', 'state'])+' '+
                location.getIn(['customer', 'zip_code'])
      },
      {
        label:  'Location (Service) Address',
        value:  location.get('street1')+', '+
                location.get('street2')+', '+
                location.get('city')+', '+
                location.get('state')+' '+
                location.get('zip_code')
      },
      {
        label: 'Account #',
        value: '100'+'-'+location.getIn(['customer','id'])+'-'+location.get('id')
      },
      {
        label:  'Status',
        value:  (location.getIn(['status','description'])) ? location.getIn(['status','name'])+' - '+location.getIn(['status','description']) : location.getIn(['status','name'])
      }
    ];

    return (
      <div style={this.style()}>
        <Paper zDepth={1} rounded={true}>
          <Layout pPadding={'0 20px 20px 20px'}>
            <DropDown menuItems={this.getContracts()} selectedIndex={this.state.selectedContract} onChange={this.handleContractChange.bind(this)}/>
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default ContractOverview;
