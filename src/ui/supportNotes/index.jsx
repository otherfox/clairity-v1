
import React, { Component, PropTypes } from 'react'
import { contextTypes, propTypes } from '../shared/decorators'

import async, { collection } from '../shared/components/async'

@async({ notes: collection('supportNote').by('account') })
@contextTypes({ lang: PropTypes.object })
@propTypes({ notes: PropTypes.arrayOf(PropTypes.object) })
class ViewSupportNotes extends Component {
  render() {
    return <div />;
  }
}

export default ViewSupportNotes;
