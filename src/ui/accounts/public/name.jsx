import React, {Component} from 'react'
import { AccountCell } from '../../shared/components/table/tableCells'

export default class AccountName extends Component {
  render() {
    let account = this.props.account || {};
    return (
      <AccountCell accountId={account.id}>{ account.name || 'Not Assigned' }</AccountCell>
    )
  }
}
