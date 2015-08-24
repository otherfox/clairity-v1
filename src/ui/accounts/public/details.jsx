import React, {PropTypes} from 'react'
import { Paper } from 'material-ui'
import Layout from '../../shared/components/layout'
import Details from '../../shared/components/details'

export default class AccountDetails extends React.Component {
  render() {
    let account = this.props.account;
    let agent = this.props.user ? this.props.user : {};

    return (
      <Paper>
        <Layout widths={{}} cPadding={'0 20px 20px 20px'}>
          <Details
            rowStyle={{marginLeft: '15%'}}
            widths={{ lg: [4,8]}}
            title={'Account Details'}
            data={[
              agent.name ? { label: 'Current Account Owner', value: agent.name } : null,
              { label: 'Type', name: 'customerTypeId', value: account.type.name }
            ]}
          />
        <div></div>
        </Layout>
      </Paper>
    );
  }
}

AccountDetails.propTypes = {
  account: PropTypes.object.isRequired
};
