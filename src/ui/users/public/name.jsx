import React, { Component, PropTypes } from 'react'
import { AgentCell } from '../../shared/components/table/tableCells'
import { contextTypes } from '../../shared/decorators'

@contextTypes
class UserName extends Component {
  render() {
    let agent = this.props.user ? this.props.user : {};
    return (
      <AgentCell>{ agent.name || 'Not Assigned' }</AgentCell>
    )
  }
}

export default UserName;
