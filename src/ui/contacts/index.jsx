import React, { PropTypes, Component } from 'react'
import async, { model } from '../shared/components/async'
import Cards from '../shared/components/cards'

@async({ contact: model() })
class ViewContact extends React.Component {
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
        <h1>Contact Single</h1>
        <Cards />
      </div>
    );
  }
}

export default ViewContact;
