import React from 'react'
import Layout from  '../shared/components/layout'
import Footer from  '../shared/components/footer'
import TopNav from '../shared/components/topnav'
import LeftNav from '../shared/components/leftnav'
import Content from '../shared/components/content'
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

import {List} from 'immutable'

// Dropdown Menu Data

var customerItems = [
  { payload: '1', text: 'Pleasanton Site' },
  { payload: '2', text: 'Fulton County Schools' }
];

var locationItems = [
  { payload: '1', text: '1845 Oil Field Services' },
  { payload: '2', text: '150 Capital Ave, Atlanta GA' },
];

var typeItems = [
   { payload: '1', text: 'Type' },
   { payload: '2', text: 'Month-to-Month' },
   { payload: '3', text: 'One-time Event' },
   { payload: '4', text: 'Standard - Downgrade' },
   { payload: '5', text: 'Standard - New Install' },
   { payload: '6', text: 'Standard - Renewal' },
   { payload: '7', text: 'Standard - Upgrade' }
];

var salesItems = [
   { payload: '1', text: 'Sales Agent' },
   { payload: '2', text: 'Demo Employee' },
   { payload: '3', text: 'Andrew Solomon' },
   { payload: '4', text: 'Brad Hackett' },
   { payload: '5', text: 'Chriss Meadows' }
];

var serviceItems = [
   { payload: '1', text: 'Choose a service ...' },
   { payload: '2', text: 'Demo Employee' },
   { payload: '3', text: 'Andrew Solomon' },
   { payload: '4', text: 'Brad Hackett' },
   { payload: '5', text: 'Chriss Meadows' }
];

class ServiceForm extends React.Component {


  render() {
    return (
      <Layout pPadding={'0 0 20px 0'}>
        <Paper style={{position: 'relative'}}>
          <Layout widths={{ lg: [4, 1, 1.5, 1.5, 3,1], md: [4, 1.5, 1.5, 2, 3], sm: [3,2,2,2,3], xs: [3,2,2,2,3]}} cPadding={'0 20px 0 0'} pPadding={'0 20px'} type="row">
            <DropDownMenu menuItems={serviceItems} />
            <TextField
              defaultValue=""
              floatingLabelText="#" />
            <TextField
              defaultValue=""
              floatingLabelText="MRC" />
            <TextField
              defaultValue=""
              floatingLabelText="NRC" />
            <Checkbox
              name="checkboxName1"
              value="checkboxValue1"
              label="Requires Approval?" />
            <div style={{position: 'absolute', top: 10, right: 15, fontSize: 18, color: "#aaaaaa", cursor: 'pointer'}} onClick={this.props.onDelete}>x</div>
          </Layout>
          <Layout widths={{ lg: [6,6], md: [6,6], sm: [6,6], xs: [6,6]}} cPadding={'10px 20px 0 0'} pPadding={'0 20px 20px 20px'}>
            <TextField
              defaultValue=""
              floatingLabelText="Contract Description"
              multiLine={true} />
            <TextField
              defaultValue=""
              floatingLabelText="Invoice Description"
              multiLine={true} />
          </Layout>
        </Paper>
      </Layout>
    );
  }
}

// React Render
export default class CreateContract extends React.Component {
  constructor() {
    super();
    this.state = {
      services: new List()
    };
  }
  addService() {
    this.setState({services: this.state.services.push({})});
  }
  removeService(n) {
    this.setState({services: this.state.services.delete(n)});
  }
  render() {
    return (
      <div>
        <TopNav />
        <Layout type="main">
          <LeftNav />
          <Content>
            <div>
              <div className="section-header">
                <h1>Create Contract</h1>
              </div>
              <Paper zDepth={1} rounded={true}>
                <Layout widths={{ lg: [3, 9], md: [12, 12], sm: [12, 12], xs: [12, 12]}} cPadding={'0 20px 20px 20px'}>
                  <div>
                    <h4>Details</h4>
                    <Layout widths={{ lg: [12,12,12,12,12,12,12], md: [12,12,12,12,12,12,12], sm: [12,12,12,12,12,12,12], xs: [12,12,12,12,12,12,12]}}>
                      <DropDownMenu menuItems={customerItems} />
                      <DropDownMenu menuItems={locationItems}/>
                      <DropDownMenu menuItems={typeItems} />
                      <TextField
                        defaultValue="30 Days"
                        floatingLabelText="Days Until Install" />
                      <DropDownMenu menuItems={salesItems} />
                      <TextField
                        floatingLabelText="Contract Notes" />
                      <TextField
                        floatingLabelText="Work Order Notes" />
                    </Layout>
                  </div>
                  <div>
                    <h4>Services</h4>
                    <div>
                    {
                      this.state.services.map((s, n) => {
                        return (<ServiceForm key={n} onDelete={() => this.removeService(n)} />);
                      })
                    }
                    </div>
                    <Layout cPadding={"10px 10px 0 0"}>
                      <RaisedButton label="+" onClick={this.addService.bind(this)} />
                      <RaisedButton label="Create Contract" primary={true} />
                    </Layout>
                  </div>
                </Layout>
              </Paper>
            </div>
          </Content>
        </Layout>
        <Footer />
      </div>
    );
  }
}
