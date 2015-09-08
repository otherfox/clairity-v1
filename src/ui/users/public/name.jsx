import React, { Component, PropTypes } from 'react'
import { AgentCell } from '../../shared/components/table/tableCells'
import { contextTypes } from '../../shared/decorators'

@contextTypes({ lang: PropTypes.object })
class UserName extends Component {
  render() {
    let agent = this.props.user ? this.props.user : {};
    console.log('UserName render')
    return (
      <AgentCell>{ agent.name || this.context.lang('Unassigned') }</AgentCell>
    )
  }
}

export default UserName;
