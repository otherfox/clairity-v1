import React, {Component, PropTypes} from 'react'
import { contextTypes } from '../../shared/decorators'
import Link from '../../shared/components/link'
import { Utils } from 'material-ui'

import AgentIcon from 'material-ui/lib/svg-icons/action/account-circle'

@contextTypes({ muiTheme: PropTypes.object })
export default class UserName extends Component {

  render() {
    let agent = this.props.user ? this.props.user : this.props.children;
    return (
      <Link to='/' style={_.assign({
          color: this.context.muiTheme.palette.primary1Color
        }, this.props.cellStyle
      )}>
        <AgentIcon style={_.assign(
          { fill: Utils.ColorManipulator
              .fade(this.context.muiTheme.palette.primary1Color, .5),
            marginRight: '5px',
            position: 'absolute' },
          this.props.iconStyle)} />
        <div style={_.assign({
            paddingLeft: '30px',
            lineHeight: '25px'
          }, this.props.labelStyle
        )}>
          { agent.name || 'Not Assigned' }
        </div>
      </Link>
    )
  }
}
