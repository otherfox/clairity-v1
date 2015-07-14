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

let data = [];

let EngineeringNetworking = React.createClass ({

  propTypes: {
    style: React.PropTypes.object,
    data: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      data: data
    };
  },

  style() {
    let style = {};

    if(this.props.style) {
      Object.keys(this.props.style).forEach(function(key, i){
        console.log(key);
        style[key] = this.props.style[key];
      }, this);
    }

    return style;
  },

  render() {

    let notes = `DanSchreimannandAssociates_100-3067-6384
    dfw.rtr01.DanSchreimannandAssociates
    8445 Freeport Parkway, Suite 175, Irving, TX 75063
    vlan 240
    name RF_DanSchreiman
    int vl 240
    desc RF-DanSchreimannandAssociates
    no shut
    ip addr 216.59.210.241 255.255.255.252
    no ip redirects
    no ip unreachables
    no ip proxy-arp
    ip route 216.59.217.8  255.255.255.252 216.59.210.242 name RF-DanSchreimannandAssociates_100-3067-6384
    router ospf 1059
    net 216.59.210.240 0.0.0.3 a 4`;

    return (
      <div style={this.props.style}>
        <Paper zDepth={1} rounded={true}>
          <Layout widths={{lg:[12],md:[12],sm:[12],xs:[12]}} pPadding={'0 20px 20px 20px'}>
            <div>
              <Layout widths={{lg:[6,6],md:[12,12],sm:[12,12],xs:[12,12]}} pPadding={'0 20px 0 0'}>
                <Details
                  labelTop = {true} 
                  title = {'Engineering Networking'}
                  data = {[
                    { label: 'Find Available', name: 'assign_to_pop', value: <Layout widths={{lg: [12,12,12], md: [12,12,12], sm: [12,12,12], xs: [12,12,12]}}><Checkbox label={'Customer'} defaultSwitched={true} switched /><Checkbox label={'Internal'} /><Checkbox label={'POP'} /></Layout> },

                    { label: 'IPs Requested', name: 'ips_requested', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'/30'} />, detailType: 'muiTextField'},

                    { label: 'Customer IP Block', name: 'customer_ip_block', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'216.59.217.8/30'} />, detailType: 'muiTextField'},

                    { label: 'Subnet Mask', name: 'subnet_mask', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'255.255.255.252'} />, detailType: 'muiTextField'},

                    { label: 'Gateway', name: 'gateway', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'216.59.217.9'} />, detailType: 'muiTextField'},

                    { label: 'First Usable IP', name: 'first_usable_ip', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'216.59.217.10'} />, detailType: 'muiTextField'},

                    { label: 'Last Usable IP', name: 'last_usable_ip', value: <TextField fullWidth={true} multiLine={true} /> , detailType: 'muiTextField'},

                    { label: 'Loop IP', name: 'loop_ip', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'216.59.223.6'} />, detailType: 'muiTextField'},

                    { label: 'ARIN Org ID', name: 'slave_radio_ip', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'10.210.40.71/24'} />, detailType: 'muiTextField'},

                    { label: 'DNS 1', name: 'dns_1', value: <TextField fullWidth={true} multiLine={true} />, detailType: 'muiTextField'},

                    { label: 'DNS 2', name: 'dns_2', value: <TextField fullWidth={true} multiLine={true} />, detailType: 'muiTextField'},

                  ]}
                />
                <Details
                  labelTop = {true}
                  title = {null}
                  data = {[

                    { label: 'Find Available', name: 'assign_to_location_2', value: <Layout widths={{lg: [12,12,12], md: [12,12,12], sm: [12,12,12], xs: [12,12,12]}}><Checkbox label={'Customer'} defaultSwitched={true} switched /><Checkbox label={'Internal'} /><Checkbox label={'POP'} /></Layout> },

                    { label: 'IPs Requested', name: 'ips_requested_2', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'infrastructure'} />, detailType: 'muiTextField'},

                    { label: 'Customer IP Block', name: 'customer_ip_block_2', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'216.59.210.240/30'} />, detailType: 'muiTextField'},

                    { label: 'Subnet Mask', name: 'subnet_mask_2', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'255.255.255.252'} />, detailType: 'muiTextField'},

                    { label: 'Gateway', name: 'gateway_2', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'216.59.210.241'} />, detailType: 'muiTextField'},

                    { label: 'First Usable IP', name: 'first_usable_ip_2', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'216.59.210.242'} />, detailType: 'muiTextField'},

                    { label: 'Last Usable IP', name: 'last_usable_ip_2', value: <TextField fullWidth={true} multiLine={true} />, detailType: 'muiTextField'},

                    { label: 'Advertised Prefixes', name: 'master_radio_ip', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'10.210.40.10/24'} />, detailType: 'muiTextField'},

                    { label: 'BGP AS Number', name: 'vlan_id', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'39 mgt 240 data'} />, detailType: 'muiTextField'},

                    { label: 'Router Ports', name: 'router_ports', value:  <TextField fullWidth={true} multiLine={true} defaultValue={'fa0/14'} />, detailType: 'muiTextField'},

                    { label: 'Notes', name: 'networking_notes', value:  <TextField fullWidth={true} multiLine={true} />, detailType: 'muiTextField'},
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
});

export default EngineeringNetworking;
