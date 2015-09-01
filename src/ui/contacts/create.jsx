import React, { PropTypes, Component } from 'react'
import async, { action } from '../shared/components/async'

@async({ createContact: action() })
class CreateContact extends Component {
  render() {
    return (
      <div />
    );
  }
}

export default CreateContact;
