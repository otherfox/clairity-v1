import React, { Component, PropTypes } from 'react'
import { Header, Layout, Table, Cards, LangText } from '../shared/components'

import async, { collection, model } from '../shared/components/async'
import { propTypes, contextTypes } from '../shared/decorators'

import {
  FilteredCollection, Filters, CheckBoxFilter, TextFilter, RadioButtonFilter
} from '../shared/components/filteredCollection'

@async({ accounts: collection('account').all() })
@contextTypes({ lang: PropTypes.object })
@propTypes({ accounts: PropTypes.array.isRequired })
class ViewAccounts extends Component {
  getAccounts(accounts) {
    return {
      colNames: [
        { label: 'Account', name: 'name', cellType: 'account' },
        { label: 'Account Owner', name: 'user_id', cellType: 'agentById' }
      ],
      data: accounts,
      colWidths: [1],
      widthAdj: -30
    };
  }

  render() {
    let accounts = this.props.accounts;

    return (
      <Layout widths={{}} pPadding={'20px 20px 0 0'}>
        <Header><h1><LangText>View Accounts</LangText></h1></Header>
        <FilteredCollection data={accounts}>
          <Filters>
            <TextFilter name={'name'} label=<LangText>Account Name</LangText> />
          </Filters>
          <Cards {...this.getAccounts(accounts)} header={'name'} cardType={'account'} rowHeight={16} linkParam={'id'} />
        </FilteredCollection>
      </Layout>
    );
  }
}

export default ViewAccounts;
