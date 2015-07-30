import React, { PropTypes, addons } from 'react/addons'
import controllable from 'react-controllables'
import Details, { DetailsRow } from '../../shared/components/details'
import { Paper, TextField } from 'material-ui'
import Layout from '../../shared/components/layout'
import Header from '../../shared/components/header'
import { collectionDropdown } from '../../shared/components/collectionDropdown'

let ProjectTypes = collectionDropdown('projectType');
let SalesStages = collectionDropdown('salesStage');
let LeadSources = collectionDropdown('leadSource');
let CampaignSources = collectionDropdown('campaignSource');

@controllable(['name', 'projectType', 'stage', 'leadSource', 'leadSourceId'])
class CreateFormComponent extends React.Component {
  render() {
    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        {
          this.props.linked ?
            <Header><h1>Convert Lead - {this.props.agent.company}</h1></Header>
          :
            <Header><h1>Create Opportunity with {this.props.account.name}</h1></Header>
        }
        <Paper>
          <Layout widths={{lg: [12,6,6], sm: [12]}} cPadding={'0 20px 20px 20px'}>
            <Details title={`Create Opportunity with `}
                     headerStyle={{color: '#aaa', marginLeft: '32%', marginBottom: '30px'}}>
              <DetailsRow label="Opportunity Name">
                <TextField value={this.props.name} onChange={e =>this.props.onNameChange(e.target.value)} />
              </DetailsRow>
              {
                this.props.linked ?
                  <DetailsRow label="Current Account Owner"></DetailsRow>
                :
                  false
              }
              <DetailsRow label="Project Type">
                <ProjectTypes value={this.props.projectType}
                              onChange={this.props.onProjectTypeChange} />
              </DetailsRow>
              <DetailsRow label="Stage">
                <SalesStages value={this.props.stage}
                             onChange={this.props.onStageChange} />
              </DetailsRow>
              <DetailsRow label="Lead Source">
                <LeadSources value={this.props.leadSourceId}
                             onChange={this.props.onLeadSourceIdChange} />
              </DetailsRow>
              <DetailsRow label="Lead Campaign Source">
                <CampaignSources value={this.props.leadSource}
                                 onChange={this.props.onLeadSourceChange} />
              </DetailsRow>
            </Details>
          </Layout>
        </Paper>
      </Layout>
    );
  }
}

CreateFormComponent.contextTypes = {
  lang: PropTypes.object.isRequired
};

CreateFormComponent.propTypes = {
  name: PropTypes.string.isRequired,
  stage: PropTypes.number.isRequired,
  project_type: PropTypes.number.isRequired,
  lead_source: PropTypes.number.isRequired,
  lead_source_id: PropTypes.number.isRequired,
  linked: PropTypes.bool.isRequired,
  account: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default CreateFormComponent;
