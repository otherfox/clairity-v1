import React, { Component, PropTypes } from 'react'
import { networkCollectionRenderer } from '../shared/components/networkRenderer'
import { FilteredCollection, Filters, TextFilter, RadioButtonFilter, DateRangeFilter } from '../shared/components/filteredCollection'
import Layout from '../shared/components/layout'
import Table from '../shared/components/table'
import Header from '../shared/components/header'
import { RaisedButton } from 'material-ui'

class ViewTickets extends Component {

  getTickets(tickets) {
    console.log(tickets);
    return {
      colNames: [
        { label: 'ID', name: 'id'},
        { label: 'Subject', name: 'subject'},
        { label: 'Status', name: 'status'},
        { label: 'Priority', name: 'priority'},
        { label: 'Received', name: 'received_date_time'},
        { label: 'Modified', name: 'last_mod_date_time'},
        { label: 'Owner', name: 'owner'}
      ],
      data: tickets,
      colWidths: [1,3,1,1,1,1,1],
      widthAdj: -30
    }
  }

  render() {
    return (
      <Layout widths={{}} cPadding={'20px 20px 0 0'}>
        <Header><h1>Tickets</h1></Header>
        <FilteredCollection data={this.props.tickets}>
          <Filters>
            <TextFilter label='subject' name='subject' />
            <RadioButtonFilter label={'Status'} name={'status'} buttonGroup={{name: 'status'}} options={[
              { label: 'Open', value: 'Open'},
              { label: 'New', value: 'New'},
              { label: 'Both', value: '', defaultChecked: true}
            ]} />
            <DateRangeFilter label='Received' name='received_data_time' />
          </Filters>
          <Table {...this.getTickets(this.props.tickets)} />
        </FilteredCollection>
      </Layout>
    )
  }
}

export default networkCollectionRenderer(ViewTickets, { tableName: 'ticket' });
