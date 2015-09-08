import React, { Component, PropTypes } from 'react'
import { contextTypes } from '../../shared/decorators'
import Link from '../../shared/components/link'
import { Utils } from 'material-ui'

import LocationIcon from 'material-ui/lib/svg-icons/communication/location-on'

@contextTypes({ muiTheme: PropTypes.object })
export default class LocationName extends Component {
  render() {
    let location = (this.props.location) ? this.props.location.name : this.props.children ;
    return (
      <Link to="/" //to="view-location"
            params={{ locationId: (this.props.data) ? this.props.data[this.props.idField || 'id'] : '' }}
            style={_.assign({
              color: this.context.muiTheme.palette.accent1Color
            }, this.props.cellStyle)
      }>
        <LocationIcon style={_.assign({
            fill: Utils.ColorManipulator
              .fade(this.context.muiTheme.palette.accent3Color, .5),
            marginRight: '5px',
            position: 'absolute'
          }, this.props.iconStyle
        )} />
        <div style={_.assign({
            paddingLeft: '30px',
            lineHeight: '25px'
          }, this.props.labelStyle
        )}>
          { location }
        </div>
      </Link>
    )
  }
}
