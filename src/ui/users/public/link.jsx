import React, {Component} from 'react'
import { AgentCell } from '../../shared/components/table/tableCells'

export default class UserName extends Component {
  render() {
    let agent = this.props.user ? this.props.user : {};
    return (
      <AgentCell>{ agent.name || 'Not Assigned' }</AgentCell>
    )
  }
}
