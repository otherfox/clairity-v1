import React, {PropTypes} from 'react'
import {Paper, TextField, Checkbox, RaisedButton} from 'material-ui'
import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
import DropDown from '../../shared/components/dropdown'
import {List} from 'immutable'

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
