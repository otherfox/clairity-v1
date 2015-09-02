/**
 * This page is purely for testing components, making sure new features work,
 * etc.
 */

import React, { PropTypes, Component } from 'react'
import { contextTypes } from '../shared/decorators'
import {
  asyncTokenizer,
  asyncTypeahead
} from '../shared/components/collectionDropdown'
import async, { action, query, collection } from '../shared/components/async'
import controllable from 'react-controllables'

let NotifyTokenizer = asyncTokenizer({ collection: collection('contact').all() });
let NotifyTypeahead = asyncTypeahead({ collection: collection('contact').all() });

@controllable(['caller', 'caller2'])
@contextTypes({muiTheme: PropTypes.object})
class TestbedPage extends Component {
  render() {
    return (
      <div>
        <h2>Tokenizer</h2>
        <NotifyTokenizer value={ this.props.caller2 || '' }
                         onOptionSelected={ i => this.props.onCaller2Change(i) }/>
        <h2>Typeahead</h2>
        <NotifyTypeahead value={ this.props.caller || '' }
                         onOptionSelected={ i => this.props.onCallerChange(i) }/>
      </div>
    )
  }
}

export default TestbedPage;
