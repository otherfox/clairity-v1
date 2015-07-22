import React from 'react'
import Settings from './settings'
import _ from 'lodash'
import {Menu, MenuItem} from 'material-ui'

var LeftNav = React.createClass ({

  style: function() {
    return {
      root: {
        position: 'absolute',
        width: Settings.leftNavWidth,
        height: '100%',
        backgroundColor: this.context.muiTheme.component.menu.backgroundColor,
        borderRight: '1px solid '+this.context.muiTheme.palette.borderColor,
      },
      menu: {
        backgroundColor: this.context.muiTheme.component.menu.backgroundColor,
        zIndex: 3,
      }
    }
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  render: function() {
      return (
        <div className={'leftNav'} style={this.style().root}>
          <style>
            {`
              @media (max-width: ${Settings.breakpoints.sm}px) {
                .leftNav {
                  display: none;
                }
              }
            `}
          </style>
          <Menu zDepth={0} style={this.style().menu} menuItems={[
            { text:"Aging Reports", type: MenuItem.Types.LINK, target:"aging-reports"},
            { text:"IP Blocks", type: MenuItem.Types.LINK, target:"ip-blocks"},
            { text:"IP Zones", type: MenuItem.Types.LINK, target:"ip-zones"},
            { text:"Accounts", type: MenuItem.Types.LINK, target:"accounts"},
            { text:"Opportunites", type: MenuItem.Types.LINK, target:"opps"},
            { text:"Contacts", type: MenuItem.Types.LINK, target:"contacts"},
            { text:"Leads", type: MenuItem.Types.LINK, target:"leads"},
            { text:"Open Installs", type: MenuItem.Types.LINK, target:"open-installs"},
            { text:"Work Orders", type: MenuItem.Types.LINK, target:"work-orders"},
            { text:"Settings", type: MenuItem.Types.LINK, target:"settings"},
            { text:"Login", type: MenuItem.Types.LINK, target:"login"}
          ]} />
        </div>
      );
  }

});



export default LeftNav;
