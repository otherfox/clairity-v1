import React, {PropTypes} from 'react'
import {Paper, TextField, Checkbox, RaisedButton} from 'material-ui'
import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
import DropDown from '../../shared/components/dropDown'
import { collectionDropdown } from '../../shared/components/collectionDropdown'
import {List} from 'immutable'

let ProjectTypes = collectionDropdown('projectType')
let SalesStages = collectionDropdown('salesStage')
let LeadSources = collectionDropdown('leadSource')
let CampaignSources = collectionDropdown('campaignSource')

export default class OpportunityDetails extends React.Component {
  render() {
    let opp = this.props.opportunity.toJS();
    return (
      <Paper>
        <Layout widths={{ lg: [6,6] }} cPadding={'0 20px 20px 20px'}>
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            rowStyle={{marginLeft: '15%'}}
            widths={{ lg: [4,8]}}
            title={'Opportunity Details'}
            data={[
              { label: 'Name', name: 'oppName', value: <TextField value={opp.name}/>, detailType: 'muiTextField' },
              { label: 'Stage', name: 'salesStageId', value: <SalesStages />, detailType: 'muiDropDown' },
              { label: 'Project Type', name: 'salesProjectTypeId', value: <ProjectTypes />, detailType: 'muiDropDown' },
              { label: 'Lead Source', name: 'salesLeadSrcId', value: <LeadSources />, detailType: 'muiDropDown' },
              { label: 'Lead Campaign Source', name: 'salesCampSrcId', value: <CampaignSources />, detailType: 'muiDropDown' },
              { label: '', names: ['offer_made', 'project_started'], value:
                <Layout widths={{lg: [6,6], sm: [12]}}>
                  <Checkbox name="offer_made" checked={!!opp.offer_made} label={'Offer Made'} />
                  <Checkbox name="project_started" checked={!!opp.project_started} label={'Project Started'} />
                </Layout>
              , detailType: 'muiCheckbox'}
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
            ]}
          />
        </Layout>
      </Paper>
    );
  }
}

OpportunityDetails.propTypes = {
  account: PropTypes.object.isRequired
};
