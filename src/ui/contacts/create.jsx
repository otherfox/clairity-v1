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
        customer_id: 0,
        phone: '',
        cell: '',
        id: '',
        email: '',
        relationships: [{
          id: '', customer_id: 0, contact_id: 0, type: ''
        }],
        extension: '',
        fax: ''
      })} label="Submit" />
    );
  }
}

export default CreateContact;
