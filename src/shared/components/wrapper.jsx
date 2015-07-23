import React from 'react'
import Settings from './settings'

let Wrapper = React.createClass ({

  style: function() {
    return {
      height: '100%',
      paddingTop: '64px'
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
