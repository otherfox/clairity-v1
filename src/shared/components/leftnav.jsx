import React from 'react'
import Settings from './settings'
import _ from 'lodash'
import {Menu, MenuItem} from 'material-ui'
import {Navigation,State} from 'react-router'

var LeftNav = React.createClass ({
  mixins: [Navigation,State],

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

  link(e, idx, item) {
    debugger;
    this.transitionTo(item.target);
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
          <Menu zDepth={0} style={this.style().menu} onItemTap={this.link} menuItems={[
            { text: "Aging Reports", target: "aging-reports"},
            { text: "IP Blocks", target: "ip-blocks"},
            { text: "IP Zones", target: "ip-zones"},
            { text: "Accounts", target: "accounts"},
            { text: "Opportunites", target: "opps"},
            { text: "Contacts", target: "contacts"},
            { text: "Leads", target: "leads"},
            { text: "Open Installs", target: "open-installs"},
            { text: "Work Orders", target: "work-orders"},
            { text: "Settings", target: "settings"},
            { text: "Login", target: "login"}
          ]} />
        </div>
      );
  }

});



export default LeftNav;
