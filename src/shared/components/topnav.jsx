
import React from 'react'
import Settings from './settings'
import mui from 'material-ui'
import _ from 'lodash'

var AppTopNav = mui.LeftNav;
var AppTopBar = mui.AppBar;

var menuItems = [
  { route: 'administration', text: 'Administration' },
  { route: 'executive', text: 'Executive' },
  { route: 'field-ops', text: 'Field Ops' },
  { route: 'finance', text: 'Finance' },
  { route: 'hr', text: 'HR' },
  { route: 'provisioning', text: 'Provisioning' },
  { route: 'sales', text: 'Sales' },
  { route: 'support', text: 'Support' },
  { route: 'voice-ops', text: 'Voice Ops' },
  { route: 'demo-employee', text: 'Demo Employee' }
];

var TopNav = React.createClass ({

/*    mixins: [Router.Navigation, Router.State],*/

    getInitialState: function() {
        return {
            selectedIndex: null
        }
    },

    toggle: function() {
        this.refs.topNav.toggle();
    },

/*
    _getSelectedIndex: function() {
        var currentItem;

        for (var i = menuItems.length - 1; i >= 0; i--) {
          currentItem = menuItems[i];
          if (currentItem.route && this.context.isActive(currentItem.route)) return i;
        };
    },
*/
    style: function() {
      return {
      }
    },

    _onLeftNavChange: function(e, key, payload) {
        this.context.transitionTo(payload.route);
    },

    _onHeaderClick: function() {
        this.context.transitionTo('ui-guide');
        this.refs.topNav.close();
    },

    _onMenuIconButtonTouchTap: function() {
        this.refs.topNav.toggle();
    },

    render: function() {
        var header = <div  onClick={this._onHeaderClick}>Clarity</div>;

        return (
          <div style={this.style()}>
            <AppTopBar
              onLeftIconButtonTouchTap={this._onMenuIconButtonTouchTap}
              title= "Clairity"
              zDepth={0}>
            </AppTopBar>

            <AppTopNav
              ref="topNav"
              docked={false}
              isInitiallyOpen={false}
              header={header}
              menuItems={menuItems}

              onChange={this._onLeftNavChange}
            />

          </div>
        )
    },

});

export default TopNav
