import React, { Component, PropTypes } from 'react'
import { networkCollectionRenderer } from '../shared/components/networkRenderer'
import Layout from '../shared/components/layout'
import Table from '../shared/components/table'
import { RaisedButton } from 'material-ui'

class ViewTickets extends Component {

  getTickets(tickets) {
    console.log(tickets);
    return {
      colNames: [
        { label: '', name: '', cellType: 'string'},
        { label: 'ID', name: 'id'},
        { label: 'Subject', name: 'subject'},
        { label: 'Status', name: 'status'},
        { label: 'Priority', name: 'priority'},
        { label: 'Received', name: 'received_date_time'},
        { label: 'Modified', name: 'last_mod_date_time'},
        { label: 'Owner', name: 'owner'}
      ],
      data: tickets.map(r => ({
        id: r.id,
        subject: r.subject,
        status: r.status,
        priority: r.priority,
        received_date_time: r.received_date_time,
        last_mod_date_time: r.last_mod_date_time,
        owner: r.owner
      }))
    }
  }

  render() {
    return (
      <div><Table {...this.getTickets(this.props.tickets)}/></div>
    )
  }
}

export default networkCollectionRenderer(ViewTickets, { tableName: 'ticket' });
