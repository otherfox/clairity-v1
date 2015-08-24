import React, { PropTypes, Component }  from 'react'
import Settings from './settings'
import _ from 'lodash'
import { contextTypes } from '../decorators'

@contextTypes({ muiTheme: PropTypes.object })
export default class SubHeader extends Component {
  style() {
    return {
      color: this.context.muiTheme.palette.textColor,
    };
  }

  render() {
    return (
      <div style={ _.assign(this.style(), this.props.style)} >
        {this.props.children}
      </div>
    );
  }
}
