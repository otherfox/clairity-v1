import React, {Component, PropTypes} from 'react'
import { contextTypes } from '../../shared/decorators'
import Link from '../../shared/components/link'
import { Utils } from 'material-ui'

import AccountIcon from 'material-ui/lib/svg-icons/action/verified-user'

@contextTypes({ muiTheme: PropTypes.object })
export default class AccountName extends Component {
  render() {
    let account = (this.props.account) ? this.props.account.name : this.props.children ;
    return (
      <Link to="view-account"
            params={{ accountId: (this.props.data) ? this.props.data[this.props.idField || 'id'] : '' }}
            style={_.assign({
              color: this.context.muiTheme.palette.accent1Color
            }, this.props.cellStyle)
      }>
        <AccountIcon style={_.assign({
            fill: Utils.ColorManipulator
              .fade(this.context.muiTheme.palette.accent1Color, .5),
            marginRight: '5px',
            position: 'absolute'
          }, this.props.iconStyle
        )} />
        <div style={_.assign({
            paddingLeft: '30px',
            lineHeight: '25px'
          }, this.props.labelStyle
        )}>
          { account }
        </div>
      </Link>
    )
  }
}
