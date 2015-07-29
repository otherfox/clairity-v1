import React from 'react'
import {State, Link} from 'react-router'
import _ from 'lodash'
import {navStack} from '../router/navigationStack'

class CustomLink extends React.Component {

  style() {
    let textColor = this.context.muiTheme.palette.primary1Color;
    return {
      color: textColor,
      textDecoration: 'none'
    }
  }

  get self() {
    return this.refs.self.props;
  }

  handleNavigation() {
    navStack.push(this.props.to, this.props.params, this.props.displayName);
  }

  render() {
    return (
      <Link ref="self" onClick={() => this.handleNavigation()} to={this.props.to} params={this.props.params} style={_.assign(this.style(), this.props.style)}>
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
