import React, { PropTypes, Component } from 'react'
import async, { action } from '../shared/components/async'

import { RaisedButton } from 'material-ui'

@async({ createContact: action() })
class CreateContact extends Component {
  render() {
    return (
      <RaisedButton onClick={() => this.props.actions.createContact({
        company: '',
        name: '',
        comments: '',
        phone: '',
        cell: '',
        email: '',
        relationships: [{
          pop_id: 0, customer_id: 0, type: 0
        }],
        extension: '',
        fax: ''
      })} label="Submit" />
    );
  }
}

export default CreateContact;
