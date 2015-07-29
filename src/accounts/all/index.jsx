import React, {PropTypes} from 'react'
import Header from '../../shared/components/header'
import Layout from  '../../shared/components/layout'
import Table from  '../../shared/components/table'
import Details from '../../shared/components/details'
import { RaisedButton } from 'material-ui'

import _ from 'lodash'
import controllable from 'react-controllables'
import {Navigation} from 'react-router'
import Link from '../shared/components/link'

let viewAccounts = React.createClass({
  mixins: [Navigation],

  propTypes: {
    accounts: React.PropTypes.object
  },

  getAccounts(accounts) {

    let names = accounts.map(a => a.name);

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
      maxWidth: 1,
      widthAdj: -30
    };
  },

  render() {

    let accounts = this.props.accounts.toJS();

    return (
      <Layout widths={{}} pPadding={'20px 20px 0 0'}>
          <Header><h1>View Accounts</h1></Header>
          <Table {...this.getAccounts(accounts)} />
      </Layout>
    );
  }
});

import {networkCollectionRenderer} from '../../shared/components/networkRenderer'

export default networkCollectionRenderer(viewAccounts, { tableName: 'account' });
