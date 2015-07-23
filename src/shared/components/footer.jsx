import React from 'react'
import Settings from './settings'
import _ from 'lodash'
import {Utils, Styles} from 'material-ui'

let ColorManipulator = Utils.ColorManipulator;

let Footer = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState() {
    return {
      position: { position: this.getPosition() }
    }
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  },

  getPosition() {
      return (window.innerHeight > Settings.contentMinHeight + Settings.footerHeight + Settings.appBarHeight) ? 'absolute' : 'relative';
  },

  handleResize() {
    this.setState({ position : { position: this.getPosition() }})
  },

  style() {

    let textColor = Styles.Colors.white;
    let backgroundColor = Styles.Colors.black;

    return {
      padding: '20px',
      textAlign: 'center',
    	width: '100%',
      height: Settings.footerHeight+'px',
      color: textColor,
      backgroundColor: backgroundColor,
    	bottom: '0',
      zIndex: 2
    }
  },

  render() {

    return (
      <div style={_.assign(this.style(), this.state.position)}>
        Copywrite 2015 One Ring Networks
      </div>
    );
  }
});

export default Footer;
