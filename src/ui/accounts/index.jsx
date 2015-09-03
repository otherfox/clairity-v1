import React, { Component, PropTypes } from 'react'
import { Paper, Utils } from 'material-ui'

import { Header, Layout, Link, SubHeader } from '../shared/components'
import { propTypes, contextTypes } from '../shared/decorators'

import async, { model, collection } from '../shared/components/async'
import { AgentCell } from '../shared/components/table/tableCells'


import AccountDetails from './public/details'
import { AccountName } from '../users/public'
import ContractList from '../contracts/list'
import OppsList from '../opportunities/list'
import ContactList from '../contacts/list'
import { AccountLocations } from '../locations/list'

let AccountAgent = async(AccountName, { user: model() });

let ContractsListQuery = async(ContractList, { contracts: collection('contract').by('account') });
let OppsListQuery = async(OppsList, { opportunities: collection('opportunity').by('account') });
let ContactListQuery = async(ContactList, { contacts: collection('contact').by('account') });


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
    let address = [street1, street2, city, state, zip_code]
      .filter(k => k)
      .join(', ');

    return (
      <Layout widths={{}} cPadding={'0 20px 0 0'}>
        <Header>
          <h1>{account.name}</h1>
        </Header>
        <SubHeader>
          { address }
          {
            (account.user_id) ?
              <AccountAgent userId={account.user_id} />
            :
              null
          }
          { account.type.name }
        </SubHeader>

        <Layout widths={{ lg: [5, 7, 12]}} cPadding={'20px 20px 0 0'}>
          <AccountDetails user={null} account={this.props.account} />
          <div style={{padding: '10px 20px 20px 20px'}}>
            <h3 style={this.style().header}>Locations</h3>
            <AccountLocations accountId={this.props.accountId} />
          </div>
          <div>
            <Layout widths={{}} cPadding={'0 0 20px 0'}>
              <div>
                <Paper style={{padding: '10px 20px 20px 20px'}}>
                  <h3 style={this.style().header}>Opportunities</h3>
                  <OppsListQuery accountId={account.id} />
                </Paper>
              </div>
              <div>
                <Paper style={{padding: '10px 20px 20px 20px'}}>
                  <h3 style={this.style().header}>Contacts</h3>
                  <ContactListQuery accountId={account.id} />
                </Paper>
              </div>
            </Layout>
          </div>
          <div><ContractsListQuery accountId={account.id} /></div>
        </Layout>

      </Layout>
    );
  }
}

class AccountPage extends Component {
  render() {
    return <AccountView {...this.props.params} />;
  }
}

export default AccountPage;
