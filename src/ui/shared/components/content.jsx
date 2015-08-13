import React from 'react'
import Settings from './settings'
import _ from 'lodash'

let Content = React.createClass ({

  style: function() {

    let canvasColor = this.context.muiTheme.palette.canvasColor;

    return {
      width: '100%',
      backgroundColor: canvasColor,
      paddingBottom: Settings.footerHeight+Settings.contentPadding+'px',
      minHeight: Settings.contentMinHeight+'px'
    };
  },

  render: function() {
    return (
      <div style={ _.assign(this.style(), this.props.style)} className={'content'}>
        <style>{`
          .content {
            padding-left: ${Settings.leftNavWidth+Settings.contentPadding}px;
          }

          @media (max-width: ${Settings.breakpoints.sm}px) {
            .content {
              padding-left: ${Settings.mobilePadding}px};
            }
          }
        `}</style>
        {this.props.children}
      </div>
    );
  }
});

Content.contextTypes = {
  muiTheme: React.PropTypes.object
}

export default Content;
