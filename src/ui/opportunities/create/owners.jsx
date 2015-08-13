import React, {PropTypes} from 'react'
import {usersFetched} from '../../shared/actions/user'
import {queryAccountOwners} from '../../shared/queries/users'
import {getAccountOwners} from '../../shared/services/users'
import DropDown from '../../shared/components/dropDown'
import {Map} from 'immutable'
import {
  networkModelRenderer,
  queryRenderer,
  modelQuery
} from '../../shared/components/networkRenderer'

class AccountOwnersView extends React.Component {
  getMenuItems() {
    return this.props.owners.unshift({label: "", value: ""});
  }
  render() {
    return <DropDown {...this.props}
                     menuItems={this.getMenuItems()} />
  }
}
AccountOwnersView.displayName = 'AccountOwnersInternal';

let AccountOwners = queryRenderer(AccountOwnersView, {
  queries: [
    {
      tableName: 'user',
      writeMethod: usersFetched,
      shouldFetch: e => e.state.data,
      cacheMethod: queryAccountOwners,
      serviceMethod: getAccountOwners,
      propName: 'owners'
    }
  ]
});

AccountOwners.displayName = 'AccountOwners';

export default AccountOwners;
