
import React, {PropTypes} from 'react'
import Store from '../../core/store'
import Layout from '../shared/components/layout'
import Footer from '../shared/components/footer'
import Table from '../shared/components/table'
import Link from '../shared/components/link'
import Header from '../shared/components/header'
import { Tabs, Tab } from '../shared/components/tabs'

import { networkModelRenderer } from '../shared/components/networkRenderer'

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
import { State } from 'react-router'

let WorkOrders = React.createClass({
  getInitialState() {
    return {
      compact: false
    }
  },
  setCompact(e, toggled) {
    this.setState({compact: toggled});
  },
  render() {
    let wo = this.props.workOrder.toJS();
    return (
      <div>
        <Header><h1>Update Work Order #{wo.id}</h1></Header>

        <Layout cPadding={'0 20px 0 0'}>
          <Link to="work-order-upload" params={{id: wo.id}}>Attach / View Files</Link>
          <Link to="view-account" params={{accountId: wo.location_id, locationId: wo.location_id}}>View Customer Details</Link>
          <div style={{position: 'absolute', width: '150px', right: '20px'}} >
            <Toggle
              labelStyle={{ minWidth: '100px'}}
              name="compactView"
              value="false"
              label="Compact View"
              onToggle={this.setCompact}
            />
          </div>
        </Layout>

        <Tabs compact={this.state.compact}>

          <Tab label="Details">
            <Layout widths={{lg: [6,6],md: [12,12], sm: [12,12], xs: [12,12], xxs: [12,12] }} cPadding={'20px 20px 0 0'}>
              <div>
                <Layout widths={{lg: [12,12,12],md: [12,12,12], sm: [12,12,12], xs: [12,12,12], xxs: [12,12,12], }} cPadding={'0 0 20px 0'}>
                  <LocationInfo id={wo.location_id} />
                  <Pop workOrder={wo} />
                  <Provisioning />
                </Layout>
              </div>
              <WorkOrderDetails workOrder={wo} />
            </Layout>
          </Tab>

          <Tab label="Contracts">
            <Layout widths={{lg: [12], md: [12], sm: [12], xs: [12], xxs: [12] }} cPadding={'20px 20px 0 0'}>
              <ContractOverview locationId={wo.location_id} />
            </Layout>
          </Tab>

          <Tab label="Engineering">
            <Layout widths={{lg: [6,6],md: [12,12], sm: [12,12], xs: [12,12], xxs: [12,12], }} cPadding={'20px 20px 0 0'}>
              <div>
                <Layout widths={{lg: [12,12],md: [12,12], sm: [12,12], xs: [12,12], xxs: [2,12], }} cPadding={'0 0 20px 0'}>
                  <EngineeringNetworking></EngineeringNetworking>
                </Layout>
              </div>
              <div>
                <Layout widths={{lg: [12,12,  12,12],md: [12,12, 12,12], sm: [12,12,12,12], xs: [12,12,12,12], xxs: [12,12,12,12], }} cPadding={'0 0 20px 0'}>
                  <EngineeringHardware></EngineeringHardware>
                  <Installation></Installation>
                  <Engineering></Engineering>
                </Layout>
              </div>
            </Layout>
          </Tab>

          <Tab label="Messages">
            <Layout widths={{lg: [6,6],md: [12,12], sm: [12,12], xs: [12,12], xxs: [12,12], }} cPadding={'20px 20px 0 0'}>
              <div>
                <Layout widths={{lg: [12],md: [12], sm: [12], xs: [12], xxs: [12], }} cPadding={'0 0 20px 0'}>
                  <Messaging />
                </Layout>
              </div>
              <div>
                <Layout widths={{lg: [12,12,  12,12],md: [12,12, 12,12], sm: [12,12,12,12], xs: [12,12,12,12], xxs: [12,12,12,12], }} cPadding={'0 0 20px 0'}>
                  <ContactLogs />
                </Layout>
              </div>
            </Layout>
          </Tab>
        </Tabs>
      </div>
    )
  }
});

let WorkOrdersWrapped = networkModelRenderer(WorkOrders, 'workOrder');

let WorkOrderPage = React.createClass({
  mixins: [State],
  render() {
    return (<WorkOrdersWrapped id={+this.getParams().id} />);
  }
});

export default WorkOrderPage;
