import React, { Component, PropTypes, Children } from 'react'
import Settings from './settings'
import _ from 'lodash'
import { contextTypes } from '../decorators'

@contextTypes({ muiTheme: PropTypes.object })
export default class Content extends Component {
  render() {
    return (
      <div style={this._style()} ref={'content'} id={'content'}>
        <style>{`
          #content {
            padding-left: ${Settings.leftNavWidth+Settings.contentPadding}px;
          }

          @media (max-width: ${Settings.breakpoints.sm}px) {
            #content {
              padding-left: ${Settings.mobilePadding}px};
            }
          }
        `}</style>
        {this.props.children}
      </div>
    );
  }
  _style() {
    let canvasColor = this.context.muiTheme.palette.canvasColor;

    return {
      width: '100%',
      backgroundColor: canvasColor,
      paddingBottom: Settings.footerHeight+Settings.contentPadding+'px',
      minHeight: window.innerHeight
    };
  }
}
