import React from 'react'
import Settings from './settings'
import _ from 'lodash'
import { Menu, MenuItem } from 'material-ui'
import { Navigation,State } from 'react-router'

let LeftNav = React.createClass ({
  mixins: [Navigation,State],
  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState() {
    return {
      height: '100%'
    }
  },

  // _bodyresize() {
  //   console.log('body resize');
  //   console.log(document.getElementById('content').offsetHeight);
  // },
  //
  // componentDidMount() {
  //   this._setHeight();
  //   console.log('content: ',document.getElementById('content').offsetHeight);
  //   console.log('body: ',document.body.offsetHeight);
  //   document.getElementById('content').onresize = this._bodyresize;
  //   document.body.onresize = this._bodyresize;
  //   window.addEventListener('resize', e => this._setHeight());
  // },
  //
  // componentWillDismount() {
  //   window.removeEventListener('resize', e => this._setHeight());
  // },

  render() {
    return (
      <div className={'leftNav'} style={this._style().root}>
        <style>
          {`
            @media (max-width: ${Settings.breakpoints.sm}px) {
              .leftNav {
                display: none;
              }
            }
          `}
        </style>
        <Menu zDepth={0} style={this._style().menu} onItemTap={this._link} menuItems={[
          { text: 'Aging Reports', target: 'aging-reports'},
          { text: 'IP Blocks', target: 'ip-blocks'},
          { text: 'IP Zones', target: 'ip-zones'},
          { text: 'Accounts', target: 'accounts'},
          { text: 'Opportunites', target: 'opps'},
          { text: 'Contacts', target: 'contacts'},
          { text: 'Leads', target: 'leads'},
          { text: 'Open Installs', target: 'open-installs'},
          { text: 'Work Orders', target: '/work-orders/1538'},
          { text: 'Tickets', target: '/tickets'},
          { text: 'Purchase Requests', target:'/purchase-requests'},
          { text: 'Login', target: 'login'}
        ]} />
      </div>
    );
  },

  _style() {
    return {
      root: {
        position: 'absolute',
        width: Settings.leftNavWidth,
        height: this.state.height,
        backgroundColor: this.context.muiTheme.component.menu.backgroundColor,
        borderRight: '1px solid '+this.context.muiTheme.palette.borderColor,
      },
      menu: {
        backgroundColor: this.context.muiTheme.component.menu.backgroundColor,
        zIndex: 3,
      }
    }
  },

  _link(e, idx, item) {
    this.transitionTo(item.target);
  },

  // _setHeight() {
  //   let extraHeight = Settings.footerHeight + Settings.headerHeight;
  //   this.setState({ height: (window.innerHeight > Settings.contentMinHeight + extraHeight) ? document.getElementById('content').offsetHeight + extraHeight + 'px' : window.innerHeight +'px'});
  // }

});



export default LeftNav;
