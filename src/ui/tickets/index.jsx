import React, { Component, PropTypes } from 'react'
import { networkCollectionRenderer } from '../shared/components/networkRenderer'
import { FilteredCollection, Filters, TextFilter, RadioButtonFilter, DateFilter } from '../shared/components/filteredCollection'
import Layout from '../shared/components/layout'
import Table from '../shared/components/table'
import Header from '../shared/components/header'
import { RaisedButton, Utils } from 'material-ui'
import { contextTypes } from '../shared/decorators'
import Selector from './selector'

@contextTypes({ muiTheme: PropTypes.object })
class ViewTickets extends Component {

  getTickets(tickets) {
    console.log(tickets);
    return {
      colNames: [
        { label: 'ID', name: 'id', props: { cellStyle: { color: Utils.ColorManipulator.fade(this.context.muiTheme.palette.primary1Color, .75) } } },
        { label: 'Subject', name: 'subject'},
        { label: 'Status', name: 'status', cellType: 'boolean', props: {cellClasses: { New: true }}},
        { label: 'Priority', name: 'priority', cellType: 'range', props: {cellClasses: { Low: 0, Medium: 2, High: 4}}},
        { label: 'Received', name: 'received_date_time', cellType:'date'},
        { label: 'Modified', name: 'last_mod_date_time', cellType:'date'},
        { label: 'Owner', name: 'owner', cellType: 'agent'}
      ],
      data: tickets,
      colWidths: [1,3,1,1,1,1,1],
      widthAdj: -20
    }
  }

  render() {
    return (
      <Layout widths={{}} pPadding={'20px 20px 0 0'}>
        <Header><h1>Tickets</h1></Header>
        <FilteredCollection data={this.props.tickets}>
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
            <Table {...this.getTickets(this.props.tickets)} selectable />
          </Selector>
        </FilteredCollection>
      </Layout>
    )
  }
}

export default networkCollectionRenderer(ViewTickets, { tableName: 'ticket' });
