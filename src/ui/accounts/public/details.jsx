import React, {PropTypes} from 'react'
import { Paper } from 'material-ui'
import {
  Layout,
  Details
} from '../../shared/components'
import { propTypes } from '../../shared/decorators'
import _ from 'lodash'

@propTypes({ account: PropTypes.object.isRequired })
export default class AccountDetails extends React.Component {
  render() {
    let account = this.props.account;
    let excludes = [
      'zip_code',
      'city',
      'name',
      'street1',
      'street2',
      'user_id',
      'state',
      'token',
      'type',
      'id'
    ];
    let agent = this.props.user ? this.props.user : {};
    account = _.zipObject(
                _.filter(
                  _.pairs(account),
                  n => !_.contains(excludes, n[0])
                ));

    let details = Object.keys(account).map( r => ({
      'label': r.split('_')
                .map( r => r.charAt(0).toUpperCase()+r.slice(1, r.length))
                .join(' '),
      'value': account[r].toString()
    }));
    return (
      <Paper>
        <Layout widths={{}} cPadding={'0 20px 20px 20px'}>
          <Details
            rowStyle={{marginLeft: '15%'}}
            widths={{ lg: [4,8]}}
            title={'Account Details'}
            data={ details }
          />
        <div></div>
        </Layout>
      </Paper>
    );
  }
}
