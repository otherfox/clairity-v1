import React from 'react'
import Settings from './settings'

let Content = React.createClass ({

  style: function() {
    return {
      width: '100%',
      paddingLeft: '290px'
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
