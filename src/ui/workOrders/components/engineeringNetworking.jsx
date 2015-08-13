import React from 'react'
import Settings from '../../shared/components/settings'
import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
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

import _ from 'lodash'
import controllable from 'react-controllables'

@controllable(['ipsRequested', 'customerIpBlock','subnetMask','gateway','firstUsableIp','lastUsableIp','loopIp','slaveRadioIp','dns1','dns2','ipsRequested2','customerIpBlock2','subnetMask2','gateway2','firstUsableIp2','lastUsableIp2','masterRadioIp','vlanId','routerPorts','networkingNotes'])

class EngineeringNetworkingView extends React.Component {

  style() {
    return {}
  }

  submit() {
    this.props.onSubmit(this.props);
  }

  assignTo(prop) {
    return <Layout widths={{}}><Checkbox label={'Customer'} defaultChecked={(prop === 'customer') ? true : false} /><Checkbox label={'Internal'} defaultChecked={(prop === 'internal') ? true : false}/><Checkbox label={'POP'} defaultChecked={(prop === 'pop') ? true : false} /></Layout>
  }

  render() {
    return (
      <div style={_.assign(this.style(), this.props.style)}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{}} pPadding={'0 20px 20px 20px'}>
            <div>
              <Layout widths={{lg:[6,6],md:[12,12]}} pPadding={'0 20px 0 0'}>
                <Details
                  labelTop = {true}
                  title = {'Engineering Networking'}
                  data = {[
                    { label: 'Find Available', name: 'assign_to_pop', value: this.assignTo() },
                    { label: 'IPs Requested', name: 'ips_requested', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.ipsRequested} />, detailType: 'muiTextField'},
                    { label: 'Customer IP Block', name: 'customer_ip_block', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.customerIpBlock} />, detailType: 'muiTextField'},
                    { label: 'Subnet Mask', name: 'subnet_mask', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.subnetMask} />, detailType: 'muiTextField'},
                    { label: 'Gateway', name: 'gateway', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.gateway} />, detailType: 'muiTextField'},
                    { label: 'First Usable IP', name: 'first_usable_ip', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.firstUsableIp} />, detailType: 'muiTextField'},
                    { label: 'Last Usable IP', name: 'last_usable_ip', value: <TextField fullWidth={true} multiLine={true} defaultValue={this.props.lastUsableIp} /> , detailType: 'muiTextField'},
                    { label: 'Loop IP', name: 'loop_ip', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.loopIp} />, detailType: 'muiTextField'},
                    { label: 'ARIN Org ID', name: 'slave_radio_ip', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.slaveRadioIp} />, detailType: 'muiTextField'},
                    { label: 'DNS 1', name: 'dns_1', value: <TextField fullWidth={true} multiLine={true} defaultValue={this.props.dns1} />, detailType: 'muiTextField'},
                    { label: 'DNS 2', name: 'dns_2', value: <TextField fullWidth={true} multiLine={true} defaultValue={this.props.dns2}/>, detailType: 'muiTextField'},

                  ]}
                />
                <Details
                  labelTop = {true}
                  title = {null}
                  data = {[
                    { label: 'Find Available', name: 'assign_to_location_2', value: this.assignTo() },
                    { label: 'IPs Requested', name: 'ips_requested_2', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.ipsRequested2} />, detailType: 'muiTextField'},
                    { label: 'Customer IP Block', name: 'customer_ip_block_2', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.customerIpBlock2} />, detailType: 'muiTextField'},
                    { label: 'Subnet Mask', name: 'subnet_mask_2', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.subnetMask2} />, detailType: 'muiTextField'},
                    { label: 'Gateway', name: 'gateway_2', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.gateway2} />, detailType: 'muiTextField'},
                    { label: 'First Usable IP', name: 'first_usable_ip_2', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.firstUsableIp2} />, detailType: 'muiTextField'},
                    { label: 'Last Usable IP', name: 'last_usable_ip_2', value: <TextField fullWidth={true} multiLine={true} defaultValue={this.props.lastUsableIp2} />, detailType: 'muiTextField'},
                    { label: 'Advertised Prefixes', name: 'master_radio_ip', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.masterRadioIp} />, detailType: 'muiTextField'},
                    { label: 'BGP AS Number', name: 'vlan_id', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.vlanId} />, detailType: 'muiTextField'},
                    { label: 'Router Ports', name: 'router_ports', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.routerPorts} />, detailType: 'muiTextField'},
                    { label: 'Notes', name: 'networking_notes', value:  <TextField fullWidth={true} multiLine={true} defaultValue={this.props.networkingNotes}/>, detailType: 'muiTextField'},
                    { label: '', value: <RaisedButton primary label="Update" />, detailType: 'muiButton'}
                  ]}
                />
              </Layout>
            </div>
          </Layout>
        </Paper>
      </div>
    );
  }
}

class EngineeringNetworking extends React.Component {
  handleSubmit(state) {
    console.log(state);
    // updateWorkOrder({
    //   id: this.props.workOrder.id,
    //   workOrder: _.extend({}, this.props.workOrder, {pop_entry: 'existing', pop_id: this.state.popId})
    // });
  }

  render() {
    return (
      <EngineeringNetworkingView  onSubmit={(state) => this.handleSubmit(state)}
                                  defaultIpsRequested={this.props.workOrder.ips_requested}
                                  defaultCustomerIpBlock={this.props.workOrder.customer_ip_block}
                                  defaultSubnetMask={this.props.workOrder.subnet_mask}
                                  defaultGateway={this.props.workOrder.gateway}
                                  defaultFirstUsableIp={this.props.workOrder.first_usable_ip}
                                  defaultLastUsableIp={this.props.workOrder.last_usable_ip}
                                  defaultLoopIp={this.props.workOrder.loop_ip}
                                  defaultSlaveRadioIp={this.props.workOrder.slave_radio_ip}
                                  defaultDns1={this.props.workOrder.dns_1}
                                  defaultDns2={this.props.workOrder.dns_2}
                                  defaultIpsRequested2={this.props.workOrder.ips_requested_2}
                                  defaultCustomerIpBlock2={this.props.workOrder.customer_ip_block_2}
                                  defaultSubnetMask2={this.props.workOrder.subnet_mask_2}
                                  defaultGateway2={this.props.workOrder.gateway_2}
                                  defaultFirstUsableIp2={this.props.workOrder.first_usable_ip_2}
                                  defaultLastUsableIp2={this.props.workOrder.last_usable_ip_2}
                                  defaultMasterRadioIp={this.props.workOrder.master_radio_ip}
                                  defaultVlanId={this.props.workOrder.vlan_id}
                                  defaultRouterPorts={this.props.workOrder.router_ports}
                                  defaultNetworkingNotes={this.props.workOrder.networking_notes} />
    );
  }
};


export default EngineeringNetworking;
