import React, { Component, PropTypes } from 'react'
import { FilteredCollection, Filters, TextFilter, RadioButtonFilter, DateFilter } from '../shared/components/filteredCollection'
import Layout from '../shared/components/layout'
import Link from '../shared/components/link'
import Table from '../shared/components/table'
import Header from '../shared/components/header'
import { RaisedButton, Utils } from 'material-ui'
import { contextTypes } from '../shared/decorators'
import Selector from './selector'

@contextTypes({ muiTheme: PropTypes.object })
class ViewPurchaseRequests extends Component {

  getTickets(purchaseRequests) {
    console.log(purchaseRequests);
    return {
      colNames: [
        { label: 'ID', name: 'id', props: { cellStyle: { color: Utils.ColorManipulator.fade(this.context.muiTheme.palette.primary1Color, .75) } } }
        p.id,p.customer_id,
        p.location_id,
        p.amount,
        p.item,
        p.notes,
        p.requested_by,
        p.requested_date,
        p.approval_id,
        p.approval_date,
        p.declined_id,
        p.declined_date,
        p.suggested_vendor_id,
        p.received_id,
        p.received_date,
        pt.id as typeId,
        pt.name as typeName,
        ps.id as sourceId,ps.name as sourceName
      ],
      data: purchaseRequests,
      colWidths: [1,3,1,1,1,1,1],
      widthAdj: -20
    }
  }

  render() {
    return (
      <Layout widths={{}} pPadding={'20px 20px 0 0'}>
        <Header><h1>Purchase Requests</h1></Header>
        <div>
          <Link to='/tickets/create'>
            <RaisedButton label='Create Ticket' />
          </Link>
        </div>
        <FilteredCollection data={this.props.purchaseRequests}>
          <Filters breakpoints={{md: 1200}}>
            <TextFilter label='Subject' name='subject' />
            <TextFilter label='Owner' name='owner' />
            <RadioButtonFilter label={'Status'} name={'status'} buttonGroup={{name: 'status'}} options={[
              { label: 'Open', value: 'Open'},
              { label: 'New', value: 'New'},
              { label: 'Both', value: '', defaultChecked: true}
            ]} />
            <DateFilter label='Received Min' name='received_date_time' future />
            <DateFilter label='Received Max' name='received_date_time' past />
          </Filters>
          <Selector>
            <Table {...this.getTickets(this.props.purchaseRequests)}/>
          </Selector>
        </FilteredCollection>
      </Layout>
    )
  }
}

export default networkCollectionRenderer(ViewTickets, { tableName: 'ticket' });
