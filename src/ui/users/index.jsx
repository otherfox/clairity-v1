import React, { PropTypes, Component } from 'react'
import async, { model } from '../shared/components/async'
import Cards from '../shared/components/cards'

@async({ user: model() })
class ViewUser extends React.Component {
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
        <Cards />
      </div>
    );
  }
}

export default ViewUser;
