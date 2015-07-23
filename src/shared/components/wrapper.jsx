import React from 'react'
import Settings from './settings'

let Wrapper = React.createClass ({

  style: function() {
    return {
      position: 'relative',
      minHeight: '100%'
    };
  },

  render: function() {
    return (
      <div style={this.style()}>
        {this.props.children}
      </div>
    );
  }
});

export default Wrapper;
