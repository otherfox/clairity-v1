import React, {PropTypes} from 'react'
import { Paper, TextField, Checkbox, RaisedButton } from 'material-ui'
import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'
import DropDown from '../../shared/components/dropDown'
import { List } from 'immutable'

export default class OpportunityDetails extends React.Component {
  render() {
    let opp = this.props.opportunity;
    return (
      <Paper>
        <Layout widths={{ lg: [6,6] }} cPadding={'0 20px 20px 20px'}>
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            pStyles={{ lg: {marginLeft: '15%'} }}
            widths={{ lg: [4,8]}}
            title={'Opportunity Details'}
            data={[
              { label: 'Name', name: 'oppName', value: opp.name },
              { label: 'Stage', name: 'salesStageId', value: opp.salesStage.name },
              { label: 'Project Type', name: 'salesProjectTypeId', value: opp.salesProjectType.name },
              { label: 'Lead Source', name: 'salesLeadSrcId', value: opp.salesLeadSrc.name },
              { label: 'Lead Campaign Source', name: 'salesCampSrcId', value: opp.salesCampSrc.name },
              { label: '', names: ['offer_made', 'project_started'], value:
                <Layout widths={{lg: [6,6], sm: [12]}}>
                  <Checkbox name="offer_made" checked={!!opp.offer_made} label={'Offer Made'}/>
                  <Checkbox name="project_started" checked={!!opp.project_started} label={'Project Started'}/>
                  <Checkbox name="project_result" checked={opp.project_result} label={'Project Successful'} />
                </Layout>
              , detailType: 'muiCheckbox' }
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            widths={{ lg: [4,8]}}
            title={null}
            data={[
              { label: 'Date Offer Made', name: 'dt_offer_made', value: opp.dt_offer_made },
              { label: 'Date Project Started', name: 'dt_project_start', value: opp.dt_project_start } ,
              { label: 'Closing Date', name: 'dt_closing', value: opp.dt_closing } ,
              { label: 'Project Ending Date', name: 'dt_project_end', value: opp.dt_project_end } ,
              { label: 'Sales Amount', name: 'sales', value: opp.sales } ,
              { label: 'Probability Pct.', name: 'probability', value: opp.probability } ,
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
