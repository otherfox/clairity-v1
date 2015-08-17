import React, { Component, PropTypes } from 'react'
import {networkCollectionRenderer} from '../shared/components/networkRenderer'

class ViewTickets extends Component {
  render() {
    console.log(this.props.tickets);
    return (
      <div>Tickets</div>
    )
  }
}

export default networkCollectionRenderer(ViewTickets, { tableName: 'ticket' });
