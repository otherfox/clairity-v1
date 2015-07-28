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

import queryRenderer from '../../shared/components/networkRenderer/queryRenderer'

import ServiceTypes from '../services/stubs/serviceTypes.json'
import OrderTypes from '../services/stubs/workOrderTypes.json'

import OwnerView from './details/owner'

import {collectionDropdown} from '../../shared/components/collectionDropdown'

let WorkOrderTypesDropdown = collectionDropdown('workOrderType');

import {List, Map, fromJS} from 'immutable'

let WorkOrderDetails = React.createClass ({

  getDefaultProps() {
    return {
      serviceTypes: fromJS(ServiceTypes)
    };
  },

  style() {
    let style = {
      width: '100%'
    };

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  getServiceTypes() {

    let order = this.props.workOrder;
    let os = [];
    let orderServices = order.get('services').forEach((service, idx) => {
      os.push(service);
    });

    let services = this.props.serviceTypes.map( (serviceType, idx) =>
      <div key={idx}>
        <Checkbox name={serviceType.get('name')} value={serviceType.get('id').toString()} label={serviceType.get('name')} defaultSwitched={(os[serviceType.get('id')]) ? true : false} switched/>
      </div>
    );

    return services
  },

  getUsers() {

    let users = [
      new Map({
        key: 0,
        label: 'test',
        value: 7416
      })
    ];

    users = new List(users);

    return users;
  },

  getStatus() {
    let status = [
      new Map({
        key: 0,
        label: 'Open',
        value: 'Open'
      }),
      new Map({
        key: 1,
        label: 'Closed',
        value: 'Closed'
      })
    ];

    status = new List(status);

    return status;

  },

  getWorkOrderTypes() {

    let orderTypes = this.props.orderTypes.map((orderType, idx) => {
      let data = new Map({
          key: idx,
          value: orderType.get('id'),
          label: orderType.get('name')
        });
      return data;
    });

    orderTypes= new List(orderTypes);
    return orderTypes;
  },

  getDetails(order) {

    let owners = [{value: 'Owner',label:'Label'}];

    let colNames = [
      { label: 'Owners', name: 'owners', value: <OwnerView workOrder={this.props.workOrder} />, cellType: 'string', detailType: 'muiDropDown' },
      { label: 'Work Order Status', name: 'status', value: <DropDown menuItems={this.getStatus()} selectedValue={order.getIn(['status', 'name'])} />, cellType: 'string', detailType: 'muiDropDown' },
      { label: 'Work Order Type', name: 'type_id', value: <WorkOrderTypesDropdown selectedValue={order.getIn(['type', 'id'])} />, cellType: 'string', detailType: 'muiDropDown' },
      { label: 'Description', name: 'description', value: <TextField multiLine={true} defaultValue={(order.get('description')) ? order.get('description') : ''} />, cellType: 'string', detailType: 'muiTextField' },
      { label: 'Services', name: 'services', value: <Layout widths={{lg: [4,4,4,4,4,4,4,4,4,4,4,4], md: [6,6,6,6,6,6,6,6,6,6,6,6], sm: [12]}} breakpoints={{ md: 1550 }}>{this.getServiceTypes()}</Layout>, cellType: 'string', detailType: 'mui' },
      { label: 'Expected Install Date (Earliest)', name: 'expected_install_date', value: <DatePicker defaultDate={(order.get('expected_install_date')) ? new Date(order.get('expected_install_date')) : undefined} />, cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'Expected Install Data (Latest)', name: 'expected_install_date_end', value: <DatePicker defaultDate={(order.get('expected_install_date_end')) ? new Date(order.get('expected_install_date_end')) : undefined} /> , cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'Install Date', name: 'work_order_date', value: <DatePicker defaultDate={(order.get('work_order_date')) ? new Date(order.get('work_order_date')) : undefined} />, cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'Close Date', name: 'close_date', value: <DatePicker defaultDate={(order.get('close_date')) ? new Date(order.get('close_date')) : undefined} />, cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'notes', name: 'general_notes', value: <TextField multiLine={true} defaultValue={(order.get('general_notes')) ? order.get('general_notes'): ''} />, cellType: 'string', detailType: 'muiTextField' },
      { label: '', name: 'submit', value: <RaisedButton onClick={() => this.refs.pop.submit()} primary label="Update" />, cellType: 'button', detailType: 'muiButton'}
    ];
    let c = {};
    colNames.forEach((col, idx) => { c[col.name] = col.value;});
    let data = [c];

    let details = {title: 'Details', data: colNames};

    return details;

  },

  render() {

    return (
      <div style={this.style()}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{ lg: [12], md: [12], sm: [12], xs: [12], xxs: [12]}} pPadding={'0 20px 20px 20px'} cPadding={'0 0 20px 0'}>
            <Details {...this.getDetails(this.props.workOrder)} />
          </Layout>
        </Paper>
      </div>
    );
  }
});

export default WorkOrderDetails;
