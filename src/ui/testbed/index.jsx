/**
 * This page is purely for testing components, making sure new features work,
 * etc.
 */

import React, { PropTypes, Component } from 'react'
import { contextTypes } from '../shared/decorators'
import { Tokenizer } from '../shared/components/typeahead'

@contextTypes({muiTheme: PropTypes.object})
class TestbedPage extends Component {
  render() {
    return (
      <Tokenizer />
    )
  }
}

export default TestbedPage;
