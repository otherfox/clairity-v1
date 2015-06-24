
import React, {PropTypes} from 'react'
import Store from '../shared/store'
import Layout from '../shared/components/layout'
import Footer from '../shared/components/footer'
import Table from '../shared/components/table'

import {networkModelRenderer} from '../shared/components/networkRenderer'

import ContractOverview from './components/contractOverview'

import ContactLogs from './components/contactLogs'
import WorkOrderDetails from './components/workOrderDetails'
import LocationInfo from './components/locationInfo'
import Engineering from './components/engineering'
import EngineeringHardware from './components/engineeringHardware'
import EngineeringNetworking from './components/engineeringNetworking'
import Installation from './components/installation'
import Messaging from './components/messaging'
import Pop from './components/pop'
import Provisioning from './components/provisioning'

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

import controllable from 'react-controllables'
import {State, Link} from 'react-router'

class WorkOrders extends React.Component {

  render() {
    let wo = this.props.workOrder.toJS()
    return (
      <div>
        <div className="section-header">
          <h1>Update Work Order #{wo.id}</h1>
        </div>
        <div>
          <Layout cPadding={'0 20px 0 0'}>
            <div>
              <Link to="work-order-upload" params={{id: wo.id}}>Attach / View Files</Link>
            </div>
            <div>
              <Link to="view-customer" params={{id: wo.location_id}}>View Customer Details</Link>
            </div>
          </Layout>
        </div>
        <div>
          <h2></h2>
        </div>
        <Layout widths={{lg: [6,6,12],md: [12,12,12], sm: [12,12,12], xs: [12,12,12], xxs: [12,12,12], }} cPadding={'20px 20px 0 0'}>
          <div>
            <Layout widths={{lg: [12,12,12],md: [12,12,12], sm: [12,12,12], xs: [12,12,12], xxs: [12,12,12], }} cPadding={'0 0 20px 0'}>
              <LocationInfo id={wo.location_id} />
              <Pop workOrder={wo} />
              <Provisioning />
            </Layout>
          </div>
          <div><WorkOrderDetails workOrder={wo} /></div>
          <div><ContractOverview id={wo.contract_id} /></div>
        </Layout>
        <Layout widths={{lg: [6,6],md: [12,12], sm: [12,12], xs: [12,12], xxs: [12,12], }} cPadding={'20px 20px 0 0'}>
          <div>
            <Layout widths={{lg: [12,12],md: [12,12], sm: [12,12], xs: [12,12], xxs: [2,12], }} cPadding={'0 0 20px 0'}>
              <EngineeringNetworking></EngineeringNetworking>
              <Messaging></Messaging>
            </Layout>
          </div>
          <div>
            <Layout widths={{lg: [12,12, 12,12],md: [12,12, 12,12], sm: [12,12,12,12], xs: [12,12,12,12], xxs: [12,12,12,12], }} cPadding={'0 0 20px 0'}>
              <EngineeringHardware></EngineeringHardware>
              <Installation></Installation>
              <Engineering></Engineering>
              <ContactLogs />
            </Layout>
          </div>
        </Layout>
      </div>
    )
  }

}

let WorkOrdersWrapped = networkModelRenderer(WorkOrders, 'workOrder');

let WorkOrderPage = React.createClass({
  mixins: [State],
  render() {
    return (<WorkOrdersWrapped id={+this.getParams().id} />);
  }
});

export default WorkOrderPage;
