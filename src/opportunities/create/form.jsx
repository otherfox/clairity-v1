import React, {PropTypes, addons} from 'react/addons'
import controllable from 'react-controllables'

import { collectionDropdown } from '../../shared/components/collectionDropdown'

let ProjectTypes = collectionDropdown('projectType');
let SalesStages = collectionDropdown('salesStage');
let LeadSources = collectionDropdown('leadSource');
let CampaignSources = collectionDropdown('campaignSource');

@controllable(['name', 'project_type', 'stage', 'lead_source', 'lead_source_id'])
class CreateFormComponent extends React.Component {
  render() {
    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Header><h1>Convert Lead - {opp.company}</h1></Header>
        <Paper>
          <Layout widths={{lg: [12,6,6], sm: [12]}} cPadding={'0 20px 20px 20px'}>
            <Details
              title={`Create Opportunity with ${opp.name} @ ${opp.company}`}
              headerStyle={{color: '#aaa', marginLeft: '32%', marginBottom: '30px'}}
              data={[
                { label: 'Opportunity Name', value: <TextField value={this.props.name} onChange={e => this.props.onNameChange(e.target.value)}/>, detailType: 'muiTextField' },
                { label: 'Current Account Owner:', value: <TextField value={owner.name} disabled={true} />, detailType: 'muiTextField' },
                { label: 'Project Type', value: <ProjectTypes value={this.props.project_type} onChange={v => this.props.onProject_typeChange(v)}/>, detailType: 'muiDropDown' },
                { label: 'Stage', value: <SalesStages value={this.props.stage} onChange={v => this.props.onStageChange(v)} />, detailType: 'muiDropDown' },
                { label: 'Lead Source', value: <LeadSources value={this.props.lead_source_id} onChange={v => this.props.onLead_source_idChange(v)} />, detailType: 'muiDropDown' },
                { label: 'Lead Campaign Source', value: <CampaignSources value={this.props.lead_source} onChange={v => this.props.onLead_sourceChange(v)} />, detailType: 'muiDropDown' },
                { label: '', value: <div><RaisedButton primary={true} label="Update" onClick={() => this.props.onSubmit(this.props)} /> <Link style={{paddingLeft: '20px'}} to="view-account" params={{locationId: 1, accountId: opp.customer_id}}>View Account</Link></div>, detaildetailType: 'muiButton'}
              ]}
            />
          </Layout>
        </Paper>
      </Layout>
    );
  }
}

CreateFormComponent.propTypes = {
  name: PropTypes.string.isRequired,
  stage: PropTypes.number.isRequired,
  project_type: PropTypes.number.isRequired,
  lead_source: PropTypes.number.isRequired,
  lead_source_id: PropTypes.number.isRequired,
};



/*
export const CreateForm = React.createClass({
  mixins: [addons.LinkedStateMixin],
  render() {

  }
});
*/
