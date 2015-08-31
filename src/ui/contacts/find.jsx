import React, { PropTypes, Component } from 'react'
import async, { collection } from '../shared/components/async'
import { asyncDropdown } from '../shared/components/collectionDropdown'
import { contextTypes } from '../shared/decorators'
import Link from '../shared/components/link'
import { FontIcon, ClearFix } from 'material-ui'
import {
  Paper
} from 'material-ui'
import Details, {} from '../shared/components/details'
import DetailRow, {} from '../shared/components/details/detailRow'
import controllable from 'react-controllables'

let ContactsDropdown = asyncDropdown({ collection: collection('contact').all() });

@controllable([ 'contact' ])
@contextTypes({ muiTheme: PropTypes.object })
class ListContacts extends Component {
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
  render() {
    let contacts = this.props.contacts || [];
    return (
      <div style={this.style().root}>
        <h1>Contacts</h1>
        <Details widths={{lg: ['auto','auto']}}>
          <DetailRow label='Account' type='muiDropDown'>
            <ContactsDropdown onChange={ i => this.onContactChange(i) }
                              selectedValue={ this.props.contact } />
          </DetailRow>

        </Details>
      </div>
    );
  }
}
