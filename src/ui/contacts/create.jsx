import React, { PropTypes, Component } from 'react'
import async, { action } from '../shared/components/async'

import { RaisedButton } from 'material-ui'

@async({ createContact: action() })
class CreateContact extends Component {
  render() {
    return (
      <RaisedButton onClick={() => this.props.actions.createContact({
        company: 'form test 1',
        name: 'test test',
        comments: 'test',
        phone: '111-111-1111',
        cell: '222-222-2222',
        email: 'test@test.test',
        relationships: [{
          contact_id: 13867, pop_id: 1, customer_id: 0, type: 0
        }],
        extension: 'extensions',
        fax: 'fax'
      })} label="Submit" />
    );
  }
}

export default CreateContact;
