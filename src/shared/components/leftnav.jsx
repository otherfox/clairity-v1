import React from 'react'
import Settings from './settings'
import {Menu, MenuItem} from 'material-ui'

var nestedMenuItems = [
  { type: MenuItem.Types.NESTED, text: 'Apply', items: [
    { payload: '1', text: 'Nested Item 1' }
  ] },
  { type: MenuItem.Types.NESTED, text: 'Expenses', items: [
    { payload: '1', text: 'Nested Item 1' }
  ] },
  { type: MenuItem.Types.NESTED, text: 'Quickbooks', items: [
    { payload: '1', text: 'Nested Item 1' }
  ] },
  { payload: '1', text: 'Invoice Customer'},
  { payload: '2', text: 'Agent Summary'},
  { payload: '3', text: 'Aging Report'},
  { payload: '4', text: 'Credit Memos'},
  { payload: '5', text: 'Customer Statement'},
  { payload: '6', text: 'E-Billing Worksheet'},
  { payload: '7', text: 'Manage Tax Rates'},
  { payload: '8', text: 'Manage Emailed Invoices'},
  { payload: '9', text: 'Manage Provider Circuits'},
  { payload: '10', text: 'Overdue Balances'},
  { payload: '11', text: 'Search Transactions'},
  { payload: '12', text: 'Sprint Invoice'},
  { payload: '13', text: 'Support Notes'},
  { payload: '14', text: 'Transaction Journal'},
  { payload: '15', text: 'View Invoices'},
];

var LeftNav = React.createClass ({

  /* mixins: [Router.Navigation, Router.State],*/

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
        <div style={this.style().root}>
          <Menu menuItems={nestedMenuItems} zDepth={0} style={this.style().menu}/>
        </div>
      )
  }

});



export default LeftNav;
