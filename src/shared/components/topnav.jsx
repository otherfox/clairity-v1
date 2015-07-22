
import React from 'react'
import Settings from './settings'
import { AppBar, LeftNav, Utils, FlatButton } from 'material-ui'
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings'
import _ from 'lodash'

let ColorManipulator = Utils.ColorManipulator;

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
    style() {
      return {
        root: {},
        header: {
          color: this.context.muiTheme.palette.primary1Color,
          padding: '10px 20px',
          fontSize: '2em',
          borderBottom: '2px solid '+this.context.muiTheme.palette.primary1Color
        },
        icon: {
          fill: this.context.muiTheme.palette.canvasColor,
          border: '10px',
          margin: '12px',
        }
      }
    },

    contextTypes: {
      muiTheme: React.PropTypes.object
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
      var header = <div style={this.style().header} onClick={this._onHeaderClick}>Clairity</div>;

      return (
        <div style={this.style().root}>
          <AppBar
            onLeftIconButtonTouchTap={this._onMenuIconButtonTouchTap}
            iconElementRight={<SettingsIcon style={this.style().icon} />}
            title= "Clairity"
            zDepth={0}
          />

          <LeftNav
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

TopNav.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default TopNav
