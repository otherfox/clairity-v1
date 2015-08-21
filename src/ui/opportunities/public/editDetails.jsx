import React, { PropTypes, addons } from 'react/addons'
import { Paper, TextField, Checkbox, RaisedButton } from 'material-ui'
import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
import DropDown from '../../shared/components/dropDown'
import DatePicker from '../../shared/components/datePicker'
import { collectionDropdown } from '../../shared/components/collectionDropdown'
import { List } from 'immutable'

let ProjectTypes = collectionDropdown('projectType')
let SalesStages = collectionDropdown('salesStage')
let LeadSources = collectionDropdown('leadSource')
let CampaignSources = collectionDropdown('campaignSource')

let OpportunityDetails = React.createClass({
  mixins: [addons.LinkedStateMixin],
  propTypes: {
    opportunity: PropTypes.object.isRequired
  },
  getInitialState() {
    let o = this.props.opportunity;
    return {
      name: o.name,
      stage: o.stage,
      lead_source_id: o.lead_source_id,
      lead_source: o.lead_source,
      project_type: o.project_type,
      offer_made: o.offer_made == 1 ? true : false,
      project_started: o.project_started == 1 ? true : false,
      project_result: o.project_result == 1 ? true : false,
      sales: o.sales,
      probability: o.probability,
      dt_offer_made: o.dt_offer_made,
      dt_closing: o.dt_closing,
      dt_project_start: o.dt_project_start,
      dt_project_end: o.dt_project_end
    };
  },
  render() {
    let opp = this.props.opportunity;
    return (
      <Paper>
        <Layout widths={{ lg: [6,6] }} cPadding={'0 20px 20px 20px'}>
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            rowStyle={{marginLeft: '15%'}}
            widths={{ lg: [4,8]}}
            title={'Opportunity Details'}
            data={[
              { label: 'Name', name: 'oppName', value: <TextField valueLink={this.linkState('name')} />, detailType: 'muiTextField' },
              { label: 'Stage', name: 'salesStageId', value: <SalesStages valueLink={this.linkState('stage')} />, detailType: 'muiDropDown' },
              { label: 'Project Type', name: 'salesProjectTypeId', value: <ProjectTypes valueLink={this.linkState('project_type')} />, detailType: 'muiDropDown' },
              { label: 'Lead Source', name: 'salesLeadSrcId', value: <LeadSources valueLink={this.linkState('lead_source_id')} />, detailType: 'muiDropDown' },
              { label: 'Lead Campaign Source', name: 'salesCampSrcId', value: <CampaignSources valueLink={this.linkState('lead_source')} />, detailType: 'muiDropDown' },
              { label: '', names: ['offer_made', 'project_started'], value:
                <Layout widths={{lg: [6,6], sm: [12]}}>
                  <Checkbox name="offer_made" checkedLink={this.linkState('offer_made')} label="Offer Made" />
                  <Checkbox name="project_started" checkedLink={this.linkState('project_started')} label="Project Started" />
                  <Checkbox name="project_result" checkedLink={this.linkState('project_result')}label="Project Successful" />
                </Layout>
              , detailType: 'muiCheckbox'}
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            widths={{ lg: [4,8]}}
            title={null}
            data={[
              { label: 'Date Offer Made', name: 'dt_offer_made', value: <DatePicker valueLink={this.linkState('dt_offer_made')} />, detailType: 'muiTextField' },
              { label: 'Closing Date', name: 'dt_closing', value: <DatePicker valueLink={this.linkState('dt_closing')} />, detailType: 'muiTextField' },
              { label: 'Date Project Started', name: 'dt_project_start', value: <DatePicker valueLink={this.linkState('dt_project_start')} />, detailType: 'muiTextField' },
              { label: 'Project Ending Date', name: 'dt_project_end', value: <DatePicker valueLink={this.linkState('dt_project_end')} />, detailType: 'muiTextField' },
              { label: 'Sales Amount', name: 'sales', value: <TextField valueLink={this.linkState('sales')} />, detailType: 'muiTextField' },
              { label: 'Probability Pct.', name: 'probability', value: <TextField valueLink={this.linkState('probability')}/>, detailType: 'muiTextField' },
            ]}
          />
        </Layout>
      </Paper>
    );
  }
})

export default OpportunityDetails;
