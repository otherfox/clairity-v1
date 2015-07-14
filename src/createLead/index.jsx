import React, {PropTypes, addons} from 'react/addons'
import Layout from  '../shared/components/layout'
import Details from  '../shared/components/details'
import Header from '../shared/components/header'
import { collectionDropdown } from '../shared/components/collectionDropdown'
import {State} from 'react-router'
import {convertLead} from './actions'
import {
  RaisedButton,
  TextField,
  Paper
} from 'material-ui'
import {
  queryRenderer,
  modelQuery
} from '../shared/components/networkRenderer'

import AccountOwners from './owners'

let ProjectTypes = collectionDropdown('projectType')
let SalesStages = collectionDropdown('salesStage')
let LeadSources = collectionDropdown('leadSource')
let CampaignSources = collectionDropdown('campaignSource')

let createLead = React.createClass({
  mixins: [State, addons.LinkedStateMixin],

  getInitialState() {
    return {
      name: '',
      owner: this.props.agent.get('id'),
      projectType: '',
      salesStage: '',
      leadSource: '',
      campaignSource: ''
    }
  },

  convertLead() {
    convertLead({contact: this.props.lead, formData: this.state});
  },

  render() {
    let opp = this.props.lead.toJS();
    let owner = this.props.agent.toJS();

    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Header><h1>Convert Lead - {opp.company}</h1></Header>
      <Paper>
        <Layout widths={{lg: [12,6,6], sm: [12]}} cPadding={'0 20px 20px 20px'}>
          <Details
            title={'Opportunity Details'}
            data={[
              { label: 'Name', name: 'name', value: <TextField valueLink={this.linkState('name')}/>, detailType: 'muiTextField' },
              { label: 'Current Account Owner:', value: <TextField value={owner.name} disabled= {true}/>, detailType: 'muiTextField' },
              { label: 'Change Account Owner to:', name: 'user_id', value: <AccountOwners valueLink={this.linkState('owner')} />, detailType: 'muiDropDown' },
              { label: 'Project Type', name: 'project_type', value: <ProjectTypes valueLink={this.linkState('projectType')}/>, detailType: 'muiDropDown' },
              { label: 'Stage', name: 'stage', value: <SalesStages valueLink={this.linkState('salesStage')} />, detailType: 'muiDropDown' },
              { label: 'Lead Source', name: 'lead_source_id', value: <LeadSources valueLink={this.linkState('leadSource')} />, detailType: 'muiDropDown' },
              { label: 'Lead Campaign Source', name: 'lead_source', value: <CampaignSources valueLink={this.linkState('campaignSource')} />, detailType: 'muiDropDown' },
              {label: '', value: <RaisedButton primary={true} label="Update" onClick={this.convertLead} />, detaildetailType: 'muiButton'}
            ]}
          />
        </Layout>
      </Paper>
    </Layout>
    );
  }
});
//href={'/#/lead/'+this.getParams().contactId+'/'+this.getParams().agentId+'/edit'}

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
