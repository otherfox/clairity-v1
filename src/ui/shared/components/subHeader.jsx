import React, { PropTypes, Component, Children }  from 'react'
import Settings from './settings'
import _ from 'lodash'
import { contextTypes } from '../decorators'
import { Utils } from 'material-ui'

@contextTypes({ muiTheme: PropTypes.object })
export default class SubHeader extends Component {
  style() {
    return {
      color: Utils.ColorManipulator.fade(
        this.context.muiTheme.palette.textColor, .6
      ),
      display: 'inline-block',
      marginRight: '10px'
    };
  }

  render() {
    let subHeaders = Children.map( this.props.children, c =>
      <div style={ this.style() }>{ c }</div>
    )
    return (
      <div style={ _.assign(this.style(), this.props.style)} >
        {subHeaders}
      </div>
    );
  }
}
