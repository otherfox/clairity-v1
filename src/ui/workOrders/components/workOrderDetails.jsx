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
  DatePicker,
  Paper
} from 'material-ui'

import _ from 'lodash'
import {queryRenderer, collectionQuery} from '../../shared/components/networkRenderer'

import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
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
      { label: 'Work Order Type', name: 'type_id', value: <WorkOrderTypesDropdown selectedIndex={this.props.workOrderType} />, cellType: 'string', detailType: 'muiDropDown' },
      { label: 'Description', name: 'description', value: <TextField multiLine={true}  />, cellType: 'string', detailType: 'muiTextField' },
      { label: 'Services', name: 'services', value: <Layout widths={{lg: [4,4,4,4,4,4,4,4,4,4,4,4], md: [6,6,6,6,6,6,6,6,6,6,6,6], sm: [12]}} breakpoints={{ md: 1550 }}>{this.getServiceTypes()}</Layout>, cellType: 'string', detailType: 'mui' },
      { label: 'Expected Install Date (Earliest)', name: 'expected_install_date', value: <div><DatePicker defaultDate={(this.props.expectedInstallDate) ? new Date(this.props.expectedInstallDate) : new Date()} /><TimePicker format="ampm" hintText="12hr Format" defaultTime={(this.props.expectedInstallDate) ? new Date(this.props.expectedInstallDate) : new Date()} /></div>, cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'Expected Install Data (Latest)', name: 'expected_install_date_end', value: <div><DatePicker defaultDate={(this.props.expectedInstallDateEnd) ? new Date(this.props.expectedInstallDateEnd) : new Date()} /><TimePicker format="ampm" hintText="12hr Format"  defaultTime={(this.props.expectedInstallDateEnd) ? new Date(this.props.expectedInstallDateEnd) : new Date()} /></div> , cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'Install Date', name: 'work_order_date', value: <div><DatePicker defaultDate={(this.props.workOrderDate) ? new Date(this.props.workOrderDate) : new Date()} /><TimePicker format="ampm" hintText="12hr Format" defaultTime={(this.props.workOrderDate) ? new Date(this.props.workOrderDate) : new Date()} /></div>, cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'Close Date', name: 'close_date', value: <div><DatePicker defaultTime={(this.props.closeDate) ? new Date(this.props.closeDate) : new Date()} /><TimePicker format="ampm" hintText="12hr Format" defaultTime={(this.props.closeDate) ? new Date(this.props.closeDate) : new Date()} /></div>, cellType: 'string', detailType: 'muiDatePicker' },
      { label: 'notes', name: 'general_notes', value: <TextField multiLine={true} defaultValue={this.props.generalNotes} />, cellType: 'string', detailType: 'muiTextField' },
      { label: '', name: 'submit', value: <RaisedButton onClick={() => this.submit()} primary label="Update" />, cellType: 'button', detailType: 'muiButton'}
    ];
    let c = {};
    colNames.forEach((col, idx) => { c[col.name] = col.value;});
    let data = [c];
    let details = {title: 'Details', data: colNames};
    return details;
  }

  submit() {
    this.props.onSubmit(this.props);
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
    console.log(state);
    /*updateWorkOrder({
      id: this.props.workOrder.id,
      workOrder: this.props.workOrder
    });*/
  }

  render() {
    return (
      <WorkOrderDetailsView onSubmit={state => this.handleSubmit(state)}
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
