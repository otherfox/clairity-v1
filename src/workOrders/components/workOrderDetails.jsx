import React from 'react'
import controllable from 'react-controllables'
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
  TimePicker,
  TextField,
  Paper
} from 'material-ui'

import _ from 'lodash'
import {queryRenderer, collectionQuery} from '../../shared/components/networkRenderer'

import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
import DatePicker from '../../shared/components/datePicker'
import DropDown from '../../shared/components/dropDown'
import {collectionDropdown} from '../../shared/components/collectionDropdown'

import OwnerView from './details/owner'
let WorkOrderTypesDropdown = collectionDropdown('workOrderType');

@controllable(['status', 'workOrderDate', 'workOrderType', 'description', 'expectedInstallDate', 'expectedInstallDateEnd', 'workOrderDate', 'closeDate', 'generalNotes'])

class WorkOrderDetailsView extends React.Component {
  style() {
    return {}
  }

  getServiceTypes() {
    let os = [];
    this.props.workOrder.services.forEach((service, idx) => { os.push(service) });
    return this.props.serviceTypes.map((serviceType, idx) =>
      <div key={idx}>
        <Checkbox name={serviceType.name} value={serviceType.id} label={serviceType.name} defaultChecked={(_.indexOf(os, serviceType.id) !== -1) ? true : false } />
      </div>
    )
  }

  getStatus() {
    return [
      { key: 0, label: 'Open', value: 'Open' },
      { key: 1, label: 'Closed', value: 'Closed'}
    ]
  }

  getWorkOrderTypes() {
    let orderTypes = this.props.orderTypes.map((orderType, idx) => {
      let data = {
          key: idx,
          value: orderType.id,
          label: orderType.name
        };
      return data;
    });
    return orderTypes;
  }

  getDetails(order) {
    let owners = [{value: 'Owner',label:'Label'}];
    let colNames = [
      { label: 'Owners', name: 'owners', value: <OwnerView workOrder={this.props.workOrder} />, cellType: 'string', detailType: 'muiDropDown' },
      { label: 'Work Order Status', name: 'status', value: <DropDown menuItems={this.getStatus()}  />, cellType: 'string', detailType: 'muiDropDown' },
      { label: 'Work Order Type', name: 'type_id', value: <WorkOrderTypesDropdown selectedIndex={this.props.workOrder.defaultWorkOrderType} />, cellType: 'string', detailType: 'muiDropDown' },
      { label: 'Description', name: 'description', value: <TextField multiLine={true}  />, cellType: 'string', detailType: 'muiTextField' },
      { label: 'Services', name: 'services', value: <Layout widths={{lg: [4,4,4,4,4,4,4,4,4,4,4,4], md: [6,6,6,6,6,6,6,6,6,6,6,6], sm: [12]}} breakpoints={{ md: 1550 }}>{this.getServiceTypes()}</Layout>, cellType: 'string', detailType: 'mui' },
      { label: 'Expected Install Date (Earliest)', name: 'expected_install_date', value: <div><DatePicker defaultDate={(this.props.defaultExpectedInstallDate) ? new Date(this.props.defaultExpectedInstallDate) : new Date()} /><TimePicker format="ampm" hintText="12hr Format" defaultTime={(this.props.defaultExpectedInstallDate) ? new Date(this.props.defaultExpectedInstallDate) : new Date()} /></div>, cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'Expected Install Data (Latest)', name: 'expected_install_date_end', value: <div><DatePicker defaultDate={(this.props.defaultExpectedInstallDateEnd) ? new Date(this.props.defaultExpectedInstallDateEnd) : new Date()} /><TimePicker format="ampm" hintText="12hr Format"  defaultTime={(this.props.defaultExpectedInstallDateEnd) ? new Date(this.props.defaultExpectedInstallDateEnd) : new Date()} /></div> , cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'Install Date', name: 'work_order_date', value: <div><DatePicker defaultDate={(this.props.defaultWorkOrderDate) ? new Date(this.props.defaultWorkOrderDate) : new Date()} /><TimePicker format="ampm" hintText="12hr Format" defaultTime={(this.props.defaultWorkOrderDate) ? new Date(this.props.defaultWorkOrderDate) : new Date()} /></div>, cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'Close Date', name: 'close_date', value: <div><DatePicker defaultTime={(this.props.defaultCloseDate) ? new Date(this.props.defaultCloseDate) : new Date()} /><TimePicker format="ampm" hintText="12hr Format" defaultTime={(this.props.defaultCloseDate) ? new Date(this.props.defaultCloseDate) : new Date()} /></div>, cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'notes', name: 'general_notes', value: <TextField multiLine={true} defaultValue={this.props.defaultGeneralNotes} />, cellType: 'string', detailType: 'muiTextField' },
      { label: '', name: 'submit', value: <RaisedButton onClick={() => this.submit()} primary label="Update" />, cellType: 'button', detailType: 'muiButton'}
    ];
    let c = {};
    colNames.forEach((col, idx) => { c[col.name] = col.value;});
    let data = [c];
    let details = {title: 'Details', data: colNames};
    return details;
  }

  submit() {
    console.log('Update Work Order `details`:', this.state.popId);
    this.props.onSubmit(this.props);
    updateWorkOrder({
      id: this.props.workOrder.id,
      workOrder: _.extend({}, this.props.workOrder, {pop_entry: 'existing', pop_id: this.state.popId})
    });
  }

  render() {
    return (
      <div style={_.assign(this.style(), this.props.style)}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{}} pPadding={'0 20px 20px 20px'} cPadding={'0 0 20px 0'}>
            <Details {...this.getDetails(this.props.workOrder)} />
          </Layout>
        </Paper>
      </div>
    );
  }
}

class WorkOrderDetails extends React.Component {
  handleSubmit(state) {

  }

  render() {
    let order = this.props.workOrder;
    return (
      <WorkOrderDetailsView onSubmit={(state) => this.handleSubmit(state)}
                            defaultStatus={this.props.workOrder.status}
                            defaultWorkOrderType={this.props.workOrder.type.id}
                            defaultDescription={this.props.workOrder.description}
                            defaultExpectedInstallDate ={this.props.workOrder.expected_install_date}
                            defaultExpectedInstallDateEnd ={this.props.workOrder.expected_install_date_end}
                            defaultWorkOrderDate = {this.props.workOrder.work_order_date}
                            defaultCloseDate = {this.props.workOrder.closedDate}
                            defaultGeneralNotes = {this.props.workOrder.generalNotes}/>
    );
  }
};

WorkOrderDetails = queryRenderer(WorkOrderDetailsView, {
  method: ['update'],
  queries: [ collectionQuery('serviceType', 'serviceTypes') ]
});

export default WorkOrderDetails;
