import React, { PropTypes, Component } from 'react'
import async, { collection } from '../shared/components/async'
import { asyncDropdown } from '../shared/components/collectionDropdown'
import { contextTypes } from '../shared/decorators'
import { FontIcon, ClearFix } from 'material-ui'
import { Paper } from 'material-ui'
import { Table, LangText, DetailRow, Link } from '../shared/components'
import {
  FilteredCollection, Filters, CheckBoxFilter, TextFilter, RadioButtonFilter
} from '../shared/components/filteredCollection'

@async({ users: collection('user').all() })
@contextTypes({ muiTheme: PropTypes.object, lang: PropTypes.object })
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
      <div>
        <h1><LangText>Users</LangText></h1>
        <FilteredCollection data={users}>
          <Filters>
            <TextFilter name={'name'} label=<LangText>User Name</LangText> />
          </Filters>
          <Table {...this.getUsers()} header={'name'} linkParam={'id'} />
        </FilteredCollection>
      </div>
    );
  }
}

export default ListUsers;
