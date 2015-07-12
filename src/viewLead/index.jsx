import React, {PropTypes} from 'react'
import Header from '../shared/components/header'
import Layout from  '../shared/components/layout'
import DropDown from '../shared/components/dropDown'
import Details from  '../shared/components/details'

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
import {List} from 'immutable'
import {State} from 'react-router'

let viewLead = React.createClass({

  render() {
    let event = 'controller.cfm?event=updateSalesOpp';

    let hiddenValues = {
      customer_id: "1480",
      contact_id: "7223",
      tax_exempt: false,
      summary_billing: false,
      show_international: true,
      show_long_distance: false,
      email_invoice: false,
      invoice_weekly: false,
      vip: false,
      auto_pay: false,
    };

    let opp = this.props.contact.toJS();

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Header><h1>View Lead - {opp.company}</h1></Header>
      <Paper>
        <Layout widths={{ lg: [6,6]}} cPadding={'0 20px 20px 20px'}>
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            rowStyle={{marginLeft: '15%'}}
            widths={{ lg: [4,8]}}
            title={'Customer Details'}
            data={[
              { label: 'Current Account Owner', value: <TextField value={opp.agent_name} disabled= {true}/>, detailType: 'muiTextField' },
              { label: 'Change Account Owner?', name: 'user_id', value: <DropDown selectedValue={0} menuItems={ new List([
                { label: '', value: 0},
                { label: 'Brad Hackett', value: 20 },
                { label: 'Casey Pinedo', value: 199 },
                { label: 'Chris Suttles', value: 254 },
                { label: 'Christy Davis', value: 252 },
                { label: 'D. Garcia', value: 168 },
                { label: 'Dave Weaver', value: 35 },
                { label: 'Donna Viviano', value: 85 },
                { label: 'Jason Fisher', value: 43 },
                { label: 'Jerry Rainey', value: 240 },
                { label: 'Jody Rodgers', value: 216 },
                { label: 'John Jenkins', value: 107 },
                { label: 'Joshua Phoenix', value: 189 },
                { label: 'Kelli Bedel', value: 128 },
                { label: 'Kit Carker', value: 130 },
                { label: 'Kris Maher', value: 10 },
                { label: 'Loren Watson', value: 265 },
                { label: 'Matt Yaun', value: 123 },
                { label: 'Nancy Morefield', value: 165 },
                { label: 'ORN Employee', value: 292 },
                { label: 'Patty Valencia', value: 184 },
                { label: 'Rhea Topolski', value: 166 },
                { label: 'Ricardo Kourchenko', value: 264 },
                { label: 'Rick Clines', value: 40 },
                { label: 'Ricky Potash', value: 1 },
                { label: 'Ryan Carney', value: 7 },
                { label: 'S. Garcia', value: 167 },
                { label: 'Sotheara Leang', value: 36 },
                { label: 'Spencer Anderson', value: 214 },
                { label: 'Stehpen Holmes', value: 231 },
                { label: 'Summer Greer', value: 200 },
                { label: 'Taryn Moseley', value: 215 },
                { label: 'Ted Abbott', value: 291 },
                { label: 'Thomas Dudley', value: 115 },
                { label: 'William Dobbins', value: 283 }
              ])} />, detailType: 'muiDropDown' },
              { label: 'Name', name: 'name', value: <TextField value={''}/>, detailType: 'muiTextField' },
              { label: 'Type', name: 'customerTypeId', value: <DropDown selectedValue={0} menuItems={ new List([
                { label: '', value: 0},
                { label: 'Business', value: 1 },
                { label: 'Residential', value: 2 },
                { label: 'Telenational - Business', value: 3 },
                { label: 'Telenational - Residential', value: 4 }
              ])} />, detailType: 'muiDropDown' },
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            widths={{ lg: [2,10]}}
            title={null}
            data={[
              { label: 'Street 1', name: 'customerStreet1', value: <TextField value={'15400 Knoll Trail'}/>, detailType: 'muiTextField' },
              { label: 'Street 2', name: 'customerStreet2', value: <TextField value={'Suite 400'}/>, detailType: 'muiTextField' },
              { label: 'City', name: 'customerCity', value: <TextField value={'Dallas'} />, detailType: 'muiTextField' },
              { label: 'State', name: 'customerState', value: <TextField value={'TX'} />, detailType: 'muiTextField' },
              { label: 'Zip Code', name: 'customerZip', value: <TextField value={75248} />, detailType: 'muiTextField' }
            ]}
          />
        </Layout>
      </Paper>
      <Paper>
        <Layout widths={{ lg: [6,6] }} cPadding={'0 20px 20px 20px'}>
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            rowStyle={{marginLeft: '15%'}}
            widths={{ lg: [4,8]}}
            title={'Opportunity Details'}
            data={[
              { label: 'Name', name: 'oppName', value: <TextField value={'Fill the Bill'}/>, detailType: 'muiTextField' },
              { label: 'Stage', name: 'salesStageId', value: <DropDown selectedValue={0} menuItems={ new List([
                { label: '', value: 0},
                { label: 'Closed Won', value: 5 },
                { label: 'Clost Lost', value: 6 },
                { label: 'Needs Analysis', value: 2 },
                { label: 'Negotiation', value: 4 },
                { label: 'Proposal', value: 3 },
                { label: 'Qualification', value: 1 },
              ])} />, detailType: 'muiDropDown' },
              { label: 'Project Type', name: 'salesProjectTypeId', value: <DropDown selectedValue={0} menuItems={ new List([
                { label: '', value: 0},
                { label: 'Fiber Data (Existing)', value: 6 },
                { label: 'Fiber Data (New)', value: 2 },
                { label: 'Fiber Voice &amp; Data (Existing)', value: 8 },
                { label: 'Fiber Voice &amp; Data (New)', value: 4 },
                { label: 'Wireless Data (Existing)', value: 5 },
                { label: 'Wireless Data (New)', value: 1 },
                { label: 'Wireless Voice &amp; Data (Existing)', value: 7 },
                { label: 'Wireless Voice &amp; Data (New)', value: 3 }
              ])} />, detailType: 'muiDropDown' },
              { label: 'Lead Source', name: 'salesLeadSrcId', value: <DropDown selectedValue={0} menuItems={ new List([
                { label: '', value: 0},
                { label: 'Advertisement', value: 1 },
                { label: 'Email', value: 10 },
                { label: 'Employee Referal', value: 2 },
                { label: 'External Referal', value: 3 },
                { label: 'Other', value: 12 },
                { label: 'Partner', value: 4 },
                { label: 'Public Relations', value: 5 },
                { label: 'Seminar - External', value: 7 },
                { label: 'Seminar - Internal', value: 6 },
                { label: 'Trade Show', value: 8 },
                { label: 'Web', value: 9 },
                { label: 'Word of Mouth', value: 11 },
              ])} />, detailType: 'muiDropDown' },
              { label: 'Lead Campaign Source', name: 'salesCampSrcId', value: <DropDown selectedValue={0} menuItems={ new List([
                { label: '', value: 0},
                { label: 'Conference - 2015', value: 2 },
                { label: 'Oz', value: 1 },
                { label: 'Spring Webinar - 2015', value: 3 },
              ])} />, detailType: 'muiDropDown' },
              { label: '', names: ['offer_made', 'project_started'], value: <Layout widths={{lg: [6,6], sm: [12]}}><Checkbox name={'offer_made'} value={1} label={'Offer Made'} defaultSwitched={true} switched/><Checkbox name={'project_started'} value={1} label={'Project Started'} defaultSwitched={true} switched/></Layout>, detailType: 'muiCheckbox'}
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            widths={{ lg: [4,8]}}
            title={null}
            data={[
              { label: 'Date Offer Made', name: 'dt_offer_made', value: <TextField value={''}/>, detailType: 'muiTextField' },
              { label: 'Date Project Started', name: 'dt_project_start', value: <TextField value={''}/>, detailType: 'muiTextField' },
              { label: 'Closing Date', name: 'dt_closing', value: <TextField value={''}/>, detailType: 'muiTextField' },
              { label: 'Project Ending Date', name: 'dt_project_end', value: <TextField value={''}/>, detailType: 'muiTextField' },
              { label: 'Sales Amount', name: 'sales', value: <TextField value={''}/>, detailType: 'muiTextField' },
              { label: 'Probability Pct.', name: 'probability', value: <TextField value={''}/>, detailType: 'muiTextField' },
              { label: '', name: 'project_result', value: <Checkbox name={'project_result'} value={1} label={'Project Successful'} defaultSwitched={false} switched/>, detailType: 'muiCheckbox' },
              { label: '', value: <RaisedButton primary label="Update" />, detaildetailType: 'muiButton'}
            ]}
          />
        </Layout>
      </Paper>
    </Layout>
    );
  }
});

import {networkModelRenderer, queryRenderer, modelQuery} from '../shared/components/networkRenderer'

let ViewLead = queryRenderer(viewLead, {
  queries: [
    modelQuery('contact', 'lead', 'contactId'),
    modelQuery('user', 'agent', 'agentId')
  ]
});

let ViewLeadPage = React.createClass({
  mixins: [State],
  render() {
    return (
      <ViewLead contactId={+this.getParams().contactId} agentId={+this.getParams().agentId} />
    );
  }
});

export default ViewLeadPage;
