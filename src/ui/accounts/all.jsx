import React, { Component, PropTypes } from 'react'
import Header from '../shared/components/header'
import Layout from '../shared/components/layout'
import Table from '../shared/components/table'

import query, { collection } from '../shared/components/async'
import { propTypes } from '../shared/decorators'

@query({ accounts: collection('account').all() })
@propTypes({ accounts: PropTypes.array.isRequired })
class ViewAccounts extends Component {

  getAccounts(accounts) {
    return {
      colNames: [
        { label: 'Accounts', name: 'name', cellType: 'account', props: { idField: 'id'} },
      ],
      data: accounts,
      filters: {
        data: [
          { label: 'Account Name', filterType: 'muiTextField', name: 'name' }
        ]
      },
      colWidths: [1],
      widthAdj: -30
    };
  }

  render() {

    let accounts = this.props.accounts;

    return (
      <Layout widths={{}} pPadding={'20px 20px 0 0'}>
        <Header><h1>View Accounts</h1></Header>
        <Table {...this.getAccounts(accounts)} />
      </Layout>
    );
  }

}

export default ViewAccounts;
