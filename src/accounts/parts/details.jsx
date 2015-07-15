import React, {PropTypes} from 'react'

export default class AccountDetails extends React.Component {
  render() {
    let account = this.props.account.toJS();
    let agent = this.props.agent.toJS();
    return (
      <Paper>
        <Layout widths={{ lg: [6,6] }} cPadding={'0 20px 20px 20px'}>
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            rowStyle={{marginLeft: '15%'}}
            widths={{ lg: [4,8]}}
            title={'Account Details'}
            data={[
              { label: 'Current Account Owner', value: agent.name },
              { label: 'Name', name: 'name', value: account.name },
              { label: 'Type', name: 'customerTypeId', value: account.type.name },
            ]}
          />
          <Details
            cStyles={{ lg: [{textAlign: 'left'}]}}
            widths={{ lg: [2,10]}}
            title={null}
            data={[
              { label: 'Street 1', name: 'customerStreet1', value: account.street1 },
              { label: 'Street 2', name: 'customerStreet2', value: account.street2 },
              { label: 'City', name: 'customerCity', value: account.city },
              { label: 'State', name: 'customerState', value: account.state },
              { label: 'Zip Code', name: 'customerZip', value: account.zip }
            ]}
          />
        </Layout>
      </Paper>
    );
  }
}

AccountDetails.propTypes = {
  account: PropTypes.object.isRequired
};
