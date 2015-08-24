import React, { PropTypes, Component }  from 'react'
import Settings from './settings'
import _ from 'lodash'
import { contextTypes } from '../decorators'
import { Utils } from 'material-ui'

@contextTypes({ muiTheme: PropTypes.object })
export default class SubHeader extends Component {
  style() {
    return {
      color: Utils.ColorManipulator.fade(this.context.muiTheme.palette.textColor, .6),
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
