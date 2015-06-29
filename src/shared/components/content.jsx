import React from 'react'
import Settings from './settings'

let Content = React.createClass ({

  style: function() {
    return {
      width: '100%',
      paddingLeft: Settings.leftNavWidth+Settings.contentPadding+'px'
    };
  },

  render: function() {
    return (
      <div style={this.style()} >
        {this.props.children}
      </div>
    );
  }
});

export default Content;
