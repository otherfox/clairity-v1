// let required = true;
// let formSchema = {
//   name: { type: 'text', required, label: 'Full Name', errorHint: 'Please provide a name' },
//   age: { type: 'number', label: 'Age (Years)' },
//   address: {
//     type: 'form'
//     street1: { type: 'text', required, label: 'Street Address (Line 1)' },
//     street2: { type: 'text', label: 'Street Address (Line 2)'},
//     state: { type: 'enum', label: 'State', enumTable: 'state', required },
//     city: { type: 'text', required },
//     zip: { type: 'number', required, length: 5 }
//   }
// }

import React, { Component, PropTypes } from 'react'
import { propTypes } from '../../decorators'
import { TextField, DatePicker } from 'material-ui'
import { collectionDropdown } from '../collectionDropdown'

const typeMap = {
  text: TextField,
  date: DatePicker,
  enum: collectionDropdown
};

function genForm(schema) {
  return Object.keys(schema)
               .map(k => [k, schema[k]])
               .map(([k, v]) => genComponent(v.type, k));  // Pseudocode
}

class FormRenderer extends Component {

}
