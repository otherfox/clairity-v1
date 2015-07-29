import React from "react"
import {Link} from 'react-router'
import {FontIcon, ClearFix} from 'material-ui'

export default class ListContacts extends React.Component {
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
    return (
      <div style={this.style().root}>
        {
          this.props.contacts.map(o =>
            <ClearFix>
              <Link to="view-contact" params={{contactId: o.id}}>
                <FontIcon className={'md md-account-circle'} style={this.style().icon}/> <div style={this.style().link}>{o.name}</div>
              </Link>
            </ClearFix>
          )
        }
      </div>
    );
  }
}

ListContacts.contextTypes = {
  muiTheme: React.PropTypes.object
}
