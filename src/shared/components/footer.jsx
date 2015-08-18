import React from 'react'
import Settings from './settings'
import {Utils, Styles} from 'material-ui'

let ColorManipulator = Utils.ColorManipulator;

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'relative'
    }
  }

  componentDidMount() {
    this.getPosition();
    window.addEventListener('resize', e => this._getPosition());
  }

  componentWillDismount() {
    window.removeEventListener('resize', e => this._getPosition());
  }

  render() {
    return (
      <div style={this._style()}>
        Copywrite 2015 One Ring Networks
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

  _getPosition() {
    this.setState({ position: (window.innerHeight > Settings.contentMinHeight + 122) ? 'fixed' : 'relative'});
  }
}

Footer.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default Footer;
