import React, { PropTypes, Component } from 'react'
import Header from '../shared/components/header'
import Store from '../../core/store'
import Layout from '../shared/components/layout'
import Footer from '../shared/components/footer'
import TopNav from '../shared/components/topnav'
import LeftNav from '../shared/components/leftnav'
import Content from '../shared/components/content'
import Table from '../shared/components/table'
import async, { model, collection } from '../shared/components/async'
import { propTypes } from '../shared/decorators'
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
import { State } from 'react-router'

import AccountDetails from './public/details'

let AccountDetailsAgent = async(AccountDetails, { user: model('user') });


import ContractList from '../contracts/list'
let ContractsListQuery = async(ContractList, {
  contracts: collection('contract').by('account')
});

import OppsList from '../opportunities/list'
let OppsListQuery = async(OppsList, {
  opportunities: collection('opportunity').by('account')
})

import ContactList from '../contacts/list'
let ContactListQuery = async(ContactList, {
  contacts: collection('contact').by('account')
});

@async({ account: model('account') })
@propTypes({ account: PropTypes.object })
class AccountView extends Component {
  render() {
    let account = this.props.account;
    return (
      <Layout widths={{}} cPadding={'0 20px 0 0'}>
        <Header><h1>Account - {account.name}</h1></Header>
        <Layout widths={{ lg: [12, 6, 6, 12]}} cPadding={'20px 20px 0 0'}>
          {
              account.user_id ?
                <AccountDetailsAgent userId={account.user_id} account={this.props.account} />
              :
                <AccountDetails user={null} account={this.props.account} />
          }
          <div><Paper style={{padding: '10px 20px 20px 20px'}}><h3 style={{marginBottom: '10px'}}>Opportunities</h3><OppsListQuery accountId={account.id} /></Paper></div>
          <div><Paper style={{padding: '10px 20px 20px 20px'}}><h3 style={{marginBottom: '10px'}}>Contacts</h3><ContactListQuery accountId={account.id} /></Paper></div>
          <div><ContractsListQuery accountId={account.id} /></div>
        </Layout>

      </Layout>
    );
  }
}

let AccountPage = React.createClass({
  mixins: [State],
  render() {
    return <AccountView accountId={+this.getParams().accountId} />;
  }
});

export default AccountPage;
