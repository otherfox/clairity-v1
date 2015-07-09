import React from 'react'
import Settings from './settings'
import _ from 'lodash'

let Content = React.createClass ({

  style: function() {
    return {
      width: '100%',
      paddingLeft: Settings.leftNavWidth+Settings.contentPadding+'px',
      paddingBottom: Settings.footerHeight+'px',
      minHeight: Settings.contentMinHeight+'px'
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

export default Content;
