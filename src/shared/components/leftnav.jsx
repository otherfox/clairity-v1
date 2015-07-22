import React from 'react'
import Settings from './settings'
import {Menu, MenuItem, MenuDivider} from 'material-ui'
import Router, {Navigation, State} from 'react-router'
import _ from 'lodash'

var LeftNav = React.createClass ({

  mixins: [Navigation, State],

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
          <Menu zDepth={0} style={this.style().menu}>
            <MenuItem primaryText="Aging Reports" value="aging-reports"/>
            <MenuItem primaryText="IP Blocks" value="ip-blocks"/>
            <MenuItem primaryText="IP Zones" value="ip-zones"/>
            <MenuItem primaryText="Accounts" value="accounts"/>
            <MenuItem primaryText="Opportunites" value="opps" />
            <MenuItem primaryText="Contacts" value="contacts" />
            <MenuItem primaryText="Leads" value="leads" />
            <MenuItem primaryText="Open Installs" value="open-installs" />
            <MenuItem primaryText="Work Orders" value="work-orders"/>
            <MenuDivider />
            <MenuItem primaryText="Settings" value="login"/>
            <MenuItem primaryText="Login" value="login"/>
          </Menu>
        </div>
      )
  }

});



export default LeftNav;
