import React from 'react'
import Settings from './settings'
import {Styles} from 'material-ui'

class Footer extends React.Component {

  style() {

    let backgroundColor = this.context.muiTheme.palette.textColor;
    let textColor = this.context.muiTheme.palette.canvasColor;

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
