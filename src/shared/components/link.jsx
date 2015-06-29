import React from 'react'
import {Styles} from 'material-ui'
import {State, Link} from 'react-router'

let {Colors} = Styles;

class CustomLink extends React.Component {

  style() {
    let textColor = this.context.muiTheme.palette.primary1Color;
    return {
      color: textColor
    }
  }

  render() {

    return (
      <Link to={this.props.to} style={this.style()}>
        {this.props.children}
      </Link>
    );
  }
}

CustomLink.proptypes = {
  to: React.PropTypes.string,
  params: React.PropTypes.object
}

CustomLink.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default CustomLink;
