import React, {Component} from 'react'
import { AgentCell } from '../../shared/components/table/tableCells'

export class AccountName extends Component {
  render() {
    let account = this.props.account;
    let agent = this.props.user ? this.props.user : {};
    return (
      <AgentCell>{ agent.name || 'Not Assigned' }</AgentCell>
    )
  }
}
