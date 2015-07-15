import React, {PropTypes} from 'react'
import Header from '../shared/components/header'
import Store from '../shared/store'
import Layout from '../shared/components/layout'
import Footer from '../shared/components/footer'
import TopNav from '../shared/components/topnav'
import LeftNav from '../shared/components/leftnav'
import Content from '../shared/components/content'
import Table from '../shared/components/table'

import {
  networkModelRenderer,
  queryRenderer,
  modelQuery,
  collectionViaQuery
} from '../shared/components/networkRenderer'

import {
  RadioButtonGroup,
  RadioButton,
  Checkbox,
  FlatButton,
  RaisedButton,
  FloatingActionButton,
  IconButton,
  Toggle,
  Slider,
  DropDownMenu,
  DatePicker,
  TextField,
  Paper
} from 'material-ui'

import controllable from 'react-controllables'
import {State} from 'react-router'

import AccountDetails from './parts/details'
let AccountDetailsAgent = networkModelRenderer(AccountDetails, 'user')

import OppsList from '../opportunities/list'
let OppsListQuery = queryRenderer(OppsList, {
  queries: [
    collectionViaQuery({
      table: 'opportunity',
      viaTable: 'account',
      propName: 'opportunities',
      idName: 'accountId',
      keyName: 'customer_id'
    })
  ]
});

import ContactList from '../contacts/list'
let ContactListQuery = queryRenderer(ContactList, {
  queries: [
    collectionViaQuery({
      table: 'contact',
      viaTable: 'account',
      idName: 'accountId',
      keyName: 'customer_id'
    })
  ]
});

let accountView = React.createClass({
  render() {
    let account = this.props.account.toJS();
    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Header><h1>Account - {account.name}</h1></Header>
        <Layout widths={{}} cPadding={'20px 20px 0 0'}>
          {
              account.user_id ?
                <AccountDetailsAgent id={account.user_id} account={this.props.account} />
              :
                <AccountDetails user={null} account={this.props.account} />
          }
          <OppsListQuery accountId={account.id} />
          <ContactListQuery accountId={account.id} />
        </Layout>

      </Layout>
    )
  }
});

let Account = networkModelRenderer(accountView, 'account');

let AccountPage = React.createClass({
  mixins: [State],
  render() {
    return <Account id={+this.getParams().accountId} />;
  }
});

export default AccountPage;
