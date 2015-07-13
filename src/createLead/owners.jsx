import React, {PropTypes} from 'react'
import {usersFetched} from '../shared/actions/user'
import {queryAccountOwners} from '../shared/queries/users'
import {getAccountOwners} from '../shared/services/users'

let AccountOwners = queryRenderer(class AccountOwnersView extends React.Component {
  render() {
    return <DropDown selectedValue={owner.id} menuItems={this.props.owners} />
  }
}, {
  queries: [
    {
      writeMethod: usersFetched,
      shouldFetch: e => e.state.data,
      cacheMethod: queryAccountOwners,
      serviceMethod: getAccountOwners,
      propName: 'owners'
    }
  ]
})
