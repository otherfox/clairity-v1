import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import Details, { DetailsRow } from './index'
import { propTypes } from '../../decorators'

/**
 * DetailsObject takes any object and renders it inside a details component
 */

@propTypes({ target: PropTypes.object.isRequired })
class DetailsObject extends Component {
  render() {
    let o = this.props.target;
    return (
      <Details>
        {
          Object.keys(o).map(k =>
            <DetailsRow label={k}>
              {o[k].toString()}
            </DetailsRow>
          )
        }
      </Details>
    );
  }
}

export default DetailsObject;
