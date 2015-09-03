import React, {Component, PropTypes} from 'react'
import Settings from './settings'
import { Utils, Styles } from 'material-ui'
import { contextTypes } from '../decorators'
let ColorManipulator = Utils.ColorManipulator;

@contextTypes({ muiTheme: PropTypes.object })
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'relative'
    }
    this._setPosition = this._setPosition.bind(this);
  }

  componentDidMount() {
    this._setPosition();
    window.addEventListener('resize', this._setPosition);
  }

  componentWillDismount() {
    window.removeEventListener('resize', this._setPosition);
  }

  render() {
    return (
      <div style={this._style()}>
        Copyright 2015 One Ring Networks
      </div>
    );
  }

  _style() {
    let textColor = Styles.Colors.white;
    let backgroundColor = Styles.Colors.black;

    return {
      padding: '20px',
      textAlign: 'center',
      position: this.state.position,
      width: '100%',
      height: Settings.footerHeight+'px',
      color: textColor,
      backgroundColor: backgroundColor,
      bottom: '0',
      zIndex: 2
    }
  }

  _setPosition() {
    let position = (window.innerHeight > Settings.contentMinHeight + Settings.footerHeight + Settings.headerHeight) ? 'fixed' : 'relative';
    this.setState({ position: 'fixed'});
  }
}
