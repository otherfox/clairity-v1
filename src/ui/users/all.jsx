import React, { PropTypes, Component } from 'react'
import async, { collection } from '../shared/components/async'
import { asyncDropdown } from '../shared/components/collectionDropdown'
import { contextTypes } from '../shared/decorators'
import Link from '../shared/components/link'
import { FontIcon, ClearFix } from 'material-ui'
import {
  Paper
} from 'material-ui'
import Table, {} from '../shared/components/table'
import DetailRow, {} from '../shared/components/details/detailRow'

@async({ contacts: collection('user').all() })
@contextTypes({ muiTheme: PropTypes.object })
class ListUsers extends Component {
  style() {
      return {
        root: {},
        icon: {
          float: 'left',
          color: this.context.muiTheme.palette.primary1Color
        },
        link: {
          float: 'left',
          color: this.context.muiTheme.palette.textColor,
          lineHeight: '25px',
          marginLeft: '10px'
        }
      }
  }
  getContacts() {
    return {
      colNames: [
        { label: 'Name', name: 'name', cellType: 'user' }
      ],
      data: this.props.contacts
    }
  }
  render() {
    let contacts = this.props.contacts || [];
    return (
      <div style={this.style().root}>
        <h1>Users</h1>
        <Table {...this.getContacts() }/>
      </div>
    );
  }
}

export default ListUsers;
