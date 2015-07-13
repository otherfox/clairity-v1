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

import AccountOwners from './owners'
import ProjectTypes from './projectTypes'
import SalesStages from './salesStage'
import LeadSources from './leadSource'
import CampaignSources from './campaignSource'

import {
  RaisedButton,
  TextField,
  Paper
} from 'material-ui'

import controllable from 'react-controllables'
import {List} from 'immutable'
import {State} from 'react-router'

let createLead = React.createClass({
  mixins: [State],

  render() {
    let event = 'controller.cfm?event=convertLead';

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
              { label: 'Change Account Owner?', name: 'user_id', value: <AccountOwners owner={owner} />, detailType: 'muiDropDown' },
              { label: 'Project Type', name: 'project_type', value: <ProjectTypes />, detailType: 'muiDropDown' },
              { label: 'Stage', name: 'stage', value: <SalesStages />, detailType: 'muiDropDown' },
              { label: 'Lead Source', name: 'lead_source_id', value: <LeadSources />, detailType: 'muiDropDown' },
              { label: 'Lead Campaign Source', name: 'lead_source', value: <CampaignSources />, detailType: 'muiDropDown' },
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
