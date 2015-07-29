import React from 'react'
import {State, Link} from 'react-router'
import _ from 'lodash'

class CustomLink extends React.Component {

  style() {
    let textColor = this.context.muiTheme.palette.primary1Color;
    return {
      color: textColor,
      textDecoration: 'none'
    }
  }

  render() {
    return (
      <Link onClick={() => alert('link clicked!')} to={this.props.to} params={this.props.params} style={_.assign(this.style(), this.props.style)}>
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
