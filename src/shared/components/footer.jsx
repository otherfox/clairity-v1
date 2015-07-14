import React from 'react'
import Settings from './settings'
import {Utils, Styles} from 'material-ui'

let ColorManipulator = Utils.ColorManipulator;

class Footer extends React.Component {

  style() {

    let textColor = Styles.Colors.white;
    let backgroundColor = Styles.Colors.black;

    return {
      padding: '20px',
      textAlign: 'center',
			position: 'absolute',
    	width: '100%',
      height: Settings.footerHeight+'px',
      color: textColor,
      backgroundColor: backgroundColor,
    	bottom: '0',
      zIndex: 2
    }
  }

  render() {

    return (
      <div style={this.style()}>
        Copywrite 2015 One Ring Networks
      </div>
    );
  }
}

Footer.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default Footer;
