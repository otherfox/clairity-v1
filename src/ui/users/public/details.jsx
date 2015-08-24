import React, {Component} from 'react'

export class UserName extends Component {
  render() {
    let account = this.props.account;
    let agent = this.props.user ? this.props.user : {};
    return (
      <div>{ agent.name || 'Not Assigned' }</div>
    )
  }
}
