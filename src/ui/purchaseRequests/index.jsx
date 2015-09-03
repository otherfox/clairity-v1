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
@contextTypes({ muiTheme: PropTypes.object })
class ViewPurchaseRequests extends Component {

  getPurchaseRequests(purchaseRequests) {
    console.log(purchaseRequests);
    return {
      colNames: [
        { label: 'ID', name: 'id', props: { cellStyle: { color: Utils.ColorManipulator.fade(this.context.muiTheme.palette.primary1Color, .75) } } },
        { label: 'Item', name: 'item' },
        { label: 'Location ID', name: 'location_id' },
        { label: 'Approved', name: 'approval_date', cellType:'date' },
        { label: 'Requested By', name: 'requested_by' },
        { label: 'Approval ID', name: 'approval_id' },
        { label: 'Customer', name: 'customer_id', cellType: 'accountById', props: { idField: 'customer_id' } },
        { label: 'Requested', name: 'requested_date', cellType:'date' },
        { label: 'Amount', name: 'amount', cellType:'currency' },
        { label: 'Type', name: 'type' },
        { label: 'Notes', name: 'notes' }
      ],
      data: purchaseRequests,
      colWidths: [1,3,1,1,1,1,1,1,1,1,3],
      widthAdj: -20
    }
  }

  render() {
    return (
      <Layout widths={{}} pPadding={'20px 20px 0 0'}>
        <Header><h1>Purchase Requests</h1></Header>
        <div>
          <Link to='/purchaseRequests/create'>
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
