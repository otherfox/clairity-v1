import React from 'react'
import Settings from './settings'
import _ from 'lodash'

let Content = React.createClass ({

  style: function() {

    let textColor = this.context.muiTheme.palette.textColor;

    return {
      color: textColor,
    };
  },

  render: function() {
    return (
      <div style={ _.assign(this.style(), this.props.style)} >
        {this.props.children}
      </div>
    );
  }
});

Content.contextTypes = {
  muiTheme: React.PropTypes.object
}

export default Content;
