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
      position: 'absolute',
      width: Settings.leftNavWidth
    }
  },

  render: function() {
      return (
        <div style={this.style()}>
          <Menu menuItems={nestedMenuItems} zDepth={0} style={{zIndex: 3}}/>
        </div>
      )
  }

});

export default LeftNav;
