import React, {PropTypes} from 'react'
import Layout from  '../shared/components/layout'
import DropDown from '../shared/components/dropDown'
import Details from  '../shared/components/details'
import Header from '../shared/components/header'

import {
  networkModelRenderer,
  queryRenderer,
  modelQuery
} from '../shared/components/networkRenderer'

import {usersFetched} from '../shared/actions/user'
import {queryAccountOwners} from '../shared/queries/users'
import {getAccountOwners} from '../shared/services/users'

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

let AccountOwners = queryRenderer(class AccountOwnersView extends React.Component {
  render() {
    return <DropDown selectedValue={owner.id} menuItems={this.props.owners} />
  }
}, {
  queries: [
    {
      writeMethod: usersFetched,
      shouldFetch: e => e.state.data,
      cacheMethod: queryAccountOwners,
      serviceMethod: getAccountOwners,
      propName: 'owners'
    }
  ]
})

let createLead = React.createClass({
  mixins: [State],

  render() {
    let event = 'controller.cfm?event=convertLead';

    let hiddenValues = {
      customer_id: "1480",
      contact_id: "7223",
      createdbyuser_id: "130",
      lastmodifiedbyuser_id: "130",
      entrykey: "1C86AA75-F0C6-4FA7-9D4F4E8C2452772D",
      dt_created: "{ts '2015-07-03 19:16:41'}",
      dt_lastmodified: "{ts '2015-07-03 19:16:41'}",
    };

    let opp = this.props.lead.toJS();
    let owner = this.props.agent.toJS();

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Header><h1>Convert Lead - {opp.name}</h1></Header>
      <Paper>
        <Layout widths={{lg: [12,6,6], sm: [12]}} cPadding={'0 20px 20px 20px'}>
          <Details
            title={'Opportunity Details'}
            data={[
              { label: 'Name', name: 'name', value: <TextField value={''}/>, detailType: 'muiTextField' },
              { label: 'Current Account Owner:', value: <TextField value={owner.name} disabled= {true}/>, detailType: 'muiTextField' },
              { label: 'Change Account Owner?', name: 'user_id', value: <DropDown selectedValue={owner.id} menuItems={ new List([
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
              { label: 'Project Type', name: 'project_type', value: <DropDown selectedValue={0} menuItems={ new List([
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
                { label: 'Stage', name: 'stage', value: <DropDown selectedValue={0} menuItems={ new List([
                { label: '', value: 0},
                { label: 'Closed Won', value: 5 },
                { label: 'Clost Lost', value: 6 },
                { label: 'Needs Analysis', value: 2 },
                { label: 'Negotiation', value: 4 },
                { label: 'Proposal', value: 3 },
                { label: 'Qualification', value: 1 },
              ])} />, detailType: 'muiDropDown' },
              { label: 'Lead Source', name: 'lead_source_id', value: <DropDown selectedValue={0} menuItems={ new List([
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
              { label: 'Lead Campaign Source', name: 'lead_source', value: <DropDown selectedValue={0} menuItems={ new List([
                { label: '', value: 0},
                { label: 'Conference - 2015', value: 2 },
                { label: 'Oz', value: 1 },
                { label: 'Spring Webinar - 2015', value: 3 },
              ])} />, detailType: 'muiDropDown' },
              {label: '', value: <RaisedButton primary={true} linkButton={true} label="Update" href={'/#/lead/'+this.getParams().contactId+'/'+this.getParams().agentId+'/edit'}/>, detaildetailType: 'muiButton'}
            ]}
          />
        </Layout>
      </Paper>
    </Layout>
    );
  }
});

let CreateLead = queryRenderer(createLead, {
  queries: [
    modelQuery('contact', 'lead', 'contactId'),
    modelQuery('user', 'agent', 'agentId')
  ]
});

let CreateLeadPage = React.createClass({
  mixins: [State],
  render() {
    return (
      <CreateLead contactId={+this.getParams().contactId} agentId={+this.getParams().agentId} />
    );
  }
});

export default CreateLeadPage;
