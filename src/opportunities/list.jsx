import React from "react"
import Link from '../shared/components/link'
import {FontIcon, ClearFix} from 'material-ui'

export default class ListOpportunities extends React.Component {
  style() {
      return {
        root: {},
        icon: {
          float: 'left',
          color: this.context.muiTheme.palette.accent1Color
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
          this.props.opportunities.map(o =>
            <ClearFix key={o.id}>
              <Link to="view-opp" params={{oppId: o.id}}>
                <FontIcon className={'md md-stars'} style={this.style().icon}/> <div style={this.style().link}>{o.name}</div>
              </Link>
            </ClearFix>
          )
        }
      </div>
    );
  }
}

ListOpportunities.contextTypes = {
  muiTheme: React.PropTypes.object
}
