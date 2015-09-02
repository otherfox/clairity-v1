import React, { PropTypes, Component } from 'react'
import async, { model } from '../shared/components/async'
import { DetailsObject } from '../shared/components/cards'

@async({ user: model() })
class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  style() {
    return {}
  }

  render() {
    return (
      <div>
        <h1>User Single</h1>
        <DetailsObject target={this.props.user} />
      </div>
    );
  }
}

export default class extends Component {
  render() {
    return <ViewUser {...this.props.params} />
  }
};
