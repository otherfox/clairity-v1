
import React, {PropTypes} from 'react'
import Store from '../shared/store'
import Layout from '../shared/components/layout'
import Footer from '../shared/components/footer'
import TopNav from '../shared/components/topnav'
import LeftNav from '../shared/components/leftnav'
import Content from '../shared/components/content'
import Table from '../shared/components/table'


import ContactLogs from '../shared/components/workOrders/contactLogs'
import WorkOrderDetails from '../shared/components/workOrders/workOrderDetails'
// import ContractOverview from '../shared/components/workOrders/contractOverview'
import Details from '../shared/components/details'
import Engineering from '../shared/components/workOrders/engineering'
import EngineeringHardware from '../shared/components/workOrders/engineeringHardware'
import EngineeringNetworking from '../shared/components/workOrders/engineeringNetworking'
import Installation from '../shared/components/workOrders/installation'
import Messaging from '../shared/components/workOrders/messaging'
import Pop from '../shared/components/workOrders/pop'
import Provisioning from '../shared/components/workOrders/provisioning'



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

import {fetchWorkOrder, updateWorkOrder} from './actions.js'
import {queryOrder} from './queries.js'
import {Navigation} from 'react-router'


let WorkOrders = React.createClass({
  mixins: [Navigation],

  updateState() {
    let id = this.getOrderId();
    let order = queryOrder(id);
    this.setState( order );
  },

  getOrderId() {
    let {router} = this.context;
    let id = (router.getCurrentParams().Id) ? router.getCurrentParams().Id : 1538;
    return Number(id);
  },

  conmponentWillMount() {
    let id = this.getOrderId();
    queryOrder(id);
  },

  componentDidMount() {
    this.updateState();
    Store.on('update', () => this.setState( this.getStateFromStore() ));
  },

  getStateFromStore() {
    return { order: queryWorkOrder(this.getParams()) };
  },

  tryLogin(username, password) {
    tryLogin(username, password);
  },

  updateAddressField(fieldName) {
    return value => {
      this.setState({order: this.state.order.setIn(['address', fieldName], value)});
    }
  },

  updateOrder() {
    let id = this.getParams().id;
    updateWorkOrder(id, this.state.order);
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
                <div><WorkOrderDetails></WorkOrderDetails></div>
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
      //value={this.state.order.getIn(['address', 'street'])} onChange={this.updateAddressField('street')}
    )
  }
});

export default WorkOrders;
