import React from 'react'
import {State, Link} from 'react-router'

class CustomLink extends React.Component {

  style() {
    let textColor = this.context.muiTheme.palette.primary1Color;
    return {
      color: textColor
    }
  }

  render() {
    return (
      <Link to={this.props.to} params={this.props.params} style={this.style()}>
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
