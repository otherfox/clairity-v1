import React, {PropTypes, addons} from 'react/addons'
import Layout from  '../../shared/components/layout'
import Details from  '../../shared/components/details'
import Header from '../../shared/components/header'
import Link from '../../shared/components/link'
import _ from 'lodash'
import { collectionDropdown } from '../../shared/components/collectionDropdown'
import {State, Navigation} from 'react-router'
import {v4} from 'uuid'
import {convertLead} from '../actions'
import moment from 'moment'
import {
  RaisedButton,
  TextField,
  Paper
} from 'material-ui'
import {
  queryRenderer,
  modelQuery
} from '../../shared/components/networkRenderer'

import AccountOwners from './owners'

let ProjectTypes = collectionDropdown('projectType')
let SalesStages = collectionDropdown('salesStage')
let LeadSources = collectionDropdown('leadSource')
let CampaignSources = collectionDropdown('campaignSource')

let createLead = React.createClass({
  mixins: [State, Navigation, addons.LinkedStateMixin],

  getInitialState() {
    return {
      name: '',
      project_type: '',
      stage: '',
      lead_source_id: '',
      lead_source: ''
    }
  },

  contextTypes: {
    muiThemes: React.PropTypes.object
  },

  convertLead() {
    let data = _.clone(this.state);
    let entrykey = v4();
    let now = moment();
    data.entrykey = (entrykey.slice(0, 23) + entrykey.slice(24, entrykey.length)).toUpperCase();
    data.customer_id = this.props.lead.get('customer_id');
    data.contact_id = +this.getParams().contactId;
    data.createdbyuser_id = +this.getParams().userId;
    data.lastmodifiedbyuser_id = +this.getParams().userId;
    data.dt_created = `{ts '${now.format("YYYY-MM-DD HH:MM:SS")}'}`;
    data.dt_lastmodified = `{ts '${now.format("YYYY-MM-DD HH:MM:SS")}'}`;
    convertLead({
      data,
      completed: () => this.transitionTo('view-account', this.props.lead.get('customer_id'))
    });
  },

  render() {
    let opp = this.props.lead;
    let owner = this.props.agent;
    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Header><h1>Convert Lead - {opp.company}</h1></Header>
        <Paper>
          <Layout widths={{lg: [12,6,6], sm: [12]}} cPadding={'0 20px 20px 20px'}>
            <Details
              title={`Create Opportunity with ${opp.name} @ ${opp.company}`}
              headerStyle={{color: '#aaa', marginLeft: '32%', marginBottom: '30px'}}
              data={[
                { label: 'Opportunity Name', name: 'name', value: <TextField valueLink={this.linkState('name')}/>, detailType: 'muiTextField' },
                { label: 'Current Account Owner:', value: <TextField value={owner.name} disabled={true} />, detailType: 'muiTextField' },
                { label: 'Project Type', name: 'project_type', value: <ProjectTypes valueLink={this.linkState('project_type')}/>, detailType: 'muiDropDown' },
                { label: 'Stage', name: 'stage', value: <SalesStages valueLink={this.linkState('stage')} />, detailType: 'muiDropDown' },
                { label: 'Lead Source', name: 'lead_source_id', value: <LeadSources valueLink={this.linkState('lead_source_id')} />, detailType: 'muiDropDown' },
                { label: 'Lead Campaign Source', name: 'lead_source', value: <CampaignSources valueLink={this.linkState('lead_source')} />, detailType: 'muiDropDown' },
                { label: '', value: <div><RaisedButton primary={true} label="Update" onClick={this.convertLead} /> <Link style={{paddingLeft: '20px'}} to="view-account" params={{locationId: 1, accountId: opp.customer_id}}>View Account</Link></div>, detaildetailType: 'muiButton'}
              ]}
            />
          </Layout>
        </Paper>
      </Layout>
    );
  }
});
//href={'/#/lead/'+this.getParams().contactId+'/'+this.getParams().userId+'/edit'}

let CreateLead = queryRenderer(createLead, {
  queries: [
    modelQuery('contact', 'lead', 'contactId'),
    modelQuery('user', 'agent', 'userId')
  ]
});

let CreateLeadPage = React.createClass({
  mixins: [State],
  render() {
    return (
      <CreateLead contactId={+this.getParams().contactId} userId={+this.getParams().userId} />
    );
  }
});

export default CreateLeadPage;
