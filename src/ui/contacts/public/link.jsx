import React, {Component, PropTypes} from 'react'
import { contextTypes } from '../../shared/decorators'
import Link from '../../shared/components/link'
import { Utils } from 'material-ui'

import ContactIcon from 'material-ui/lib/svg-icons/action/assignment-ind'

@contextTypes({ muiTheme: PropTypes.object })
export default class ContactName extends Component {
  render() {
    let contact = (this.props.contact) ? this.props.contact.name : this.props.children ;
    return (
      <Link to="view-contact"
            params={{ contactId: this.props.data ? this.props.data[this.props.idField || 'id'] : undefined }}
            style={_.assign({
              color: this.context.muiTheme.palette.textColor
            }, this.props.cellStyle)
      }>
        <ContactIcon style={_.assign({
            fill: Utils.ColorManipulator
              .fade(this.context.muiTheme.palette.textColor, .5),
            marginRight: '5px', position: 'absolute'
          }, this.props.iconStyle
        )} />
        <div style={_.assign({
            paddingLeft: '30px',
            lineHeight: '25px'
          }, this.props.labelStyle
        )}>
          {contact}
        </div>
      </Link>
    )
  }
}
