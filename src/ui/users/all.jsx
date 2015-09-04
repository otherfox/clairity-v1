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
import {
  FilteredCollection, Filters, CheckBoxFilter, TextFilter, RadioButtonFilter
} from '../shared/components/filteredCollection'

@async({ users: collection('user').all() })
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
  getUsers() {
    return {
      colNames: [
        { label: 'Name', name: 'name', cellType: 'agent' }
      ],
      data: this.props.users
    }
  }
  render() {
    let users = this.props.users || [];
    return (
      <div style={this.style().root}>
        <h1>{this.context.lang('Users')}</h1>
        <FilteredCollection data={users}>
          <Filters>
            <TextFilter name={'name'} label={this.context.lang('User Name')} />
          </Filters>
          <Table {...this.getUsers()} header={'name'} cardType={'user'} rowHeight={16} linkParam={'id'} />
        </FilteredCollection>
      </div>
    );
  }
}

export default ListUsers;
