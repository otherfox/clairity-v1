import React, { PropTypes, Component } from 'react'
import Store from '../../core/store'

import {
  Header,
  Layout,
  Link,
  Footer,
  TopNav,
  LeftNav,
  Content,
  SubHeader,
  Table
} from '../shared/components'

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
  Paper,
  Utils
} from 'material-ui'

import controllable from 'react-controllables'
import { State } from 'react-router'
import { contextTypes } from '../shared/decorators'

import { UserName } from '../users/public'
let AccountAgent = async(UserName, {
  user: model('user')
});

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

import AccountDetails from './public/details'

@async({ account: model('account') })
@propTypes({ account: PropTypes.object })
@contextTypes({ muiTheme: PropTypes.object })
class AccountView extends Component {
  style() {
    return {
      header: {
        marginBottom: '10px',
        color: Utils.ColorManipulator.fade(this.context.muiTheme.palette.primary1Color, 1)
      }
    }
  }
  render() {
    let account = this.props.account;
    let { street1, street2, city, state, zip_code } = account;
    let address =
      [ street1, street2, city, state, zip_code ]
      .filter( k => k )
      .join(', ');

    return (
      <Layout widths={{}} cPadding={'0 20px 0 0'}>
        <Header>
          <h1>{account.name}</h1>
        </Header>
        <SubHeader>
          {
            (account.user_id) ?
              <AccountAgent userId={account.user_id} />
            :
              null
          }
          { address }
        </SubHeader>

        <Layout widths={{ lg: [5, 7, 12]}} cPadding={'20px 20px 0 0'}>
          <AccountDetails user={null} account={this.props.account} />
          <div>
            <Layout widths={{}} cPadding={'0 0 20px 0'}>
              <div><Paper style={{padding: '10px 20px 20px 20px'}}><h3 style={this.style().header}>Opportunities</h3><OppsListQuery accountId={account.id} /></Paper></div>
              <div><Paper style={{padding: '10px 20px 20px 20px'}}><h3 style={this.style().header}>Contacts</h3><ContactListQuery accountId={account.id} /></Paper></div>
            </Layout>
          </div>
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
