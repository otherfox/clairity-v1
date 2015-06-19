
import React, {PropTypes} from 'react'
import Store from '../shared/store'
import Layout from '../shared/components/layout'
import Footer from '../shared/components/footer'
import TopNav from '../shared/components/topnav'
import LeftNav from '../shared/components/leftnav'
import Content from '../shared/components/content'
import Table from '../shared/components/table'

import ContactLogs from './contactLogs'
import WorkOrderDetails from './workOrderDetails'
// import ContractOverview from './contractOverview'
import Details from '../shared/components/details'
import Engineering from './engineering'
import EngineeringHardware from './engineeringHardware'
import EngineeringNetworking from './engineeringNetworking'
import Installation from './installation'
import Messaging from './messaging'
import Pop from './pop'
import Provisioning from './provisioning'

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
import {Navigation} from 'react-router'


let WorkOrders = React.createClass({
  mixins: [Navigation],

  getOrderId() {
    debugger;
    return Number(this.getParams().id || 1538);
  },

  render() {
    return (
      <div>
        <TopNav />
        <Layout type="main">
          <LeftNav />
          <Content>
            <div>
              <div className="section-header">
                <h1>Edit Work Order</h1>
              </div>

              <Layout widths={{lg: [6,6,12],md: [12,12,12], sm: [12,12,12], xs: [12,12,12], xxs: [12,12,12], }} cPadding={'0 20px 20px 20px'}>
                <div><Details title={'Customer Overview'} /></div>
                <div></div>
                <div><WorkOrderDetails id={this.getOrderId()}></WorkOrderDetails></div>
              </Layout>
              <Layout widths={{lg: [4,4,4],md: [12,12,12], sm: [12,12,12], xs: [12,12,12], xxs: [12,12,12], }} cPadding={'0 20px 20px 20px'}>
                <div><Pop></Pop></div>
                <div><ContactLogs></ContactLogs></div>
                <div><Provisioning></Provisioning></div>
              </Layout>
              <Layout widths={{lg: [4,4,4],md: [12,12,12], sm: [12,12,12], xs: [12,12,12], xxs: [12,12,12], }} cPadding={'0 20px 20px 20px'}>
                <div><EngineeringNetworking></EngineeringNetworking></div>
                <div><EngineeringHardware></EngineeringHardware></div>
                <div><Installation></Installation></div>
              </Layout>
              <Layout widths={{lg: [4,8],md: [], sm: [], xs: [], xxs: [], }}>
                <div><Engineering></Engineering></div>
                <div><Messaging></Messaging></div>
              </Layout>
            </div>
          </Content>
        </Layout>
        <Footer />
      </div>
    )
  }
});

export default WorkOrders;
