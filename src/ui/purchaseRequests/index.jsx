import React, { Component, PropTypes } from 'react'
import { FilteredCollection, Filters, TextFilter, RadioButtonFilter, DateFilter } from '../shared/components/filteredCollection'
import Layout from '../shared/components/layout'
import Link from '../shared/components/link'
import Table from '../shared/components/table'
import Header from '../shared/components/header'
import { RaisedButton, Utils } from 'material-ui'
import { contextTypes } from '../shared/decorators'
import async, { collection, model } from '../shared/components/async'

@async({
  purchaseRequests: collection('purchaseRequest').all()
 })
@contextTypes({ muiTheme: PropTypes.object, lang: PropTypes.object })
class ViewPurchaseRequests extends Component {

  getPurchaseRequests(purchaseRequests) {
    console.log(purchaseRequests);
    return {
      colNames: [
        { label: this.context.lang('ID'), name: 'id', props: { cellStyle: { color: Utils.ColorManipulator.fade(this.context.muiTheme.palette.primary1Color, .75) } } },
        { label: this.context.lang('Customer'), name: 'customer_id', cellType: 'accountById' },
        { label: this.context.lang('Item'), name: 'item' },
        { label: this.context.lang('Requested By'), name: 'requested_by', cellType: 'agentById' },
        { label: this.context.lang('Requested'), name: 'requested_date', cellType:'date' },
        { label: this.context.lang('Approved'), name: 'approval_date', cellType:'date' },
        { label: this.context.lang('Amount'), name: 'amount', cellType:'currency' },
      ],
      data: purchaseRequests,
      colWidths: [1,3,5,3,1,1,1],
      widthAdj: -20
    }
  }

  render() {
    return (
      <Layout widths={{}} pPadding={'20px 20px 0 0'}>
        <Header><h1>{this.context.lang('Purchase Requests')}</h1></Header>
        <div>
          <Link to='/purchase-requests/create'>
            <RaisedButton label='Request Purchase' />
          </Link>
        </div>
        <FilteredCollection data={this.props.purchaseRequests}>
          <Filters breakpoints={{md: 1200}}>
            <TextFilter label='Item' name='item' />
          </Filters>
          <Table {...this.getPurchaseRequests(this.props.purchaseRequests)}/>
        </FilteredCollection>
      </Layout>
    )
  }
}

export default ViewPurchaseRequests;
