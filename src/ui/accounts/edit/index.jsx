import React from 'react'
import Layout from  '../../shared/components/layout'
import Header from '../../shared/components/header'
import Footer from  '../../shared/components/footer'
import TopNav from '../../shared/components/topnav'
import LeftNav from '../../shared/components/leftnav'
import Content from '../../shared/components/content'
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

import {List, fromJS} from 'immutable'

import {fetchLocation, updateLocation, fetchAllCustomerTypes} from '../../core/actions/account'
import {queryAllCustomerTypes, queryLocation} from '../../core/queries/account'

// React Renders
export default class CreateLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      location: {},
      sameAddress: false,
      submitDisabled: false,
      selectedIndex: 0
    };
    this.updateState = this.updateState.bind(this);
  }
  updateState() {
    let location = queryLocation(this.getLocationId());
    let customerTypesRaw = queryAllCustomerTypes();
    let customerTypes = this.state.customerTypes;
    let selectedIndex = this.state.selectedIndex;
    if(customerTypesRaw.length > 0) {
      customerTypes = [];
      for(let i = 0; i < customerTypesRaw.length; i++) {
        let customerType = {};
        customerType.payload = customerTypesRaw[i].id;
        customerType.text = customerTypesRaw[i].name;
        customerTypes.push(customerType);
        if(location && customerType.payload == location.customer.type.id) {
          selectedIndex = i;
        }
      }
    }
    if(location) {
      this.setState({location, customerTypes, selectedIndex});
    }
  }
  onSubmit() {
    this.setState({submitDisabled: true});
    updateLocation(this.state).then(() => {
      this.setState({submitDisabled: false});
    }).catch(() => {
      //TODO show an error message
      this.setState({submitDisabled: false});
    });
  }
  getLocationId() {
    let {router} = this.context;
    return Number(router.getCurrentParams().locationId);
  }
  componentWillMount() {
    fetchLocation(this.getLocationId());
    fetchAllCustomerTypes();
  }
  componentDidMount() {
    this.updateState();
    Store.on('update.*', this.updateState);
  }
  componentWillUnmount() {
    Store.off('update.*', this.udpateState);
  }
  handleCustomerChange(event) {
    let location = this.state.location;
    let customer = location.customer;
    customer[event.target.name] = event.target.value;
    location.customer = customer;
    this.setState({location});
    this.copyCustomerToLocation();
  }
  handleCustomerCheck(event) {
    let location = this.state.location;
    let customer = location.customer;
    customer[event.target.name] = event.target.checked;
    location.customer = customer;
    this.setState({location});
  }
  handleSameAddressCheck(event) {
    let location = this.state.location;
    let customer = location.customer;
    this.setState({sameAddress: event.target.checked});
    if(event.target.checked) {
      this.copyCustomerToLocation(true);
    }
  }
  copyCustomerToLocation(override = false) {
    if(this.state.sameAddress || override) {
      let location = this.state.location;
      let customer = location.customer;
      location.street1 = customer.street1;
      location.street2 = customer.street2;
      location.city = customer.city;
      location.state = customer.state;
      location.zip_code = customer.zip_code;
      this.setState({location});
    }
  }
  copyLocationToCustomer(override = false) {
    if(this.state.sameAddress || override) {
      let location = this.state.location;
      let customer = location.customer;
      customer.street1 = location.street1;
      customer.street2 = location.street2;
      customer.city = location.city;
      customer.state = location.state;
      customer.zip_code = location.zip_code;
      this.setState({location});
    }
  }
  handleLocationChange(event) {
    let location = this.state.location;
    location[event.target.name] = event.target.value;
    this.setState({location});
    this.copyLocationToCustomer();
  }
  handleLocationCheck(event) {
    let location = this.state.location;
    location[event.target.name] = event.target.checked;
    this.setState({location});
  }
  handleCustomerTypeChange(event, selectedIndex, menuItem) {
    let location = this.state.location;
    if(location.customer) {
      location.customer.type.id = menuItem.payload;
      location.customer.type.name = menuItem.text;
      this.setState({location, selectedIndex});
    }
  }
  render() {
    let location = this.state.location;
    let customer = location.customer || {};
    let dropDown = <span>Loading...</span>;
    if(this.state.customerTypes) {
      dropDown = <DropDownMenu menuItems={this.state.customerTypes} selectedIndex={this.state.selectedIndex} onChange={this.handleCustomerTypeChange.bind(this)}/>;
    }
    return (
      <Layout>

        <Header><h1>Edit Customer Location</h1></Header>

        <Paper>
          <Layout widths={{ lg: [6, 6], md: [12, 12]}} cPadding={'0 20px 20px 20px'}>
            <div>
              <h4>Customer(Billing) Details</h4>
              {dropDown}
              <Layout widths={{ lg: [12,6,6,12,6,6,4,4,4], md: [12,6,6,12,6,6,4,4,4], sm: [12,6,6,12,6,6,4,4,4], xs: [12,6,6,12,6,6,4,4,4]}}>
                <TextField
                  name="name"
                  value={customer.name}
                  onChange={this.handleCustomerChange.bind(this)}
                  floatingLabelText="Name" />
                <TextField
                  name="street1"
                  value={customer.street1}
                  onChange={this.handleCustomerChange.bind(this)}
                  floatingLabelText="Street 1" />
                <TextField
                  name="street2"
                  value={customer.street2}
                  onChange={this.handleCustomerChange.bind(this)}
                  floatingLabelText="Street 2" />
                <TextField
                  name="city"
                  value={customer.city}
                  onChange={this.handleCustomerChange.bind(this)}
                  floatingLabelText="City" />
                <TextField
                  name="state"
                  value={customer.state}
                  onChange={this.handleCustomerChange.bind(this)}
                  floatingLabelText="State" />
                <TextField
                  name="zip_code"
                  value={customer.zip_code}
                  onChange={this.handleCustomerChange.bind(this)}
                  floatingLabelText="Zip Code" />
                <TextField
                  name="reference_number"
                  value={customer.reference_number}
                  onChange={this.handleCustomerChange.bind(this)}
                  floatingLabelText="Reference #" />
                <TextField
                  name="attn"
                  value={customer.attn}
                  onChange={this.handleCustomerChange.bind(this)}
                  floatingLabelText="Attn" />
                <TextField
                  name="legacy_account_number"
                  value={customer.legacy_account_number}
                  onChange={this.handleCustomerChange.bind(this)}
                  floatingLabelText="Legacy Account #" />
              </Layout>
              <Layout widths={{ lg: [6,6,6,6,6,6,6,6], md: [6,6,6,6,6,6,6,6], sm: [6,6,6,6,6,6,6,6], xs: [6,6,6,6,6,6,6,6]}} pPadding={"20px 0"}>
                <Checkbox
                  name="tax_exempt"
                  checked={customer.tax_exempt}
                  onCheck={this.handleCustomerCheck.bind(this)}
                  label="Tax Exempt" />
                <Checkbox
                  name="summary_billing"
                  checked={customer.summary_billing}
                  onCheck={this.handleCustomerCheck.bind(this)}
                  label="Summary Billing" />
                <Checkbox
                  name="show_international"
                  checked={customer.show_international}
                  onCheck={this.handleCustomerCheck.bind(this)}
                  label="Show International Calls" />
                <Checkbox
                  name="show_long_distance"
                  checked={customer.show_long_distance}
                  onCheck={this.handleCustomerCheck.bind(this)}
                  label="Show long Distance Calls" />
                <Checkbox
                  name="email_invoice"
                  checked={customer.email_invoice}
                  onCheck={this.handleCustomerCheck.bind(this)}
                  label="Email Invoice" />
                <Checkbox
                  name="invoice_weekly"
                  checked={customer.invoice_weekly}
                  onCheck={this.handleCustomerCheck.bind(this)}
                  label="Invoice Weekly" />
                <Checkbox
                  name="vip"
                  value="vip"
                  checked={customer.vip}
                  onCheck={this.handleCustomerCheck.bind(this)}
                  label="VIP" />
                <Checkbox
                  name="auto_pay"
                  checked={customer.auto_pay}
                  onCheck={this.handleCustomerCheck.bind(this)}
                  label="Auto Pay" />
              </Layout>
            </div>
            <div>
              <h4>Service Location</h4>
              <Layout widths={{ lg: [12,12,12,6,6,12,6,6,4,4,4], md: [12,12,12,12,12,12,12], sm: [12,12,12,12,12,12,12], xs: [12,12,12,12,12,12,12]}}>
                <TextField
                  name="name"
                  value={location.name}
                  onChange={this.handleLocationChange.bind(this)}
                  floatingLabelText="Name" />
                <Checkbox
                  name="tax_exempt"
                  checked={location.tax_exempt}
                  onCheck={this.handleLocationCheck.bind(this)}
                  label="Tax Exempt" />
                <Checkbox
                  checked={this.state.sameAddress}
                  onCheck={this.handleSameAddressCheck.bind(this)}
                  label="Same as Customer Address" />
                <TextField
                  name="street1"
                  value={location.street1}
                  onChange={this.handleLocationChange.bind(this)}
                  floatingLabelText="Street 1" />
                <TextField
                  name="street2"
                  value={location.street2}
                  onChange={this.handleLocationChange.bind(this)}
                  floatingLabelText="Street 2" />
                <TextField
                  name="city"
                  value={location.city}
                  onChange={this.handleLocationChange.bind(this)}
                  floatingLabelText="City" />
                <TextField
                  name="state"
                  value={location.state}
                  onChange={this.handleLocationChange.bind(this)}
                  floatingLabelText="State" />
                <TextField
                  name="zip_code"
                  value={location.zip_code}
                  onChange={this.handleLocationChange.bind(this)}
                  floatingLabelText="Zip Code" />
                <TextField
                  name="reference_number"
                  value={location.reference_number}
                  onChange={this.handleLocationChange.bind(this)}
                  floatingLabelText="Reference #" />
                <TextField
                  name="legacy_account_number"
                  value={location.legacy_account_number}
                  onChange={this.handleLocationChange.bind(this)}
                  floatingLabelText="Legacy Account #" />
                <TextField
                  name="order_index"
                  value={location.order_index}
                  onChange={this.handleLocationChange.bind(this)}
                  floatingLabelText="Order Index" />
              </Layout>
            </div>
          </Layout>
        </Paper>
        <Layout pPadding={"10px 0"}>
          <RaisedButton label="Submit" disabled={this.state.submitDisabled} onClick={this.onSubmit.bind(this)} primary={true} />
        </Layout>
      </Layout>
    );
  }
}

CreateLocation.contextTypes = {
      router: React.PropTypes.func
    };
