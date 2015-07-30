import React, {PropTypes, addons} from 'react/addons'
import controllable from 'react-controllables'

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
                { label: 'Opportunity Name', name: 'name', value: <TextField value={this.props.name} onChange={e => this.props.onNameChange(e.target.value)}/>, detailType: 'muiTextField' },
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
