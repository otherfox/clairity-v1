/**
 * This page is purely for testing components, making sure new features work,
 * etc.
 */

import React, { PropTypes, Component } from 'react'
import { contextTypes } from '../shared/decorators'

import CreateContact from '../contacts/create'

@contextTypes({muiTheme: PropTypes.object})
class TestbedPage extends Component {
  render() {
    return <CreateContact />;
  }
}

export default TestbedPage;
