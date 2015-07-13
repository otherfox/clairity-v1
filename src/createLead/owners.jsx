import React, {PropTypes} from 'react'
import {usersFetched} from '../shared/actions/user'
import {queryAccountOwners} from '../shared/queries/users'
import {getAccountOwners} from '../shared/services/users'
import DropDown from '../shared/components/dropDown'
import {Map} from 'immutable'
import {
  networkModelRenderer,
  queryRenderer,
  modelQuery
} from '../shared/components/networkRenderer'

class AccountOwnersView extends React.Component {
  getMenuItems() {
    return this.props.owners.map(o => new Map({
      label: o.get('name'),
      value: o.get('id')
    })).unshift(new Map({label: "", value: ""}));
  }
  render() {
    return <DropDown {...this.props}
                     selectedValue={this.props.owner.id}
                     menuItems={this.getMenuItems()} />
  }
}
AccountOwnersView.displayName = 'AccountOwnersInternal';

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

AccountOwners.displayName = 'AccountOwners';

export default AccountOwners;
