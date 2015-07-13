import React, {PropTypes} from 'react'
import {usersFetched} from '../shared/actions/user'
import {queryAccountOwners} from '../shared/queries/users'
import {getAccountOwners} from '../shared/services/users'

import {
  networkModelRenderer,
  queryRenderer,
  modelQuery
} from '../shared/components/networkRenderer'

class AccountOwnersView extends React.Component {
  render() {
    return <DropDown {...this.props} selectedValue={owner.id} menuItems={this.props.owners} />
  }
}

let AccountOwners = queryRenderer(AccountOwnersView, {
  queries: [
    {
      writeMethod: usersFetched,
      shouldFetch: e => e.state.data,
      cacheMethod: queryAccountOwners,
      serviceMethod: getAccountOwners,
      propName: 'owners'
    }
  ]
});

export default AccountOwners;
